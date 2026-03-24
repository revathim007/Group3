
from rest_framework import generics, filters, status
from .models import Stock, Portfolio, Collection, Purchase
from .serializers import StockSerializer, PortfolioSerializer, CollectionSerializer, PurchaseSerializer
from datetime import datetime, timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import numpy as np
import tempfile
import os

# Set a safe location for yfinance cache
try:
    temp_dir = tempfile.gettempdir()
    cache_path = os.path.join(temp_dir, "yfinance_cache")
    if not os.path.exists(cache_path):
        os.makedirs(cache_path, exist_ok=True)
    yf.set_tz_cache_location(cache_path)
except Exception as e:
    print(f"Failed to set yfinance cache location: {str(e)}")

class StockListView(generics.ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['symbol', 'name']

class PortfolioListCreateView(generics.ListCreateAPIView):
    serializer_class = PortfolioSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Portfolio.objects.filter(user_id=user_id).order_by('-created_at')
        return Portfolio.objects.none()

    def perform_create(self, serializer):
        user_id = self.request.data.get('user_id')
        serializer.save(user_id=user_id)

class PortfolioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

class CollectionListCreateView(generics.ListCreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Collection.objects.filter(user_id=user_id).order_by('-added_at')
        return Collection.objects.none()

class CollectionDeleteView(generics.DestroyAPIView):
    queryset = Collection.objects.all()
    
    def delete(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        stock_id = request.query_params.get('stock_id')
        if user_id and stock_id:
            Collection.objects.filter(user_id=user_id, stock_id=stock_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return super().delete(request, *args, **kwargs)

class PurchaseListCreateView(generics.ListCreateAPIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Purchase.objects.filter(user_id=user_id).order_by('-purchased_at')
        return Purchase.objects.none()

    def perform_create(self, serializer):
        user_id = self.request.data.get('user_id')
        serializer.save(user_id=user_id)

class StockHistoryView(APIView):
    def get(self, request, symbol):
        period = request.query_params.get('period', '1mo')
        end_date = datetime.now()
        
        if period == '7d':
            start_date = end_date - timedelta(days=7)
        elif period == '1mo':
            start_date = end_date - timedelta(days=30)
        elif period == '6mo':
            start_date = end_date - timedelta(days=182)
        elif period == '1y':
            start_date = end_date - timedelta(days=365)
        elif period == '5y':
            start_date = end_date - timedelta(days=1825)
        else:
            start_date = end_date - timedelta(days=30)

        try:
            ticker = yf.Ticker(symbol)
            history = ticker.history(start=start_date.strftime('%Y-%m-%d'), end=end_date.strftime('%Y-%m-%d'))
            
            if history.empty:
                return Response([])

            # Conditionally calculate MAs
            if len(history) >= 20:
                history['MA20'] = history['Close'].rolling(window=20).mean()
            else:
                history['MA20'] = None

            if len(history) >= 50:
                history['MA50'] = history['Close'].rolling(window=50).mean()
            else:
                history['MA50'] = None

            if len(history) >= 200:
                history['MA200'] = history['Close'].rolling(window=200).mean()
            else:
                history['MA200'] = None

            data = []
            for index, row in history.iterrows():
                data.append({
                    'date': index.strftime('%Y-%m-%d'),
                    'close': round(float(row['Close']), 2) if not pd.isna(row['Close']) else 0,
                    'volume': int(row['Volume']) if not pd.isna(row['Volume']) else 0,
                    'ma20': round(float(row['MA20']), 2) if row['MA20'] is not None and not pd.isna(row['MA20']) else None,
                    'ma50': round(float(row['MA50']), 2) if row['MA50'] is not None and not pd.isna(row['MA50']) else None,
                    'ma200': round(float(row['MA200']), 2) if row['MA200'] is not None and not pd.isna(row['MA200']) else None,
                })
            
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class SentimentAnalysisView(APIView):
    def get(self, request, symbol):
        try:
            ticker = yf.Ticker(symbol)
            news = ticker.news

            if not news:
                return Response({'sentiment': 'Neutral', 'articles': []})

            positive_keywords = ['up', 'gain', 'high', 'profit', 'good', 'success', 'beat', 'rally']
            negative_keywords = ['down', 'loss', 'low', 'slump', 'bad', 'fail', 'miss', 'plunge']

            sentiment_score = 0
            articles = []

            for article in news:
                title = article['title'].lower()
                link = article['link']
                
                score = 0
                for p_word in positive_keywords:
                    if p_word in title:
                        score += 1
                for n_word in negative_keywords:
                    if n_word in title:
                        score -= 1
                
                sentiment_score += score
                articles.append({'title': article['title'], 'link': link})

            if sentiment_score > 0:
                sentiment = 'Positive'
            elif sentiment_score < 0:
                sentiment = 'Negative'
            else:
                sentiment = 'Neutral'

            return Response({'sentiment': sentiment, 'articles': articles[:5]})

        except Exception as e:
            return Response({'error': str(e)}, status=400)

class StockForecastView(APIView):
    def get(self, request, symbol):
        days = int(request.query_params.get('days', 7))
        
        try:
            ticker = yf.Ticker(symbol)
            # Fetch 1 year of data for training (sufficient for daily ARIMA)
            history = ticker.history(period="1y")
            
            if history.empty:
                return Response({'error': f'No historical data found for {symbol}'}, status=404)
            
            # Extract close prices and ensure it's a series with a clean index
            # Drop any NaN values that yfinance might return
            close_prices = history['Close'].dropna().copy()
            
            if len(close_prices) < 30:
                return Response({'error': 'Insufficient data for prediction (need at least 30 days)'}, status=400)
            
            # ARIMA works better if we don't have gaps. 
            model_data = close_prices.values.astype(float)
            
            # Simple ARIMA(1,1,1) is more stable for general stock prediction
            # Use a simpler model or handle the data differently if it fails
            try:
                model = ARIMA(model_data, order=(1,1,1))
                model_fit = model.fit()
                forecast = model_fit.forecast(steps=days)
            except Exception as arima_err:
                # Fallback to a simpler trend-based prediction if ARIMA fails
                print(f"ARIMA failed: {str(arima_err)}. Using fallback.")
                last_price = float(model_data[-1])
                # Calculate average return over the last 30 days
                recent_data = model_data[-30:]
                avg_return = np.mean(np.diff(recent_data) / recent_data[:-1])
                forecast = [last_price * (1 + avg_return)**(i+1) for i in range(days)]
            
            # Prepare historical data (last 30 days for context)
            historical_data = []
            # Get the actual dates from the series
            dates = close_prices.index
            prices = close_prices.values
            
            # Take last 30 points
            for i in range(max(0, len(prices) - 30), len(prices)):
                historical_data.append({
                    'date': dates[i].strftime('%Y-%m-%d'),
                    'price': round(float(prices[i]), 2),
                    'isForecast': False
                })
            
            # Prepare forecast data
            forecast_data = []
            last_date = dates[-1]
            
            for i, price in enumerate(forecast):
                # Simple logic: next business days (skipping weekends is complex, so we just add days)
                next_date = last_date + timedelta(days=i+1)
                forecast_data.append({
                    'date': next_date.strftime('%Y-%m-%d'),
                    'price': round(float(price), 2),
                    'isForecast': True
                })
            
            return Response({
                'historical': historical_data,
                'forecast': forecast_data
            })
            
        except Exception as e:
            import traceback
            traceback.print_exc() # Log to terminal
            return Response({'error': f'Prediction model error: {str(e)}'}, status=400)

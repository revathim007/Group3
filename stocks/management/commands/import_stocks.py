
import pandas as pd
from django.core.management.base import BaseCommand
from stocks.models import Stock

class Command(BaseCommand):
    help = 'Import stocks from an Excel file'

    def handle(self, *args, **options):
        file_path = 'd:\\Revathi\\Biz Metric Internship\\Project 2026\\revathiMaithiliproject\\StockVerse_Stoxie\\USA Top 200 Stocks.xlsx'
        try:
            df = pd.read_excel(file_path)
            for index, row in df.iterrows():
                stock_symbol = row['Symbol']
                stock, created = Stock.objects.get_or_create(symbol=stock_symbol)
                
                stock.name = row['Company']
                stock.exchange = 'NASDAQ'  # Assuming NASDAQ for US stocks
                stock.sector = row.get('Sector', None)
                stock.current_price = row.get('Price', None)
                stock.currency = 'USD'
                stock.pe_ratio = row.get('PE Ratio', None)
                stock.save()

                if created:
                    self.stdout.write(self.style.SUCCESS(f'Successfully created stock: {stock.name}'))
                else:
                    self.stdout.write(self.style.SUCCESS(f'Successfully updated stock: {stock.name}'))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR('File not found. Please check the file path.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))

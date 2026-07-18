import pandas as pd

# Import ALL models so SQLAlchemy registers them
from app.models.category import Category
from app.models.product import Product
from app.models.store import Store
from app.models.product_price import ProductPrice

from app.database.connection import SessionLocal

db = SessionLocal()

# Load Excel
df = pd.read_excel("Bhaia_Product_Prices.xlsx")

# Store names (must match Excel columns)
stores = {
    "Blinkit": "Blinkit",
    "Zepto": "Zepto",
    "Instamart": "Swiggy Instamart",
    "BigBasket": "BigBasket",
    "JioMart": "JioMart",
    "DMart": "DMart Ready",
    "Flipkart": "Flipkart Minutes",
    "Amazon": "Amazon Fresh"
}

# Create stores if they don't exist
store_ids = {}

for column, store_name in stores.items():

    store = db.query(Store).filter(Store.name == store_name).first()

    if not store:
        store = Store(name=store_name)
        db.add(store)
        db.commit()
        db.refresh(store)

    store_ids[column] = store.id

# Import prices
for _, row in df.iterrows():

    product = (
        db.query(Product)
        .filter(Product.name == row["Product"])
        .first()
    )

    if not product:
        print(f"Product not found: {row['Product']}")
        continue

    stock = int(row["Stock"])

    for column in stores.keys():

        price = float(row[column])

        existing = (
            db.query(ProductPrice)
            .filter(
                ProductPrice.product_id == product.id,
                ProductPrice.store_id == store_ids[column]
            )
            .first()
        )

        if existing:
            existing.price = price
            existing.stock = stock
        else:
            new_price = ProductPrice(
                product_id=product.id,
                store_id=store_ids[column],
                price=price,
                stock=stock
            )
            db.add(new_price)

db.commit()
db.close()
print("Prices imported successfully!")
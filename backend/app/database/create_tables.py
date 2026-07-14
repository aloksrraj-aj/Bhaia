from app.database.connection import engine
from app.database.base import Base

from app.models.user import User
from app.models.store import Store
from app.models.category import Category
from app.models.product import Product
from app.models.product_price import ProductPrice

Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully!")
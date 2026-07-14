from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class ProductPrice(Base):
    __tablename__ = "product_prices"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(Integer, ForeignKey("products.id"))

    store_id = Column(Integer, ForeignKey("stores.id"))

    price = Column(Float, nullable=False)

    stock = Column(Integer, default=0)

    product = relationship("Product")

    store = relationship("Store")
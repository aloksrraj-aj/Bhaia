from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    brand = Column(String, nullable=False)

    image = Column(String, nullable=True)

    unit = Column(String, nullable=False)

    category_id = Column(Integer, ForeignKey("categories.id"))

    category = relationship("Category")
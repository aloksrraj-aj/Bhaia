from sqlalchemy import Column, Integer, String
from app.database.base import Base


class Store(Base):
    __tablename__ = "stores"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    logo = Column(String, nullable=True)
    website = Column(String, nullable=True)
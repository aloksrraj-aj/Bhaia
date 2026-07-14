from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    brand: str
    image: str | None = None
    unit: str
    category_id: int
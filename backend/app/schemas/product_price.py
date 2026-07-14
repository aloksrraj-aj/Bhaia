from pydantic import BaseModel


class ProductPriceCreate(BaseModel):
    product_id: int
    store_id: int
    price: float
    stock: int
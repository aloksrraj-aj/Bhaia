from pydantic import BaseModel

class CartRequest(BaseModel):
    products: list[int]
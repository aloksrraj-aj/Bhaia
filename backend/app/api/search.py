from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.connection import get_db
from app.models.product import Product

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/")
def search_products(
    query: str,
    db: Session = Depends(get_db)
):

    products = (
        db.query(Product)
        .filter(
            or_(
                Product.name.ilike(f"%{query}%"),
                Product.brand.ilike(f"%{query}%")
            )
        )
        .all()
    )

    return [
        {
            "id": product.id,
            "name": product.name,
            "brand": product.brand,
            "unit": product.unit
        }
        for product in products
    ]
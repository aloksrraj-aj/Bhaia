from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.product_price import ProductPrice
from app.schemas.product_price import ProductPriceCreate

router = APIRouter(
    prefix="/prices",
    tags=["Product Prices"]
)


@router.post("/")
def add_price(
    item: ProductPriceCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(ProductPrice).filter(
        ProductPrice.product_id == item.product_id,
        ProductPrice.store_id == item.store_id
    ).first()

    if existing:
        existing.price = item.price
        existing.stock = item.stock
        db.commit()

        return {
            "message": "Price updated"
        }

    new_price = ProductPrice(
        product_id=item.product_id,
        store_id=item.store_id,
        price=item.price,
        stock=item.stock
    )

    db.add(new_price)
    db.commit()
    db.refresh(new_price)

    return {
        "message": "Price added successfully"
    }
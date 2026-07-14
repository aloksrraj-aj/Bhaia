from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.product_price import ProductPrice
from app.models.store import Store

router = APIRouter(
    prefix="/compare",
    tags=["Compare"]
)


@router.get("/{product_id}")
def compare_prices(
    product_id: int,
    db: Session = Depends(get_db)
):

    prices = (
        db.query(ProductPrice)
        .filter(ProductPrice.product_id == product_id)
        .order_by(ProductPrice.price)
        .all()
    )

    result = []

    for item in prices:

        store = (
            db.query(Store)
            .filter(Store.id == item.store_id)
            .first()
        )

        result.append(
            {
                "store": store.name,
                "price": item.price,
                "stock": item.stock
            }
        )

    return result
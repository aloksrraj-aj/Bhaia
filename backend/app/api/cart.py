from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.product_price import ProductPrice
from app.models.store import Store
from app.schemas.cart import CartRequest

router = APIRouter(
    prefix="/cart",
    tags=["Cart Comparison"]
)


@router.post("/compare")
def compare_cart(
    cart: CartRequest,
    db: Session = Depends(get_db)
):

    stores = db.query(Store).all()

    result = []

    for store in stores:

        total = 0

        available = True

        for product_id in cart.products:

            item = (
                db.query(ProductPrice)
                .filter(
                    ProductPrice.product_id == product_id,
                    ProductPrice.store_id == store.id
                )
                .first()
            )

            if item is None:
                available = False
                break

            total += item.price

        if available:

            result.append({
                "store": store.name,
                "total": total
            })

    result.sort(key=lambda x: x["total"])

    return {
        "recommended_store": result[0] if result else None,
        "all_stores": result
    }
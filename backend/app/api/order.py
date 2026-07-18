from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.product_price import ProductPrice
from app.models.store import Store
from app.models.user import User

from app.schemas.order import OrderCreate

from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/place")
def place_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    store = (
        db.query(Store)
        .filter(Store.id == order.store_id)
        .first()
    )

    if not store:
        raise HTTPException(
            status_code=404,
            detail="Store not found"
        )

    new_order = Order(
        user_id=current_user.id,
        store_id=order.store_id,
        total_amount=0
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    total_amount = 0

    for item in order.items:

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )

        product_price = (
            db.query(ProductPrice)
            .filter(
                ProductPrice.product_id == item.product_id,
                ProductPrice.store_id == order.store_id
            )
            .first()
        )

        if not product_price:
            raise HTTPException(
                status_code=404,
                detail=f"{product.name} is unavailable in {store.name}"
            )

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=product_price.price
        )

        db.add(order_item)

        total_amount += (
            product_price.price * item.quantity
        )

    new_order.total_amount = total_amount

    db.commit()
    db.refresh(new_order)

    return {
        "message": "Order placed successfully",
        "order_id": new_order.id,
        "store": store.name,
        "total_amount": total_amount
    }


@router.get("/my-orders")
def my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return (
        db.query(Order)
        .filter(
            Order.user_id == current_user.id
        )
        .all()
    )


@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.user_id == current_user.id
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order
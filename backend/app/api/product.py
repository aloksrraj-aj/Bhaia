from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.product import Product
from app.models.product_price import ProductPrice
from app.models.store import Store
from app.schemas.product import ProductCreate

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = Product(
        name=product.name,
        brand=product.brand,
        image=product.image,
        unit=product.unit,
        category_id=product.category_id
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {
        "message": "Product created successfully",
        "product": new_product
    }


@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()


@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        return {
            "message": "Product not found"
        }

    prices = (
        db.query(ProductPrice)
        .filter(ProductPrice.product_id == product_id)
        .order_by(ProductPrice.price)
        .all()
    )

    stores = []

    for item in prices:

        store = (
            db.query(Store)
            .filter(Store.id == item.store_id)
            .first()
        )

        stores.append({
            "store_id": store.id,
            "store": store.name,
            "price": item.price,
            "stock": item.stock
        })

    return {
        "id": product.id,
        "name": product.name,
        "brand": product.brand,
        "unit": product.unit,
        "image": product.image,
        "category_id": product.category_id,
        "stores": stores
    }
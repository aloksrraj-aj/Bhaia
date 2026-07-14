from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.store import Store
from app.schemas.store import StoreCreate

router = APIRouter(prefix="/stores", tags=["Stores"])


@router.post("/")
def create_store(
    store: StoreCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Store).filter(
        Store.name == store.name
    ).first()

    if existing:
        return {
            "message": "Store already exists"
        }

    new_store = Store(
        name=store.name,
        logo=store.logo,
        website=store.website
    )

    db.add(new_store)
    db.commit()
    db.refresh(new_store)

    return {
        "message": "Store added successfully",
        "store": {
            "id": new_store.id,
            "name": new_store.name
        }
    }
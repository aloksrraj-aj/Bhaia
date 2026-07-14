from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.user import router as user_router
from app.api.store import router as store_router
from app.api.category import router as category_router
from app.api.product import router as product_router
from app.api.product_price import router as product_price_router
from app.api.compare import router as compare_router
from app.api.cart import router as cart_router
from app.api.search import router as search_router

app = FastAPI(
    title="Bhaia API",
    description="Quick Commerce Price Comparison Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(store_router)
app.include_router(category_router)
app.include_router(product_router)
app.include_router(product_price_router)
app.include_router(compare_router)
app.include_router(cart_router)
app.include_router(search_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Bhaia API",
        "status": "Running Successfully"
    }
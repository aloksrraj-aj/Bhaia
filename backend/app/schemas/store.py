from pydantic import BaseModel


class StoreCreate(BaseModel):
    name: str
    logo: str | None = None
    website: str | None = None
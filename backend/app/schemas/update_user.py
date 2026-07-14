from pydantic import BaseModel, EmailStr


class UpdateUser(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
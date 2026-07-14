from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.login import LoginRequest
from app.schemas.update_user import UpdateUser
from app.schemas.change_password import ChangePassword
from app.schemas.user import UserCreate

from app.database.connection import get_db
from app.models.user import User

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.utils.auth import get_current_user

router = APIRouter()


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_email = db.query(User).filter(User.email == user.email).first()

    if existing_email:
        return {
            "message": "Email already registered"
        }

    existing_phone = db.query(User).filter(User.phone == user.phone).first()

    if existing_phone:
        return {
            "message": "Phone number already registered"
        }

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):

    print("=" * 50)
    print("Email Received:", repr(user.email))
    print("Password Received:", repr(user.password))

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    print("User Found:", existing_user)

    if existing_user:
        print("Database Email:", existing_user.email)
        print("Stored Hash:", existing_user.password)

        password_match = verify_password(
            user.password,
            existing_user.password
        )

        print("Password Match:", password_match)

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "user_id": existing_user.id,
            "email": existing_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "phone": current_user.phone
    }


@router.put("/me")
def update_profile(
    user: UpdateUser,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    email_exists = (
        db.query(User)
        .filter(
            User.email == user.email,
            User.id != current_user.id
        )
        .first()
    )

    if email_exists:
        return {
            "message": "Email already exists"
        }

    phone_exists = (
        db.query(User)
        .filter(
            User.phone == user.phone,
            User.id != current_user.id
        )
        .first()
    )

    if phone_exists:
        return {
            "message": "Phone number already exists"
        }

    current_user.full_name = user.full_name
    current_user.email = user.email
    current_user.phone = user.phone

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
            "phone": current_user.phone
        }
    }


@router.put("/change-password")
def change_password(
    passwords: ChangePassword,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if not verify_password(
        passwords.old_password,
        current_user.password
    ):
        return {
            "message": "Old password is incorrect"
        }

    current_user.password = hash_password(
        passwords.new_password
    )

    db.commit()

    return {
        "message": "Password changed successfully"
    }
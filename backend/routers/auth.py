from config import *
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
import psycopg2

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

#JWT Secrets
SECRET_KEY = SECRET
ALGORITHM = ALG

#Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#OAuth2 scheme for token extraction from request headers
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


#DB connection
def openDB():
    return psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
    host="localhost",
    port=DB_PORT
)   



class UserSignup(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/signup")
def signup(user: UserSignup):
    conn = openDB()
    cur = conn.cursor()
    cur.execute("SELECT id FROM users WHERE username=%s OR email=%s;", (user.username, user.email))
    if cur.fetchone():
        raise HTTPException(status_code=400, detail="Username or email already in use")

    hashed_password = pwd_context.hash(user.password)

    cur.execute(
        "INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s) RETURNING id;",
        (user.username, user.email, hashed_password)
    )
    conn.commit()
    user_id = cur.fetchone()[0]
    cur.close()
    conn.close()
    token = jwt.encode({"sub": str(user_id)}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
def login(user:UserLogin):
    conn = openDB()
    cur = conn.cursor()
    cur.execute("SELECT id, password_hash FROM users WHERE username=%s", (user.username))
    result = cur.fetchone()
    if not result:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    user_id, hashed_password = result
    if not pwd_context.verify(user.password, hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = jwt.encode({"sub": str(user_id)}, SECRET_KEY, algorithm=ALGORITHM)
    cur.close()
    conn.close()
    return {"access_token": token, "token_type": "bearer"}


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        print("HI")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/validate")
def validate_token(user_id: str = Depends(get_current_user)):
    print(user_id)
    return { "valid": True, "user_id": user_id }
    
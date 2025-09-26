import os
from dotenv import load_dotenv

load_dotenv()

SECRET = os.getenv("SECRET_KEY")
ALG = os.getenv("ALGORITHM")
DB_NAME = os.getenv("DB_NAME")
DB_PASS = os.getenv("DB_PASS")
DB_USER = os.getenv("DB_USER")
DB_PORT = os.getenv("DB_PORT")
from fastapi import APIRouter, Query, Depends
from services.games_api import fetch_games
from config import *
import psycopg2
from routers.auth import get_current_user
from pydantic import BaseModel

class TeamPick(BaseModel):
    gamePk: int
    picked_winner: str
    game_date: str

router = APIRouter(
    prefix="/games",
    tags=["games"]
)

def openDB():
    return psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
    host="localhost",
    port=DB_PORT
)
    
@router.get("/")
async def get_games(date: str = Query(..., description="Format: YYYY-MM-DD")):
    games = await fetch_games(date)
    return {"date": date, "games": games}

@router.post("/pick")
async def pick_winner(pick: TeamPick, user_id: int = Depends(get_current_user)):
    conn = openDB()
    cur = conn.cursor()
    cur.execute("INSERT INTO picks (user_id, game_id, picked_winner, game_date) VALUES (%s, %s, %s, %s) RETURNING picked_winner;", (user_id, pick.gamePk, pick.picked_winner, pick.game_date))
    conn.commit()
    cur.close()
    conn.close()
    
@router.get("/history")
async def get_pick_history(user_id: int = Depends(get_current_user)):
    conn = openDB()
    cur = conn.cursor()
    cur.execute("SELECT game_id, picked_winner, result, game_date FROM picks WHERE user_id = %s;", (user_id,))
    history = cur.fetchall()
    print(history)
    cur.close()
    conn.close()
    return {"user_id": user_id, "history": history}
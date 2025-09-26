import httpx
import os
from dotenv import load_dotenv
from config import *
import psycopg2
from datetime import datetime

def openDB():
    return psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
    host="localhost",
    port=DB_PORT
)
    
load_dotenv()

MLB_API_BASE = os.getenv("MLB_API_BASE", "https://statsapi.mlb.com/api/v1")

async def fetch_games(date: str):
    url = f"{MLB_API_BASE}/schedule?sportId=1&date={date}"
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
        res.raise_for_status()
        data = res.json()
        
    games = []
    for date_info in data.get("dates", []):
        for game in date_info.get("games", []):
            games.append({
                "gamePk": game["gamePk"],
                "teams": {
                    "away": game["teams"]["away"]["team"]["name"],
                    "home": game["teams"]["home"]["team"]["name"],
                },
                "status": game["status"]["detailedState"],
                "start_time": game.get("gameDate")
            })
            
    return games



async def fetch_post_games(date: list[str]):
    if len(date) == 3:
        day = datetime.now()
        if day.day > int(date[2]) and day.month >= int(date[1]) and day.year >= int(date[0]):
            tempDate = f"{date[0]}-{date[1]}-{date[2]}"
            url = f"{MLB_API_BASE}/schedule?sportId=1&date={tempDate}"
            async with httpx.AsyncClient() as client:
                res = await client.get(url)
                res.raise_for_status()
                data = res.json()
        
            games = []
            for date_info in data.get("dates", []):
                for game in date_info.get("games", []):
                    games.append({
                        "gamePk": game["gamePk"],
                        "teams": {
                            "away": game["teams"]["away"]["team"]["name"],
                            "home": game["teams"]["home"]["team"]["name"],
                            "away_is_winner": game["teams"]["away"].get("isWinner"),
                            "home_is_winner": game["teams"]["home"].get("isWinner")
                        },
                        "status": game["status"]["detailedState"],
                    })
            return games
        else:
            return {"error": "Date must be in the past and game must be from a previous day."}
    else:
        return {"error": "Date must be in [YYYY, MM, DD] format."}
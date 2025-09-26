from services.games_api import fetch_post_games
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

async def update_game_results():
    conn = openDB()
    cur = conn.cursor()
    cur.execute("SELECT game_id, game_date, picked_winner FROM picks WHERE result IS NULL OR result = 'O';")
    rows = cur.fetchall()
 
    for row in rows:
        gamePk, game_date, picked_winner = row
        if game_date is None:
            continue
        dateArray = game_date.split('-')
        games = await fetch_post_games(dateArray)
        if "error" not in games:
            for game in games:
                if game["gamePk"] == gamePk:
                    if game["status"] == "Final":
                        away_is_winner = game["teams"]["away_is_winner"]
                        home_is_winner = game["teams"]["home_is_winner"]
                        if away_is_winner == True and picked_winner == game["teams"]["away"]:
                            cur.execute("UPDATE picks SET result = 'W' WHERE game_id = %s AND game_date = %s;", (gamePk, game_date))
                        elif home_is_winner == True and picked_winner == game["teams"]["home"]:
                            cur.execute("UPDATE picks SET result = 'W' WHERE game_id = %s AND game_date = %s;", (gamePk, game_date))
                        else:
                            cur.execute("UPDATE picks SET result = 'L' WHERE game_id = %s AND game_date = %s;", (gamePk, game_date))
                        conn.commit()
            return True
    cur.close()
    conn.close()
    return False
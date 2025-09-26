from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth import router as auth_router
from routers import games
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from services.games_check import update_game_results
import asyncio

app = FastAPI()
scheduler = AsyncIOScheduler()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(games.router)


@app.on_event("startup")
async def start_scheduler():
    asyncio.create_task(update_game_results())

    scheduler.add_job(lambda: asyncio.create_task(update_game_results()), 'interval', hours=12)
    scheduler.start()

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running"}


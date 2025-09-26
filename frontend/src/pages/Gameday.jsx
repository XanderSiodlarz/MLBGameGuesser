import HomeButton from "../components/HomeButton.jsx"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardButton from "../components/DashboardButton.jsx"
import GameButton from "../components/GameButton.jsx"

function Gameday() {
    const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const { date } = useParams();
    const td = new Date(date);
    const tempDate = td.toISOString().split('T')[0]; // Ensure date is in YYYY-MM-DD format

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch(`${BASE_URL}/games?date=${tempDate}`);
                if (!res.ok) throw new Error("Failed to fetch games");
                const data = await res.json();
                setGames(data.games);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchGames();
    }, [date]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (games.length === 0){
        return (
            <div>
                <p>No games scheduled for {date}</p>
                <HomeButton />
                <DashboardButton />
            </div>
        );
    }
    return (
    <div>
        <h1>Games on {tempDate}</h1>
        {games.map((game) => (
                <GameButton
                    gameDate={tempDate}
                    gamePk={game.gamePk}
                    awayTeam={game.teams.away}
                    homeTeam={game.teams.home}
                    status={game.status}
                    startTime={game.start_time.split('T')[0]}
                />
        ))}
        <HomeButton />
        <DashboardButton />
    </div>
    )
}

export default Gameday
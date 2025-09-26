import DashboardButton from "../components/DashboardButton";
import HomeButton from "../components/HomeButton";
import { useEffect, useState } from "react";

export default function PickHistory() {
    const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch(`${BASE_URL}/games/history`, {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setHistory(data.history);
        };
        fetchHistory();
    }, []);

    return (
        <div>
            <h1>Pick History</h1>
            {history.map(([game_id, picked_winner, result, game_date]) => (
                <ul key={game_id}>
                    <li>Game Date: {game_date ? game_date : "Date not available"}</li>
                    <li>Picked Winner: {picked_winner}</li>
                    <li>Result: {result}</li>
                    
                </ul>
            ))}
            <HomeButton />
            <DashboardButton />
        </div>
    )
}
import { useLocation } from "react-router-dom";
import { enterPicks } from "../api/enter_picks.js"
import { useNavigate } from "react-router-dom";

export default function Pick() {
    const location = useLocation();
    const { homeTeam, awayTeam, gamePk, gameDate } = location.state || { homeTeam: "", awayTeam: "", gamePk: null, gameDate: "" };
    const navigate = useNavigate();

    const handlePick = (team, game, date) => {
        enterPicks(team, game, date);
        alert(`You picked ${team} as the winner!`);
        navigate("/dashboard");
    }

    return (
        <div>
            <h1>Pick the Winner</h1>
            <button onClick={() => handlePick(awayTeam, gamePk, gameDate)}>{awayTeam}</button>
            <button onClick={() => handlePick(homeTeam, gamePk, gameDate)}>{homeTeam}</button>
        </div>

    )
}
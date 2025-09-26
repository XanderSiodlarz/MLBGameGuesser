import { useNavigate } from "react-router-dom";


function GameButton({ gamePk, awayTeam, homeTeam, status, startTime, gameDate }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/pick", { state: { homeTeam, awayTeam, gamePk, gameDate } })
    }
    return (
        <button
            onClick = {handleClick}
            style = {{ padding: "10px 15px", cursor: "pointer"}}>
            {startTime}: {awayTeam} at {homeTeam} - Status: {status}
        </button>
    )
}

export default GameButton
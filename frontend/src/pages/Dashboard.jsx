import HomeButton from "../components/HomeButton.jsx"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    let userData = null;
    const token = localStorage.getItem("access_token");
    if (token) {
        userData = jwtDecode(token);
    }
    const handlePlay = () => {
        navigate("/game")
    }
    const handleHistory = () => {
        navigate("/pick-history")
    }

    return (
        <div>
            <h1>Hello, {userData ? "Player " + userData.sub : "Guest"}</h1>
            <div>
                <h2>Dashboard</h2>
                <button onClick={handlePlay}>Play the Game</button>
                <button onClick={handleHistory}>View Game History</button>
            </div>
            <HomeButton />
        </div>
    )
}
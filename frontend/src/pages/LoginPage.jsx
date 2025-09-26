import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, validateToken } from "../api/auth.js"
import HomeButton from "../components/HomeButton.jsx"
import { AuthContext } from "../AuthContext.jsx"


function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            localStorage.setItem("token", data.access_token)
            setUser(await validateToken(data.access_token));
            navigate("/dashboard")

        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <input
                    type = "text"
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type = "password"
                    placeholder = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                />

                <button type = "submit">Login</button>
            </form>
            <HomeButton />
        </div>
    );
}

export default LoginPage;
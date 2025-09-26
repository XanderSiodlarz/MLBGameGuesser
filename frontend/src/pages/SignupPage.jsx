import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth.js"
import HomeButton from "../components/HomeButton.jsx"
import { AuthContext } from "../AuthContext.jsx"


function SignupPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, email, password);
            alert("Account created! Login now!");
            navigate("/login")
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <input
                    type = "text"
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type = "email"
                    placeholder = "Email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type = "password"
                    placeholder = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                />

                <button type = "submit">Signup</button>
            </form>
            <HomeButton />
        </div>
    );
}

export default SignupPage;
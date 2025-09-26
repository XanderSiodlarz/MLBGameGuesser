import { useNavigate } from "react-router-dom";


export function SignupButton() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/signup")
    } 

    return (
        <button onClick={handleSubmit}>
            Signup
        </button>
    )
}

export function LoginButton() {
    const navigate = useNavigate();
    
    const handleSubmit = e => {
        navigate("/login")
    } 

    return (
        <button onClick={handleSubmit}>
            Login
        </button>
    )
}

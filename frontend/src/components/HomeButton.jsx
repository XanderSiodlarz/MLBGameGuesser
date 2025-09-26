import { useNavigate } from "react-router-dom";

function HomeButton() {
    const navigate = useNavigate()
    
    const home = () => {
        navigate("/")
    }

    return (
        <button onClick={home}>
            Return Home
        </button>
    )
}

export default HomeButton
import { useNavigate } from "react-router-dom";

export default function DashboardButton() {
    const navigate = useNavigate();
    
    const handleSubmit = () => {
        navigate("/dashboard")
    }
    return (
        <button onClick={handleSubmit}>Go to Dashboard</button>
    )
}
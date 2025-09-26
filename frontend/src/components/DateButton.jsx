import { useNavigate } from "react-router-dom";

function DateButton({ date }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/gameday/${date}`)
    }
    return (
        <button 
            onClick = {handleClick}
            style = {{ padding: "10px 15px", cursor: "pointer"}}>
            {date}
        </button>
    )
}

export default DateButton
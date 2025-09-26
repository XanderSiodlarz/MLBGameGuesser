import DateButton from "../components/DateButton.jsx";


export default function Game() {
    const nextWeek = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        nextWeek.push(date)
    }
    
    return (
        <div style = {{ display: "flex", gap: "10px", flexWrap: "wrap"}}>
            {nextWeek.map((date) => (
                <DateButton 
                key = {date.toDateString()}
                date = {date.toDateString()}
                />
            ))}
         </div>
    )
}
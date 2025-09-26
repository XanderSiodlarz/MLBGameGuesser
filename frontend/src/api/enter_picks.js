import { useState } from "react";
export function enterPicks(picked_winner, gamePk, game_date) {
    
    const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const token = localStorage.getItem("access_token");

    return fetch(`${BASE_URL}/games/pick`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ gamePk, picked_winner, game_date }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to enter picks");
        }
        return response.json();
    });
}
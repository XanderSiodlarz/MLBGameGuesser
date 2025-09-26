
export function isLoggedIn() {
    return !!localStorage.getItem("access_token");
}

export function logout() {
    localStorage.removeItem("access_token");
}

export async function validateToken(token) {
    const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const res = await fetch(`${BASE_URL}/auth/validate`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Invalid Token");
    return res.json();
}

export async function login(username, password) {
    const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    console.log(BASE_URL);
    const response = await fetch(`${BASE_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        }
    );

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data;
}

export async function signup(username, email, password) {
    const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL; 
    const response = await fetch(`${BASE_URL}/auth/signup`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        }
    )

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Signup failed");
    }

    return await response.json()
}
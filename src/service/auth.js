import http from "./http.js";

export function loginApi(user) {
    return http.post("/login", user);
}

export function logout() {
    return http.post("/logout");
}

export function userInfo() {    
    return http.get("/auth/me");
}
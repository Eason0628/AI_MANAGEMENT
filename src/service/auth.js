import http from "./http.js";

export function loginApi(user) {
    return http.post("/login", user);
}

export function userInfo() {
    return http.get("/logger");
}

export function logout() {
    return http.post("/logout");
}

export function changePs(data) {
    return http.post("/update_pwd", data);
}

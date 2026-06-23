import http from "./http";

export function menus() {
    return http.get("/menus");
}


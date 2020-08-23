import { Injectable } from "@angular/core";

const TOKEN_KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    hasToken(): boolean {
        return !!this.getToken();
    }

    setToken(authToken: string): void {
        window.localStorage.setItem(TOKEN_KEY, authToken);
    }

    getToken(): string {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    removeToken(): void {
        return window.localStorage.removeItem(TOKEN_KEY);
    }
}
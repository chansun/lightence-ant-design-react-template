import { observable, action, reaction, makeObservable } from 'mobx';
import API from '../utils/API';
import { TokenType, UserType } from "../utils/types"
import userStore from "./userStore"

export class AuthStore {

    token: TokenType = {
        accessToken: window.localStorage.getItem('accessToken'),
        tokenType: window.localStorage.getItem('tokenType')
    }

    constructor() {
        makeObservable(this, {
            token: observable,
            setToken: action,
            login: action,
            logout: action,
        });

        reaction(
            () => this.token,
            token => {
                if (token.accessToken && token.tokenType) {
                    window.localStorage.setItem('accessToken', token.accessToken);
                    window.localStorage.setItem('tokenType', token.tokenType);
                } else {
                    window.localStorage.removeItem('accessToken');
                    window.localStorage.removeItem('tokenType');
                }
            }
        );
    }

    setToken(token: TokenType): void {
        this.token = token
    }

    async login(email: string, password: string): Promise<boolean> {
        return await API.Auth.login(email, password)
            .then((response: any) => {
                const token: TokenType = response.body
                this.setToken(token)
                this.getAccount()
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    logout(): void {
        this.setToken({accessToken: null, tokenType: null})
    }

    async getAccount(): Promise<boolean> {
        return await API.Auth.getAccount()
            .then((response: UserType) => {
                userStore.setUser({ id: response.id, email: response.email, password: response.password })
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }
}

export default new AuthStore();
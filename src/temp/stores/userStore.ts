import { observable, action, makeObservable } from 'mobx';
import { UserPasswordBaseType, UserBaseType, UserType } from "../utils/types"
import API from '../utils/API';

export class UserStore {

    user: UserType = {
        id: 0,
        email: "",
        password: "",
    }

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,
            createUser: action,
        });
    }

    setUser(user: UserType) {
        this.user = user
    }

    async createUser(dto: UserBaseType): Promise<boolean> {
        return await API.User.createUser(dto)
            .then((response: any) => {
                const user: UserType = response.body
                this.setUser(user)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    async updateUserPassword(userId: number, dto: UserPasswordBaseType): Promise<boolean> {
        return await API.User.updateUserPassword(userId, dto)
            .then((response: any) => {
                const user: UserType = response
                this.setUser(user)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }
}

export default new UserStore();
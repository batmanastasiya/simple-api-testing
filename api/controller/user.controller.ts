import {JsonRequest} from "../request";
import {components} from "../../.temp/types";
import {BaseController} from "./base.controller";

export class UserController extends BaseController {

    async createUser(initialCredentials: { username: string }) {
        const response = await new JsonRequest()
            .url(`${this.url}/auth/registration`)
            .method('POST')
            .data({
                name: 'defaultName',
                username: initialCredentials.username,
                password1: 'password',
                password2: 'password'
            })
            .send()

        return response.data
    }

    async login(credentials: { username: string, password: string }): Promise<string> {
        const response = await new JsonRequest()
            .url(`${this.url}/auth/login`)
            .method('POST')
            .data(credentials)
            .send()

        return response.data.accessToken
    }

    async getAllUsers(): Promise<components['schemas']['UserEntity'][]> {
        const response = await new JsonRequest()
            .url(`${this.url}/users`)
            .send()

        return response.data
    }

    async getUserById(userId: any) {
        const response = await new JsonRequest()
            .url(`${this.url}/users/${userId}`)
            .send()

        return response.data

    }
}
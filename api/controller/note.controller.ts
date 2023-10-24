import {JsonRequest} from "../request";
import {components} from "../../.temp/types";
import {BaseController} from "./base.controller";

export class NoteController extends BaseController {

    async createNote(content: { content: string }) {
        const response = await new JsonRequest()
            .url(`${this.url}/notes`)
            .method('POST')
            .headers({
                Authorization: `Bearer ${this.accessToken}`
            })
            .data(content)
            .send()

        return response.data
    }

    async getAllNotes(): Promise<components['schemas']['NoteEntity'][]> {
        const response = await new JsonRequest()
            .url(`${this.url}/notes`)
            .send()

        return response.data
    }

    async getNoteById(id: string): Promise<components['schemas']['NoteEntity']> {
        const response = await new JsonRequest()
            .url(`${this.url}/notes/${id}`)
            .send()

        return response.data
    }


    async getNotesByAuthorId(authorId: string) {
        const response = await new JsonRequest()
            .url(`${this.url}/notes/author/${authorId}`)
            .send()

        return response.data

    }

    async deleteNoteById(id: string) {
        const response = await new JsonRequest()
            .url(`${this.url}/notes/${id}`)
            .method('DELETE')
            .headers({
                Authorization: `Bearer ${this.accessToken}`
            })
            .send()

        return response.data
    }

    async updateNoteById(id: string, param2: { content: string }) {
        const response = await new JsonRequest()
            .url(`${this.url}/notes/${id}`)
            .method('PATCH')
            .headers({
                Authorization: `Bearer ${this.accessToken}`
            })
            .data(param2)
            .send()

        return response.data

    }
}
import {NoteController} from "./controller/note.controller";
import {UserController} from "./controller/user.controller";
import {ControllerOptions} from "./controller/base.controller";
import {CONFIG} from "../config/env";

export class ApiClient {
    public readonly note: NoteController;
    public readonly user: UserController;

    constructor(options?: Partial<ControllerOptions>) {
        const defaultOptions: ControllerOptions = {
            url: CONFIG.SIMPLEAPI_URL,
        }
        const mergedOptions = {
            ...defaultOptions,
            ...options
        }

        this.note = new NoteController(mergedOptions);
        this.user = new UserController(mergedOptions);
    }

    static async unauthorized(): Promise<ApiClient> {
        return new ApiClient();
    }

    static async loginAs(credentials: {username: string, password: string}): Promise<ApiClient> {
        return new ApiClient({
            token: await new ApiClient().user.login(credentials)
        });

    }
}
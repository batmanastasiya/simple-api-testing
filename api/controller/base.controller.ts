export type ControllerOptions = {
    url: string,
    token?: string,
}

export class BaseController{
    protected readonly url: string;
    protected readonly accessToken?: string;

    constructor(options: ControllerOptions) {
        this.accessToken = options.token;
        this.url = options.url;
    }
}
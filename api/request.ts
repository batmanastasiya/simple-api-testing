import axios from "axios";
import type {Method} from "axios";
import {APISchemaValidator} from "./validator";

const defaultValidator = new APISchemaValidator();

axios.interceptors.response.use(async function (response) {
    const {status, config:{method}, request:{path}} = response;
    const schema = await defaultValidator.getApiSchema(path, method as string, `${status}`);
    // console.log(path, method, status, schema)
    defaultValidator.validate(schema, response.data);
    return response;
}, function (error) {
    return Promise.reject(error);
});

export class JsonRequest {
    protected options: any = {}
    public url(url: string | URL): this {
        this.options.url = url
        return this
    }
    public method(method: Method): this {
        this.options.method = method
        return this
    }
    public data(data: any): this {
        this.options.data = data
        return this
    }
    public headers(headers: any): this {
        this.options.headers = headers
        return this
    }
    public async send(): Promise<any>{
        return axios.request(this.options);
}

}
import axios from "axios";
import type {Method} from "axios";
import {APISchemaValidator} from "./validator";

const defaultValidator = new APISchemaValidator();

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
        return axios.request(this.options)
            .then(async (response) => {
                await this.validateResponseSchema(response);
                return response;
            })
            .catch(async (error) => {
                if (error.response.data.statusCode < 500) {
                    await this.validateResponseSchema(error.response);
                    //console.log('error status: ', error.response.data, error.request.path)

                    return error.response
                }

               return Promise.reject(error);
            });
    }
    private async validateResponseSchema(response: any) {
        const {status, config:{method}, request:{path}} = response;
        const schema = await defaultValidator.getApiSchema(path, method as string, `${status}`);
        //console.log(path, method, status)
        defaultValidator.validate(schema, response.data);
        //console.log('schema validated', path)
    }

}
import addFormats from "ajv-formats";
import Ajv from "ajv";
import SwaggerParser from "@apidevtools/swagger-parser";
import {CONFIG} from "../config/env";

export class APISchemaValidator {
    private apiSpec: any = null;

    constructor(private apiSpecUrl: string = CONFIG.SIMPLEAPI_SWAGGER_JSON_URL) {
    }

    async loadAPISpec() {
        if (!this.apiSpec) {
            this.apiSpec = await SwaggerParser.dereference(this.apiSpecUrl);
        }
        return this.apiSpec;
    }

    async getApiSchema(path: string, method: string, status: string) {
        try {
            const apiSpec = await this.loadAPISpec()
            //console.log(path, method, status)
            //console.log('APISPEC: '+ JSON.stringify(apiSpec, null, 2))

            // TODO add one more kostyl for negative tests (400ish, 500ish)


            const splittedPath = path.split('/');
            const filteredPath = splittedPath.map((pathPart) => {
                if (pathPart.length === 36) {
                    return '{id}'
                }
                return pathPart
            })
            const correctedPath = filteredPath.join('/');
            //console.log('correctedPath: ', correctedPath)

            if (method === 'delete') {
                return apiSpec?.paths?.[correctedPath]?.[method]?.responses?.[status] as any
            }
            // @ts-ignore
            return (apiSpec?.paths?.[correctedPath]?.[method]?.responses?.[status] as any)?.['content']?.['application/json'].schema
        } catch (e) {
            console.log('validator.getSchema error: ', e)
            return null
        }
    }

    validate(schema: any, data: any) {
        const ajv = new Ajv({
            strict: false,
            allErrors: true,
            verbose: true,
        });
        addFormats(ajv);
        const validate = ajv.compile(schema);

        const valid = validate(data);
        if (!valid) {
            throw new Error(`Validation error: ${JSON.stringify({
                errors: validate.errors,
            }, null, 2)}`);
        }
    }
}


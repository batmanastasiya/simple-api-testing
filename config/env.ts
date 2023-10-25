import {cleanEnv, str, url} from "envalid";

export const CONFIG = cleanEnv(process.env, {
    SIMPLEAPI_URL: url({
        default: 'https://simpleapi.pfizer.keenetic.link',
        desc: 'SimpleAPI URL'
    }),
    SIMPLEAPI_SWAGGER_URL: url({
        default: 'https://simpleapi.pfizer.keenetic.link/docs',
        desc: 'SimpleAPI Swagger URL'
    }),
    SIMPLEAPI_SWAGGER_JSON_URL: url({
        default: 'https://simpleapi.pfizer.keenetic.link/docs-json',
        desc: 'SimpleAPI Swagger JSON URL'
    }),
    SIMPLEAPI_USERNAME: str({
        desc: 'SimpleAPI username'
    }),
    SIMPLEAPI_PASSWORD: str({
        desc: 'SimpleAPI password'
    }),
    ANOTHER_USER_USERNAME: str({
        desc: 'Another user username'
    }),
    ANOTHER_USER_PASSWORD: str({
        desc: 'Another user password'
    }),
});
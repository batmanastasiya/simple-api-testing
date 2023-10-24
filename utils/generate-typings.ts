import 'dotenv/config'
import { CONFIG } from '../config/env'
import { execSync } from 'child_process'

execSync(`npx openapi-typescript ${CONFIG.SIMPLEAPI_SWAGGER_JSON_URL} --output ./.temp/types.ts`, { stdio: 'inherit' })
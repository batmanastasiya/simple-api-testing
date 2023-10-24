module.exports = {
    require: [
        'ts-node/register',
        'dotenv/config'
    ],
    spec: './tests/**/*.test.ts',
    slow: 10000,
    timeout: 20000,
}
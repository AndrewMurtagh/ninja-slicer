/** @type {import('next').NextConfig} */
const nextConfig = {
    // serverRuntimeConfig: {
    //     PROJECT_ROOT: __dirname
    // },
    experimental: {
        outputFileTracingExcludes: {
            '/api/slice': [
                './res/test.txt',
            ],
        },
    },
}

module.exports = nextConfig

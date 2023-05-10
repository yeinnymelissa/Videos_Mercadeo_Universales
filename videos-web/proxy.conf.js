const PROXY_CONFIG = [
    {
        context: [
            "/security/"
        ],
        target: "http://localhost",
        secure: false
    },
    {
        context: [
            "/videos-api/"
        ],
        target: "http://localhost:8585",
        secure: false
    }
]
module.exports = PROXY_CONFIG;
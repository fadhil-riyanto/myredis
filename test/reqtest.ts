import axios from "axios"

(() => {
    let host: string = "http://127.0.0.1:8000/graphql";

    let graphqlPayloadGetToken: string = `
    query Request {
        RedisCreateSession(connstr: "redis://127.0.0.1:6379")
    }
    `

    let graphqlPayloadRet = (token: string) : string => {
        return `
            query Request {
                Getall(ConnToken: "${token}") {
                    key
                    value
                    expire
                    type
                }
            }
            `
    }

    axios.get(host, {
        params: {
            query: graphqlPayloadGetToken
        }
    })
    .then(data => {
        return axios.get(host, {
            params: {
                query: graphqlPayloadRet(data.data.data.RedisCreateSession)
            }
        })
    })
    .then(data2 => console.log(JSON.stringify(data2.data, null, 4)))
    // .then(data => {
    //     return axios.get(host, {
    //         params: {
    //             query: graphqlPayloadRet(data.data.RedisCreateSession)
    //         }
    //     })
    // }).then((result) => console.log(result))
})()
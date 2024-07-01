"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
(function () {
    var host = "http://127.0.0.1:8000/graphql";
    var graphqlPayloadGetToken = "\n    query Request {\n        RedisCreateSession(connstr: \"redis://127.0.0.1:6379\")\n    }\n    ";
    var graphqlPayloadRet = function (token) {
        return "\n            query Request {\n                Getall(ConnToken: \"".concat(token, "\") {\n                    key\n                    value\n                    expire\n                    type\n                }\n            }\n            ");
    };
    axios_1.default.get(host, {
        params: {
            query: graphqlPayloadGetToken
        }
    })
        .then(function (data) {
        return axios_1.default.get(host, {
            params: {
                query: graphqlPayloadRet(data.data.data.RedisCreateSession)
            }
        });
    })
        .then(function (data2) { return console.log(JSON.stringify(data2.data, null, 4)); });
    // .then(data => {
    //     return axios.get(host, {
    //         params: {
    //             query: graphqlPayloadRet(data.data.RedisCreateSession)
    //         }
    //     })
    // }).then((result) => console.log(result))
})();

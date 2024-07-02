const MODE = "development"
const VERSION = "v1.0.0"

let graphqlEndpoint
if (MODE == "development") {
    graphqlEndpoint = "http://127.0.0.1:9000/graphql"
} else {
    graphqlEndpoint = "/graphql"
}

export { graphqlEndpoint, VERSION, MODE }
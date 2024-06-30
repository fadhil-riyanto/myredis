const MODE = "development"

let graphqlEndpoint
if (MODE == "development") {
    graphqlEndpoint = "http://127.0.0.1:8000/graphql"
} else {
    graphqlEndpoint = "/graphql"
}

export { graphqlEndpoint }
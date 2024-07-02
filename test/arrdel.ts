interface xyz {
    data: string
    value1: string
    value2: string
}

let arr: xyz[] = [
    {
        data: "a",
        value1: "w",
        value2: "@"
    },
    {
        data: "w",
        value1: "w",
        value2: "@"
    },
    {
        data: "as",
        value1: "w",
        value2: "@"
    },
]

let arssssssssssr: any = arr.filter(function( obj ) {
    return obj.data !== "as";
});

console.log(arssssssssssr)
  
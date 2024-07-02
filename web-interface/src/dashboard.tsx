import { VERSION } from "../config"
import swal from 'sweetalert';
import axios from "axios";
import { graphqlEndpoint } from "../config"
import { useEffect, useReducer, useState } from "preact/hooks";
import { InsertModal } from "./components/InsertModal"
import * as bootstrap from 'bootstrap'

// let data: any = new bootstrap.Modal()

function NavbarSection() {
    return (
        <>
            <div className=" d-flex p-2 align-items-center">
                <h3 className="text-white me-5">MyRedis {VERSION}</h3>
                <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Add record</button>
                {/* <button type="button" className="btn btn-secondary">Info</button> */}
            </div>
        </>
    )
}

function BuildRows({table, setTable, parentRefToken, counter, rediskey, redisvalue, expiration, type, update}) {


    const doquery = (rediskey) => {
        let query = `{
            Del(ConnToken: "${parentRefToken.data.data.RedisCreateSession}", key: "${rediskey}") 
        }`
        axios.get(graphqlEndpoint, {
            params: {
                query: query
            }
        })
        let newarrr: any = table.filter(function( obj ) {
            return obj.key !== rediskey;
        });

        // table
        console.log(newarrr)
        setTable(newarrr)
          
    }


    return (
        <>
            <tr>
                <th scope="row">{counter}</th>
                <td>{rediskey}</td>
                <td>{redisvalue}</td>
                <td>{expiration}</td>
                <td>
                    <button className="btn btn-primary me-2" onClick={() => doquery(rediskey)}>Delete</button>
                    <button className="btn btn-primary">edit</button>
                </td>
            </tr>
        </>
    )
}

function DisplayDataSection({parentRefToken, table, setTable, update}) {
    if (table.length != 0) {
        console.log(table)
        return (
            <>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Key</th>
                        <th scope="col">Value</th>
                        <th scope="col">Expire</th>
                        <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {table.map((data, i) => {
                            return <BuildRows table={table} setTable={setTable} parentRefToken={parentRefToken} counter={i + 1} rediskey={data.key} redisvalue={data.value} expiration={data.expire} type={data.type} update={update}/>
                        })}
                    </tbody>
                </table>
    
            </>
        )
    }
    
    
}

export function Dashboard({parentRefToken}) {
    
    const [table, setTable] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    
    if (parentRefToken == null) {
        return (<></>)
    } else {
        useEffect(() => {
            let query = `{
                Getall(ConnToken: "${parentRefToken.data.data.RedisCreateSession}") {
                    key
                    value
                    expire
                    type
                }
            }`

            fetch(graphqlEndpoint + "?query=" + encodeURIComponent(query))
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setTable(data.data.Getall);
                });
      
        }, [])
        // const query2api = () => {
        //     try {
        //         let query = `{
        //             Getall(ConnToken: "${parentRefToken.data.data.RedisCreateSession}") {
        //                 key
        //                 value
        //                 expire
        //                 type
        //             }
        //         }`
    
    
        //         let data = axios.get(graphqlEndpoint, {
        //             params: {
        //                 query: query
        //             }
        //         })

        //         return data.then(data => data.data)
                
        //     } catch {
        //         swal("host error")
        //     }
        // }

        // let data = query2api().then(data => {
        //     // setTable(data.data)
        //     console.log(data.data)
        // })
        
        return (
            <>
                <InsertModal parentRefToken={parentRefToken} table={table} setTable={setTable}/>
                <div className="container-fluid">
                    <NavbarSection />
                    
                    <DisplayDataSection parentRefToken={parentRefToken} table={table} setTable={setTable} update={forceUpdate}/>
                </div>
            </>
        )
    }
    
}
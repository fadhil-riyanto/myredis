import { useEffect, useState } from "preact/hooks"
import { graphqlEndpoint } from "../../config"
import axios from "axios"

export const InsertModal = ({parentRefToken, table, setTable}) => {

    const handleAddData = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        console.log(data.get("redis-key"))

        let query = `{
            Add(ConnToken: "${parentRefToken.data.data.RedisCreateSession}", data: {
                  key: "${data.get("redis-key")}",
                  value: "${data.get("redis-value")}",
                  ttl: ${data.get("redis-ttl")}
              }
            )
        }`

        

        // useEffect(() => {
        //     fetch(graphqlEndpoint + "?query" + encodeURIComponent(query))
        // }, [])
        await axios.get(graphqlEndpoint, {
            params: {
                query: query
            }
        })

        if (table.find((x) => x.key == data.get("redis-key")) == undefined) {
          setTable([...table, {
            key: data.get("redis-key"),
            value: data.get("redis-value"),
            ttl: data.get("redis-ttl")
          }])
        }
        
    }

    return (
        <>
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Add record</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                 <form onSubmit={handleAddData}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">key</span>
                        <input type="text" className="form-control" name="redis-key" placeholder="redis key" required></input>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">value</span>
                        <input type="text" className="form-control" name="redis-value" placeholder="redis value" required></input>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">TTL (sec)</span>
                        <input type="number" className="form-control" name="redis-ttl" placeholder="90" required></input>
                    </div>
                    <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" >Save changes</button>
                </div>
                 </form>

                </div>
                
              </div>
            </div>
          </div>


        </>
    )
}
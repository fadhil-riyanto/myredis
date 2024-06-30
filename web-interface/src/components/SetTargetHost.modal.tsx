import axios from "axios"
import { useRef, useState } from "preact/hooks"
import  { graphqlEndpoint } from '../../config'
import { useEffect } from 'preact/hooks';
import * as bootstrap from 'bootstrap'

export const SetTargetHost = ({parentRefTokenset, parentRefToken}) => {
    const [redishost, redishostSet] = useState(null)
    const [connectionState, setConnectionState] = useState("connect")
    const query2api = async () => {
        setConnectionState("connecting")
        try {
            let result = await axios.get(graphqlEndpoint, {
                params: {
                    query: `{ RedisCreateSession(connstr: "redis://${redishost}") }`
                }
            })

            if (result.data.data.RedisCreateSession != null) {
                parentRefTokenset(result)
                setConnectionState("connected")
            }
          
            
        } catch {
            setConnectionState("host error")
        }
    }
    
    return (<>
        <div className="modal" style={{display: parentRefToken == null ? "block" : "none"}} id="staticBackdropaddhost" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Open connection
                        </h1>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal"/> */}
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">redis://</span>
                            <input type="text" className="form-control" placeholder="username:password@awesome.redis.server:1234" onChange={e => redishostSet((e.target as HTMLInputElement).value)} autofocus></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => query2api()}>{connectionState}</button>
                    </div>
                </div>
            </div>
        </div>

    </>)

}
export const SetTargetHost = () => {
    return (<>
        <div className="modal fade" id="staticBackdropaddhost" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Connect to redis server
                        </h1>
                    </div>
                    <div className="modal-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">redis://</span>
                        <input type="text" className="form-control" placeholder="username:password@awesome.redis.server:1234" autofocus></input>
                    </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Connect</button>
                    </div>
                </div>
            </div>
        </div>
    </>)

}
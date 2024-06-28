export const SetTargetHost = () => {
    return (<>
        <div className="modal fade" id="staticBackdropaddhost" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Insert redis connection string
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Connect</button>
                    </div>
                </div>
            </div>
        </div>
    </>)

}
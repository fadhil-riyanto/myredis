import express, {Request, Response} from "express";
import path from "path"


const preactWorkingDir = path.join(__dirname, "..", "web-interface", "dist")

const app = express()

app.use(express.static(preactWorkingDir))
app.get("/", (req: Request, res: Response) => {
    res.sendFile(preactWorkingDir + "/index.html")
}) 


app.listen({ port: 8000 });
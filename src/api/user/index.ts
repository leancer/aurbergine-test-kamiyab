import express,{Request, Response, Router} from "express";

const router:Router = express.Router();

router.get("/", (req:Request, res:Response) => {
    return res.send("users");
})

export default router;
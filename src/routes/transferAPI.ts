import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { transferController } from "../controllers/transferController";

const transferRouter: Router = Router();

//This is a
transferRouter.post("/transferTicket", (req: Request, res: Response, next: NextFunction) => {
    const controller = new transferController.transferData;
    controller.transferUserTicket(req, res, next);

});


export { transferRouter };

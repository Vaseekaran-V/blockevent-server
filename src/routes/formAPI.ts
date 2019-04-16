import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketController } from "../controllers/ticketController";

const formRouter: Router = Router();


formRouter.post("/submit", (req: Request, res: Response, next: NextFunction) => {
    const controller = new ticketController.ticketData;
    controller.signUserTicket(req, res, next);

});

export { formRouter };

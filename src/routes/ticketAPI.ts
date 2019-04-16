import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketController } from "../controllers/ticketController";

const ticketRouter: Router = Router();


ticketRouter.post("/signTicket", (req: Request, res: Response, next: NextFunction) => {
    const controller = new ticketController.ticketData;
    controller.signUserTicket(req, res, next);

});




export { ticketRouter };

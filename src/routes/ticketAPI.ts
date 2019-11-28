import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketController } from "../controllers/ticketController";

const ticketRouter: Router = Router();


ticketRouter.post("/signTicket", (req: Request, res: Response, next: NextFunction) => {
    const controller = new ticketController.ticketData;
    controller.signUserTicket(req, res, next);

});


ticketRouter.post("/approve", (req: Request, res: Response, next: NextFunction) => {
    const controller = new ticketController.ticketData;
    controller.approveUserTicket(req, res, next);

});

ticketRouter.post("/getDetails", (req: Request, res: Response, next: NextFunction) => {
    const controller = new ticketController.ticketData;
    controller.getTicketDetails(req, res, next);

});
ticketRouter.post("/ticketsForEvent", (req: Request, res: Response, next: NextFunction) => {
    const controller = new ticketController.ticketData;
    controller.getTicketsForEvent(req, res, next);

});
export { ticketRouter };

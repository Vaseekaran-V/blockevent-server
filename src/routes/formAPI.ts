import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketController } from "../controllers/ticketController";
import { formController } from "../controllers/formController";

const formRouter: Router = Router();


formRouter.post("/submit", (req: Request, res: Response, next: NextFunction) => {
    const controller = new formController.formData;
    controller.addForm(req, res, next);

});

export { formRouter };

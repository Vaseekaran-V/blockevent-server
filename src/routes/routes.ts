import { userController } from "../controllers/userController";
import * as userAPI from "./userAPI";
import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();


router.use("/user", userAPI.router);


router.post("/adduser", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.writeUserData(req, res, next);

});

router.post("/signTicket", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.signUserTicket(req, res, next);

});

router.post("/sendToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.sendSMSToken(req, res, next);

});

router.post("/verifyToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.verifySMSToken(req, res, next);

});

export { router };

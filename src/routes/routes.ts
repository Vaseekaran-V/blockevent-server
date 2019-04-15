import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();


router.get("/getGitUserDetails/:gitID", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.getUserGitHub(req, res, next);

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

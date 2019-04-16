
import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";

const userRouter: Router = Router();

userRouter.get("/getGitUserDetails/:gitID", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.getUserGitHub(req, res, next);

});

userRouter.get("/getStackUserDetails/:stackID", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.getUserStack(req, res, next);

});

userRouter.post("/add", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.AddUser(req, res, next);
});


userRouter.get("/get/:email", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.GetUser(req, res, next);
});


userRouter.get("/checkAvailability/:email", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.EmailAvailability(req, res, next);
});

userRouter.get("/checkMobileNumberAvailability/:mobileNumber", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.MobileNumberAvailability(req, res, next);
});
export { userRouter };






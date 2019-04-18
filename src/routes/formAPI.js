"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = require("../controllers/formController");
var jwt = require('jsonwebtoken');
const formRouter = express_1.Router();
exports.formRouter = formRouter;
formRouter.post("/submit", (req, res, next) => {
    if (req.headers.authorization) {
        const lol = req.headers.authorization;
        const token = lol.split(" ");
        jwt.verify(token[1], process.env.SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return res.status(403).json({ err: "Authentication failed" });
            }
            else if (req.body.email == decodedToken.email && req.body.phoneNumber == decodedToken.phoneNumber) {
                const controller = new formController_1.formController.formData;
                controller.addForm(req, res, next);
            }
            else {
                return res.status(403).json({ err: "The email and phone number in the token and form doesn't match" });
            }
        });
    }
    else {
        return res.status(400).json({ err: "The Authorization token is not found" });
    }
});
formRouter.post("/submitTest", (req, res, next) => {
    const controller = new formController_1.formController.formData;
    controller.addForm(req, res, next);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybUFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm1BUEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxQ0FBa0U7QUFFbEUsa0VBQStEO0FBQy9ELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUVsQyxNQUFNLFVBQVUsR0FBVyxnQkFBTSxFQUFFLENBQUM7QUFvQzNCLGdDQUFVO0FBakNuQixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBRTNFLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7UUFDM0IsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDdEMsTUFBTSxLQUFLLEdBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQVEsRUFBRSxZQUFpQixFQUFFLEVBQUU7WUFDckUsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFO2dCQUNqRyxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFjLENBQUMsUUFBUSxDQUFDO2dCQUMvQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxnRUFBZ0UsRUFBRSxDQUFDLENBQUM7YUFDMUc7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLHNDQUFzQyxFQUFFLENBQUMsQ0FBQztLQUNoRjtBQUtMLENBQUMsQ0FBQyxDQUFDO0FBR0gsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUUvRSxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFjLENBQUMsUUFBUSxDQUFDO0lBQy9DLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUV2QyxDQUFDLENBQUMsQ0FBQyJ9
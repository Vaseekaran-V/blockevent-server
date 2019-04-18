"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
const ticketRouter = express_1.Router();
exports.ticketRouter = ticketRouter;
ticketRouter.post("/signTicket", (req, res, next) => {
    const controller = new ticketController_1.ticketController.ticketData;
    controller.signUserTicket(req, res, next);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0QVBJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGlja2V0QVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscUNBQWtFO0FBQ2xFLHNFQUFtRTtBQUVuRSxNQUFNLFlBQVksR0FBVyxnQkFBTSxFQUFFLENBQUM7QUFZN0Isb0NBQVk7QUFUckIsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNqRixNQUFNLFVBQVUsR0FBRyxJQUFJLG1DQUFnQixDQUFDLFVBQVUsQ0FBQztJQUNuRCxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUMsQ0FBQyxDQUFDLENBQUMifQ==
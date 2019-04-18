"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express = require("express");
const apiRoutes = __importStar(require("./routes/routes"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("aws-serverless-express/middleware");
const helmet = require('helmet');
dotenv.config();
function configureApp() {
    const app = express();
    const port = process.env.PORT || 7000;
    app.use(helmet());
    app.use(middleware_1.eventContext());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(cors_1.default({
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use("/api", apiRoutes.router);
    return app;
}
exports.configureApp = configureApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHdEQUEwQztBQUMxQyxtQ0FBb0M7QUFDcEMsMkRBQTZDO0FBQzdDLCtDQUFpQztBQUNqQyxnREFBd0I7QUFDeEIsa0VBQWlFO0FBQ2pFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUVoQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsU0FBZ0IsWUFBWTtJQUMxQixNQUFNLEdBQUcsR0FBd0IsT0FBTyxFQUFFLENBQUM7SUFFM0MsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUVqQixHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUFFLGdEQUFnRCxDQUFDLENBQUM7UUFDN0YsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDO1FBR1gsU0FBUyxFQUFFLGdDQUFnQztRQUMzQyxtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLHNCQUFzQixFQUFFLEdBQUc7S0FDNUIsQ0FBQyxDQUFDLENBQUM7SUFJSixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBSTVDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsRSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBaENELG9DQWdDQyJ9
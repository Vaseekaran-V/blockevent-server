"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
function auth(req, res, next) {
    if (req.headers.authorization) {
        const lol = req.headers.authorization;
        const token = lol.split(" ");
        jwt.verify(token[1], process.env.SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                //   logger.info("Authentication failed");
                return res.status(403).json({ err: "Authentication failed" });
            }
            else {
                //  //console.log(decodedToken);
                next();
            }
        });
    }
    else {
        return res.status(400).json({ err: "The Authorization token is not found" });
    }
}
exports.auth = auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFJbEMsU0FBZ0IsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFFaEUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtRQUMzQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBUSxFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUN4RSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsMENBQTBDO2dCQUUxQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQzthQUNqRTtpQkFBTTtnQkFFSCxnQ0FBZ0M7Z0JBRWhDLElBQUksRUFBRSxDQUFDO2FBQ1Y7UUFFTCxDQUFDLENBQUMsQ0FBQztLQUNOO1NBQUs7UUFDRixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLHNDQUFzQyxFQUFFLENBQUMsQ0FBQztLQUNoRjtBQUVMLENBQUM7QUF2QkQsb0JBdUJDIn0=
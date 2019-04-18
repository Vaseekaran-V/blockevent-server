"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
let docClient = new index_1.AWS.DynamoDB.DocumentClient();
var formController;
(function (formController) {
    class formData {
        addForm(req, res, next) {
            console.log(req.body);
            const params = {
                TableName: 'Forms',
                Item: req.body
            };
            docClient.put(params, function (err1, data1) {
                if (err1) {
                    console.log(err1);
                    res.statusCode = 500;
                    res.send({ status: "DB Crashed While Adding the registration form" });
                }
                else {
                    req.body.isRegistered = true;
                    var paramsG = {
                        TableName: "Users",
                        Key: {
                            "email": req.body.email
                        }
                    };
                    docClient.get(paramsG, function (err2, data2) {
                        if (err2) {
                            res.statusCode = 500;
                            res.send({ status: "DB Crashed While Validating User" });
                        }
                        else {
                            if (JSON.stringify(data2.Item, null, 2) != null) {
                                data2.Item.isRegistered = true;
                                const params = {
                                    TableName: 'Users',
                                    Item: data2.Item
                                };
                                docClient.put(params, function (err3, data3) {
                                    if (err3) {
                                        console.log(err3);
                                    }
                                    else {
                                        res.statusCode = 200;
                                        res.send({ status: 'Registration form Added Successfully' });
                                    }
                                });
                            }
                            else {
                                res.statusCode = 400;
                                res.send({ status: 'User email invalid' });
                            }
                        }
                    });
                }
            });
        }
    }
    formController.formData = formData;
})(formController = exports.formController || (exports.formController = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3JtQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLHdDQUFtQztBQUVuQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbEQsSUFBaUIsY0FBYyxDQXVEOUI7QUF2REQsV0FBaUIsY0FBYztJQUMzQixNQUFhLFFBQVE7UUFDVixPQUFPLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtZQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QixNQUFNLE1BQU0sR0FBRztnQkFDWCxTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2FBQ2pCLENBQUM7WUFDRixTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQVMsRUFBRSxLQUFVO2dCQUNqRCxJQUFJLElBQUksRUFBRTtvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVsQixHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztvQkFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSwrQ0FBK0MsRUFBRSxDQUFDLENBQUM7aUJBQ3pFO3FCQUFNO29CQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDN0IsSUFBSSxPQUFPLEdBQUc7d0JBQ1YsU0FBUyxFQUFFLE9BQU87d0JBQ2xCLEdBQUcsRUFBRTs0QkFDRCxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO3lCQUMxQjtxQkFDSixDQUFDO29CQUNGLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBUyxFQUFFLEtBQVU7d0JBQ2xELElBQUksSUFBSSxFQUFFOzRCQUNOLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDOzRCQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLENBQUMsQ0FBQzt5QkFDNUQ7NkJBQU07NEJBQ0gsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtnQ0FDN0MsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dDQUMvQixNQUFNLE1BQU0sR0FBRztvQ0FDWCxTQUFTLEVBQUUsT0FBTztvQ0FDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO2lDQUNuQixDQUFDO2dDQUNGLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBUyxFQUFFLEtBQVU7b0NBQ2pELElBQUksSUFBSSxFQUFFO3dDQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUNBQ3JCO3lDQUFNO3dDQUNILEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO3dDQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLHNDQUFzQyxFQUFFLENBQUMsQ0FBQztxQ0FDaEU7Z0NBQ0wsQ0FBQyxDQUFDLENBQUM7NkJBQ047aUNBQU07Z0NBQ0gsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7Z0NBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDOzZCQUM5Qzt5QkFFSjtvQkFDTCxDQUFDLENBQUMsQ0FBQTtpQkFFTDtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztLQUNKO0lBckRZLHVCQUFRLFdBcURwQixDQUFBO0FBQ0wsQ0FBQyxFQXZEZ0IsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUF1RDlCIn0=
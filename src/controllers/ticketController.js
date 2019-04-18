"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fireConnection_1 = __importDefault(require("../firebase/fireConnection"));
const stellar_sdk_1 = require("stellar-sdk");
// import { Server, Network, Keypair, Transaction } from "stellar-base";
var server = new stellar_sdk_1.Server('https://horizon-testnet.stellar.org');
stellar_sdk_1.Network.useTestNetwork();
var ticketController;
(function (ticketController) {
    class ticketData {
        signUserTicket(req, res, next) {
            // var userId = firebase.auth().currentUser.uid;
            console.log(req.body);
            const sourceKeypair = stellar_sdk_1.Keypair.fromSecret('SBVB4S5BUNUNRLMBF7LJC6DQAAGCPHD6KASBJYVNL4SXARAQYMFWA6LB');
            var obj = {
                //@ts-ignore
                'status': '205',
                //@ts-ignore
                'statusText': 'Error in request body',
            };
            if (req.body.xdr) {
                const parsedTx = new stellar_sdk_1.Transaction(req.body.xdr);
                parsedTx.sign(sourceKeypair);
                let publicKey = parsedTx.source;
                let x = parsedTx.toEnvelope().toXDR().toString('base64');
                console.log(x);
                // var obj = {
                //     //@ts-ignore
                //     'status': '205',
                //     //@ts-ignore
                //     'statusText': 'Error in request body',
                // };
                server.submitTransaction(parsedTx)
                    .then(function (transactionResult) {
                    fireConnection_1.default.database().ref(`tickets/${transactionResult.hash}`)
                        .set({
                        eventID: req.body.eventID,
                        emailHash: req.body.emailHash,
                        email: req.body.email,
                        ticketCount: 1,
                        publicKey: publicKey,
                        status: "pending"
                    }).then(() => {
                        fireConnection_1.default.database().ref(`users/${req.body.emailHash}/events/${req.body.eventID}`)
                            .set({
                            ticketID: transactionResult.hash
                        }).then(() => {
                            console.log(transactionResult);
                            obj.status = '201';
                            obj.statusText = 'Success';
                            res.send(obj);
                        }).catch(() => {
                        });
                    }).catch(() => {
                    });
                }).catch(function (err) {
                    console.log(err.response);
                    obj.status = '203';
                    obj.statusText = 'Error submitting to Stellar';
                    res.send(obj);
                });
            }
            else {
                res.send(obj);
            }
        }
    }
    ticketController.ticketData = ticketData;
})(ticketController = exports.ticketController || (exports.ticketController = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpY2tldENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnRkFBa0Q7QUFFbEQsNkNBQTBHO0FBQzFHLHdFQUF3RTtBQUN4RSxJQUFJLE1BQU0sR0FBRyxJQUFJLG9CQUFNLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUMvRCxxQkFBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBSXpCLElBQWlCLGdCQUFnQixDQW9FaEM7QUFwRUQsV0FBaUIsZ0JBQWdCO0lBQzdCLE1BQWEsVUFBVTtRQUNaLGNBQWMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ2pFLGdEQUFnRDtZQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixNQUFNLGFBQWEsR0FBRyxxQkFBTyxDQUFDLFVBQVUsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1lBRXJHLElBQUksR0FBRyxHQUFHO2dCQUNOLFlBQVk7Z0JBQ1osUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsWUFBWTtnQkFDWixZQUFZLEVBQUUsdUJBQXVCO2FBQ3hDLENBQUM7WUFFRixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNkLE1BQU0sUUFBUSxHQUFHLElBQUkseUJBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUU5QyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUM1QixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFBO2dCQUMvQixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLGNBQWM7Z0JBQ2QsbUJBQW1CO2dCQUNuQix1QkFBdUI7Z0JBQ3ZCLG1CQUFtQjtnQkFDbkIsNkNBQTZDO2dCQUM3QyxLQUFLO2dCQUVMLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7cUJBQzdCLElBQUksQ0FBQyxVQUFVLGlCQUFpQjtvQkFDN0Isd0JBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDdkQsR0FBRyxDQUFDO3dCQUNELE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87d0JBQ3pCLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7d0JBQzdCLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7d0JBQ3JCLFdBQVcsRUFBRSxDQUFDO3dCQUNkLFNBQVMsRUFBRSxTQUFTO3dCQUNwQixNQUFNLEVBQUUsU0FBUztxQkFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1Qsd0JBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzZCQUM1RSxHQUFHLENBQUM7NEJBQ0QsUUFBUSxFQUFFLGlCQUFpQixDQUFDLElBQUk7eUJBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFOzRCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs0QkFDL0IsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7NEJBQ25CLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDOzRCQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUVkLENBQUMsQ0FBQyxDQUFBO29CQUNWLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7b0JBRWQsQ0FBQyxDQUFDLENBQUE7Z0JBQ1YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRztvQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzFCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO29CQUNsQixHQUFHLENBQUMsVUFBVSxHQUFHLDZCQUE2QixDQUFDO29CQUMvQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVsQixDQUFDLENBQUMsQ0FBQTthQUVUO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7UUFHTCxDQUFDO0tBQ0o7SUFsRVksMkJBQVUsYUFrRXRCLENBQUE7QUFDTCxDQUFDLEVBcEVnQixnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQW9FaEMifQ==
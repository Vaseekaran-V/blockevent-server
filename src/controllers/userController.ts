import { NextFunction, Request, Response } from "express";
import axios from 'axios';
import { AWS } from '../dao/index';
import { AES, enc } from "crypto-js";
import sha256 from "sha256";
import { Keypair } from "stellar-sdk";
import firebase from '../firebase/fireConnection'
const jwt = require('jsonwebtoken');

function hashEmail(email: any) {
    return sha256(email);
}

function decyrptSecret(secret: any, signer: any) {
    try {
        const decrypted = AES.decrypt(secret, signer);
        const plaintext = decrypted.toString(enc.Utf8);

        // //console.log('secret => ' + secret);
        // //console.log('decrypted => ' + plaintext);
        return plaintext;
    } catch (error) {
        // //console.log(error);

        return null;
    }
}


function encyrptSecret(secret: any, signer: any) {
    try {
        const ciphertext = AES.encrypt(secret, signer);

        // //console.log('secret => ' + secret);
        // //console.log('signer => ' + signer);
        // //console.log('ciphertext => ' + ciphertext);
        return ciphertext.toString();
    } catch (error) {
        // //console.log(error);
        return null;
    }
}

let docClient = new AWS.DynamoDB.DocumentClient();
export namespace userController {
    export class UserData {

        private STELLAT_FRIEND_BOT_URL = `https://friendbot.stellar.org/?addr=`;

        public getUserGitHub(req: Request, res: Response, next: NextFunction) {
            axios.get(`https://api.github.com/users/${req.params.gitID}`, {
                params: {
                    client_id: 'd043583aba9242a12df8',
                    client_secret: 'f31a713d397670fa4d79eaffade66effb9d91e2d'
                }
            }).then(response => {
                // //console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                axios.get(`https://api.github.com/users/${req.params.gitID}`, {
                    params: {
                        client_id: 'cc9899804e4f90dfe846',
                        client_secret: '45a3d82aed3b27a3fb2a3f36c65c22959f54db30'
                    }
                }).then(response => {
                    // //console.log(response.data);
                    res.send(response.data);
                }).catch(err => {
                    var obj = {
                        status: 'Getting Git User Data Failed'
                    }
                    //console.log(obj);
                    res.statusCode = 400;
                    res.send(obj);
                });
            });
        }
        public getUserStack(req: Request, res: Response, next: NextFunction) {
            axios.get(`https://api.stackexchange.com/2.2/users/${req.params.stackID}`, {
                params: {
                    order: 'desc',
                    sort: 'reputation',
                    site: 'stackoverflow',
                    key: 'SEFCadUUA4CqM91xwQvUDw%28%28'
                }
            }).then(response => {
                //console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                var obj = {
                    status: 'Getting Stack User Data Failed'
                }
                //console.log(obj);
                res.statusCode = 400;
                res.send(obj);
            });
        }
        public sendSMSToken(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            axios.post('https://ideabiz.lk/apicall/pin/verify/v1/verify',
                {
                    method: 'ANC',
                    msisdn: req.body.telephone
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer a34edf99db05d1f1ead4423d4992ce9',
                    'Accept': 'application/json'
                }
            }).then(response => {
                // //console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                var obj = {
                    status: 'sending token failed'
                }
                //console.log(obj);
                res.statusCode = 400;
                res.send(obj);
            });

        }
        public verifySMSToken(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;
            axios.post('https://ideabiz.lk/apicall/pin/verify/v1/submitPin',
                {
                    pin: req.body.pin,
                    serverRef: req.body.serverRef
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer a34edf99db05d1f1ead4423d4992ce9',
                    'Accept': 'application/json'
                }
            }).then(response => {
                // //console.log(response.data);
                res.send(response.data);

            }).catch(err => {
                var obj = {
                    status: 'verifying token failed'
                }
                //console.log(obj);
                res.statusCode = 400;
                res.send(obj);
            });


        }
        public async AddUser(req: Request, res: Response, next: NextFunction) {


            const snapshot = await firebase.database().ref(`users/${hashEmail(req.body.email.toLowerCase())}`).once('value');

            console.log(snapshot.val())
            if (snapshot.val() != null) {
                const snapshot2 = await firebase.database().ref(`legacies/${hashEmail(req.body.email.toLowerCase())}`).once('value');
                if (snapshot2.val() != null) {
                    res.statusCode = 201;
                    return res.send({ status: 'User Already Exists' });
                }
              
            }

            firebase.database().ref(`users/${hashEmail(req.body.email.toLowerCase())}`)
                .set(req.body, (err) => {
                    if (!err) {
                        firebase.database().ref(`phoneNumbers/${req.body.phoneNumber}`)
                            .set(true, (err1) => {
                                if (!err1) {
                                    res.statusCode = 200;
                                    // res.send({ status: 'User Added Successfully' });
                                    const tokenStuff = {
                                        email: req.body.email,
                                        phoneNumber: req.body.phoneNumber,
                                        username: req.body.username,
                                        publicKey: req.body.publicKey,
                                        encryptedSecret: req.body.encryptedSecret

                                    };
                                    var token = jwt.sign(tokenStuff, process.env.SECRET);
                                    //console.log(token)
                                    return res.send({ token: token });
                                } else {
                                    res.statusCode = 500;
                                    return res.send({ status: "DB Crashed While Adding New User" });
                                }
                            })
                    } else {
                        res.statusCode = 500;
                        return res.send({ status: "DB Crashed While Adding New User" });
                    }
                })


        }


        public async GetUser(req: Request, res: Response, next: NextFunction) {

            // var params = {
            //     TableName: "Users",
            //     Key: {
            //         "email": req.body.email
            //     }
            // };

            const snapshot = await firebase.database().ref(`users/${hashEmail(req.body.email.toLowerCase())}`).once('value');

            console.log(snapshot.val())
            if (snapshot.val() == null) {
                // to check for legacy users
                const snapshot2 = await firebase.database().ref(`legacies/${hashEmail(req.body.email.toLowerCase())}`).once('value');
                if (snapshot2.val() == null) {
                    res.statusCode = 202;
                    return res.send({ status: 'User not found' });
                } else {

                    const oldUser = snapshot2.val();

                    const pair = await this.createAddress();
                    let encSecret;
                    let publicK;
                    if (pair == null) {
                        // this error has been omitted in case the blockchain friendbot fails
                        // return this.createResponse(false, `Error in creating Key Pair`, null);
                        encSecret = '';
                        publicK = '';
                    } else {
                        encSecret = this.encyrptSecret(pair.secret, oldUser.pash);
                        publicK = pair.publicKey;
                    }

                    oldUser.encryptedSecret = encSecret;
                    oldUser.publicKey = publicK;


                    firebase.database().ref(`users/${hashEmail(oldUser.email.toLowerCase())}`)
                        .set(oldUser, (err) => {
                            if (!err) {
                                const userSecretKey = decyrptSecret(oldUser.encryptedSecret, req.body.password);

                                //console.log(userSecretKey);
                                if (userSecretKey != null && userSecretKey.length >= 5) {
                                    const publicKey = Keypair.fromSecret(userSecretKey).publicKey();

                                    if (oldUser.publicKey == publicKey) {
                                        // // login sucesss
                                        // let isSelected = false;
                                        // if (user.isSelected) {
                                        //     isSelected = user.isSelected;
                                        // }

                                        res.statusCode = 201;
                                        const tokenStuff = {
                                            email: oldUser.email,
                                            phoneNumber: oldUser.phoneNumber,
                                            username: oldUser.username,
                                            publicKey: oldUser.publicKey,
                                            events: oldUser.events,
                                            encryptedSecret: oldUser.encryptedSecret
                                        };
                                        var token = jwt.sign(tokenStuff, process.env.SECRET);
                                        //console.log(token)
                                        res.send({ token: token });

                                    } else {
                                        //console.log('failed');
                                        res.statusCode = 203;
                                        res.send({ status: 'login failed' });
                                    }
                                } else {
                                    //console.log('this failed');

                                    res.statusCode = 203;
                                    res.send({ status: 'login failed' });
                                }
                            } else {
                                res.statusCode = 500;
                                return res.send({ status: "DB Crashed While Updating Legacy User" });
                            }
                        })
                }

            } else {
                const user = snapshot.val()
                //console.log(data.Item);
                const userSecretKey = decyrptSecret(user.encryptedSecret, req.body.password);

                //console.log(userSecretKey);
                if (userSecretKey != null && userSecretKey.length >= 5) {
                    const publicKey = Keypair.fromSecret(userSecretKey).publicKey();

                    if (user.publicKey === publicKey) {
                        // // login sucesss
                        // let isSelected = false;
                        // if (user.isSelected) {
                        //     isSelected = user.isSelected;
                        // }

                        res.statusCode = 201;
                        const tokenStuff = {
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            username: user.username,
                            publicKey: user.publicKey,
                            events: user.events,
                            encryptedSecret: user.encryptedSecret
                        };
                        var token = jwt.sign(tokenStuff, process.env.SECRET);
                        //console.log(token)
                        res.send({ token: token });

                    } else {
                        //console.log('failed');
                        res.statusCode = 203;
                        res.send({ status: 'login failed' });
                    }
                } else {
                    //console.log('this failed');

                    res.statusCode = 203;
                    res.send({ status: 'login failed' });
                }
            }

            // docClient.get(params, function (err: any, data: any) {
            //     if (err) {
            //         res.statusCode = 500;
            //         res.send({ status: 'DB Crash' });
            //     }
            //     else if (JSON.stringify(data.Item, null, 2) == null) {
            //         res.statusCode = 202;
            //         res.send({ status: 'User not found' });
            //     } else {
            //         //console.log(data.Item);
            //         const userSecretKey = decyrptSecret(data.Item.encryptedSecret, req.body.password);

            //         //console.log(userSecretKey);
            //         if (userSecretKey != null && userSecretKey.length >= 5) {
            //             const publicKey = Keypair.fromSecret(userSecretKey).publicKey();

            //             if (data.Item.publicKey === publicKey) {
            //                 // login sucesss
            //                 let isSelected = false;
            //                 if (data.Item.isSelected) {
            //                     isSelected = data.Item.isSelected;
            //                 }

            //                 res.statusCode = 201;
            //                 const tokenStuff = {
            //                     email: data.Item.email,
            //                     phoneNumber: data.Item.phoneNumber,
            //                     username: data.Item.username,
            //                     isRegistered: data.Item.isRegistered,
            //                     // publicKey: data.Item.publicKey,
            //                     isSelected: isSelected
            //                 };
            //                 var token = jwt.sign(tokenStuff, process.env.SECRET);
            //                 //console.log(token)
            //                 res.send({ token: token });

            //             } else {
            //                 //console.log('failed');
            //                 res.statusCode = 203;
            //                 res.send({ status: 'login failed' });
            //             }
            //         } else {
            //             //console.log('this failed');

            //             res.statusCode = 203;
            //             res.send({ status: 'login failed' });
            //         }
            //     }

            // })







        }


        async createAddress() {
            try {
                const pair = Keypair.random();

                let secret = pair.secret();

                let publicKey = pair.publicKey();
                // //console.log(secret);
                // //console.log(publicKey);

                const stellarResponse = await axios.get(`${this.STELLAT_FRIEND_BOT_URL}${publicKey}`);

                // //console.log(stellarResponse);

                if (stellarResponse.status == 200) {
                    return { secret, publicKey };
                } else {
                    // return null;

                    secret = 'SCQVG3XZF5YIKL767KE7NP2QTHFSPAEV437375TB3GX5BXCDVNIU33DH';
                    publicKey = 'GBCOYU3BSZ6CD77B3NGJGOQCGC7N5YYCSENORU5NM2FEYGAKHZUZK4OY';
                    return { secret, publicKey };


                }
            } catch (error) {
                // //console.log(error);
                // return null;
                const secret = 'SCQVG3XZF5YIKL767KE7NP2QTHFSPAEV437375TB3GX5BXCDVNIU33DH';
                const publicKey = 'GBCOYU3BSZ6CD77B3NGJGOQCGC7N5YYCSENORU5NM2FEYGAKHZUZK4OY';
                return { secret, publicKey };
            }
        }

        public async GetUserDetails(req: Request, res: Response, next: NextFunction) {

            const snapshot = await firebase.database().ref(`users/${hashEmail(req.body.email.toLowerCase())}`).once('value');
            if (snapshot.val() == null) {
                res.statusCode = 202;
                return res.send({ status: 'User not found' });
            } else {
                const user = snapshot.val()
                const tokenStuff = {
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    username: user.username,
                    publicKey: user.publicKey,
                    events: user.events,
                    encryptedSecret: user.encryptedSecret
                };
                res.statusCode = 200;
                res.send(tokenStuff);
            }

        }
        public async EmailAvailability(req: Request, res: Response, next: NextFunction) {
            //first retrieve to check for dulicates
            // var paramsG = {
            //     TableName: "Users",
            //     Key: {
            //         "email": req.body.email
            //     }
            // };
            // //console.log(paramsG);

            // docClient.get(paramsG, function (err: any, data: any) {
            //     if (err) {
            //         //console.log(err)
            //         res.statusCode = 501;
            //         res.send({ status: "DB Crashed while checking whether the user object exists" });
            //     }
            //     else {
            //         if (JSON.stringify(data.Item, null, 2) == null) {
            //             res.statusCode = 200;
            //             res.send({ available: true });

            //         } else {
            //             res.statusCode = 200;
            //             res.send({ available: false });
            //         }
            //     }
            // })

            const snapshot = await firebase.database().ref(`users/${hashEmail(req.body.email.toLowerCase())}`).once('value');

            console.log(snapshot.val())
            if (snapshot.val() != null) {
                res.statusCode = 200;
                return res.send({ available: false });
            }

            res.statusCode = 200;
            return res.send({ available: true });

        }
        public async MobileNumberAvailability(req: Request, res: Response, next: NextFunction) {
            //first retrieve to check for dulicates
            // var paramsG = {
            //     TableName: "PhoneNumbers",
            //     Key: {
            //         "telephone": req.body.phoneNumber
            //     }
            // };
            //console.log(paramsG);

            // docClient.get(paramsG, function (err: any, data: any) {
            //     if (err) {
            //         //console.log(err)

            //         res.statusCode = 501;
            //         res.send({ status: "DB Crashed while checking whether the user object exists" });
            //     }
            //     else {
            //         if (JSON.stringify(data.Item, null, 2) == null) {
            //             res.statusCode = 200;
            //             res.send({ available: true });

            //         } else {
            //             res.statusCode = 200;
            //             res.send({ available: false });
            //         }
            //     }
            // })

            const snapshot = await firebase.database().ref(`phoneNumbers/${req.body.phoneNumber}`).once('value');

            console.log(snapshot.val())
            if (snapshot.val() != null) {
                res.statusCode = 200;
                return res.send({ available: false });
            }

            res.statusCode = 200;
            return res.send({ available: true });

        }

        public CheckUserAddressPresence(req: Request, res: Response, next: NextFunction) {
            //first retrieve to check for dulicates
            // var paramsG = {
            //     TableName: "Forms",
            //     Key: {
            //         "email": req.body.email
            //     }
            // };
            //console.log(paramsG);

            // docClient.get(paramsG, function (err: any, data: any) {
            //     if (err) {
            //         //console.log(err)
            //         res.statusCode = 501;
            //         res.send({ status: "DB Crashed while checking whether the user object exists" });
            //     }
            //     else {
            //         if (JSON.stringify(data.Item, null, 2) == null) {
            //             res.statusCode = 200;
            //             res.send({ present: false });
            //         } else {
            //             if (data.Item.address && data.Item.address != "") {
            //                 res.statusCode = 200;
            //                 res.send({ present: true });
            //             } else {
            //                 res.statusCode = 200;
            //                 res.send({ present: false });
            //             }

            //         }
            //     }
            // })
            res.statusCode = 200;
            res.send({ present: false });

        }

        public AddContactDetails(req: Request, res: Response, next: NextFunction) {

            var params = {
                TableName: 'Forms',
                Key: {
                    "email": req.body.email
                },
                UpdateExpression: "set address=:a",
                ExpressionAttributeValues: {
                    ":a": req.body.address
                },
                ReturnValues: "UPDATED_NEW"
            };

            console.log("Updating the item...");
            docClient.update(params, function (err: any, data: any) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    res.statusCode = 500;
                    res.send({ status: "DB Crashed While Adding User Contact Details" });
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                    res.statusCode = 200;
                    res.send({ status: "Success" });
                }
            });



        }


        encyrptSecret(secret: any, signer: any) {
            try {
                const ciphertext = AES.encrypt(secret, signer);

                // //console.log('secret => ' + secret);
                // //console.log('signer => ' + signer);
                // //console.log('ciphertext => ' + ciphertext);
                return ciphertext.toString();
            } catch (error) {
                // //console.log(error);
                return null;
            }
        }

    }
}
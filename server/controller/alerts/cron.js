const cron = require('node-cron');
const connectDB = require('../../database/dbConnection');
const domainModel = require("../../models/domainModel");
const planPurchaseModel = require("../../models/planPurchaseModel");
const userModel = require("../../models/userModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const { sendMail } = require("./sendMail");
// const { sendSMS } = require("./sendSMS");
// const { sendWhatsapp } = require("./sendWhatsapp");

// cron.schedule('* * * * *', async() => {
    const alerts = async () => {
        connectDB()
        const subscribedUsers = await planPurchaseModel.find({isActive:true});
        subscribedUsers.forEach(async(user) => {
            const userDetails = await userModel.findOne({_id: ObjectId(user.userId)});
            const domains = await domainModel.find({userId: user.userId, areNotificationsEnabled: true});
            domains.forEach(domain => {
                domain.alerts.forEach(alert => {
                    if(domain.alertTime && domain.alertDate){

                        alertHour = domain.alertTime.split(':')[0]
                        alertMinutes = domain.alertTime.split(':')[1]
                        alertDate = domain.alertDate.split('-')[2]
                        alertMonth = domain.alertDate.split('-')[1]
                        alertYear = domain.alertDate.split('-')[0]
                        if(alert == "sms"){
                            // console.log("reached here");
                            setInterval(function(){
                                console.log("in interval 1");
                                var date = new Date();
                                // console.log(date.getHours(),alertHour,date.getMinutes(),alertMinutes,date.getDate(),alertDate,0+(date.getMonth()+1).toString(),alertMonth,date.getFullYear(),alertYear);
                                if(date.getHours() == alertHour && date.getMinutes() == alertMinutes && date.getDate() == alertDate && 0+(date.getMonth()+1).toString() == alertMonth && date.getFullYear() == alertYear){
                                    // sendSMS(userDetails.countryCode+userDetails.phoneNo.toString())
                                    console.log("Sending SMS", date.toLocaleDateString());
                                }
                            }, 60000);
                        }
                        else if(alert == "whatsapp"){
                            setInterval(function(){
                                console.log("in interval 2");
                                var date = new Date();
                                if(date.getHours() == alertHour && date.getMinutes() == alertMinutes && date.getDate() == alertDate && 0+(date.getMonth()+1).toString() == alertMonth && date.getFullYear() == alertYear){
                                    // sendWhatsapp(userDetails.countryCode+userDetails.whatsappNo.toString())
                                    console.log("Sending Whatsapp Message", date.toLocaleDateString());
                                }
                            }, 60000);
                        }
                        else if(alert == "email"){
                            setInterval(function(){
                                console.log("in interval 3");
                                var date = new Date();
                                if(date.getHours() == alertHour && date.getMinutes() == alertMinutes && date.getDate() == alertDate && 0+(date.getMonth()+1).toString() == alertMonth && date.getFullYear() == alertYear){
                                    // sendMail(userDetails.email)
                                    console.log("Sending Email", date.toLocaleDateString());
                                }
                            }, 60000);
                        }
                    }

                    // console.log(domain);
                });
            });
        })
    }
    // });
alerts();
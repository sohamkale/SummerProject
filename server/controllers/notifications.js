let NotificationModel = require('../models/notification.model');
const mongoose = require('mongoose');
const notificationController = {
    add(req,res){
        const newNotif = new NotificationModel(
            {
                'userId': req.body.userId,
                'postedById':  req.body.userId,
                'postedByName': req.body.postedByName,
                'seen':false,
                'message':req.body.message,
                'postId':req.body.postId,
                'commentId':req.body.commentId,
            }
        );
        newNotif.save().then(() => res.json(newNotif)).catch(err => res.status('400').json('Error: ' + err));
    },
    seen(req,res)
    {

        // NotificationModel.findOne({'_id': new mongoose.Types.ObjectId(req.params._id)},(data,err)=>{
        //     if(err)
        //     {
        //         console.log(err)
        //         res.status('404').json(err.message);
        //     }
        //     else{
        //         console.log(data);
        //         res.json(data);
        //     }
        // });

        NotificationModel.findOneAndUpdate({'_id': new mongoose.Types.ObjectId(req.params._id)},{'seen':true},null,(err, data)=>{
            if(err)
            {
                console.log(err)
                res.status('404').json(err.message);
            }
            else{
                console.log(data);
                res.json(data);
            }
        });
    },
    all(req,res)
    {
        var validPosts=[];
        NotificationModel.find({'userId':req.params.id}).sort({'createdAt':-1}).then(
            notifs => {
                notifs.map((notif) => {
                    validPosts.push(notif);
                })
                res.json(validPosts)
            }
        ).catch(err => res.status('400').json('Error: ' + err));
    },
};

function objectify(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

module.exports = notificationController;
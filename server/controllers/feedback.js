let FeedbackModel = require('../models/feedback.model');

const feedbackController = {
    add(req,res){
        req.body= objectify(req.body);
        let feedback = req.body.feedback;
        let status = 0;

        const newFeed = new FeedbackModel(
            {
                'feedback': feedback,
                'status': status
            }
        );
        newFeed.save().then(() => res.json(newFeed)).catch(err => res.status('400').json('Error: ' + err));

    }
}

function objectify(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

module.exports = feedbackController;
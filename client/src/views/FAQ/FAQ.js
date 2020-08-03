import React from 'react'
import {Emoji} from "emoji-mart";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

function FAQ()
{
    var questions = [
        {
            question: 'What is an emortion?',
            answer: 'Emortion in our dictionary is an expression of feelings using emojis only! It is a challenge to speak less and emote more.'
        },

        {
            question: 'What is EmoteIt meant for?',
            answer: 'Our goal with this app is to allow people to have fun communicating with each other. This is a social media/guessing game where one user posts a post with only emojis according to what he is thinking. This can be a name of a movie, a thought, a common expression or something similar but should be expressed in the form of an emoji, preferably one emoji for each word, so its more guessable. Then other users will take turns guessing what the emoji means and try to answer it. We hope you guys have fun using this app.'
        },

        {
            question: 'How do you score?',
            answer: 'There are two roles that a person might take when using this app. One would be the person who is emorting (posting the emortion) and other would be anyone who are answering a particular emortion. For people creating an emortion, everytime someone likes their emortion they will get points added to their profile. For people guessing a post, depending on the accuracy of their guess to the actual meaning of the emojis they will get points out of 10 with more points when someone likes their answers.'
        },

        {
            question: 'What are rules regarding an emortion?',
            answer: '<ul>1.\tPeople who are answering posts won’t be able to see what other people have answered unless they post their answers.\n' +
                '2.\tThey will only be allowed to answer once on a particular post.\n' +
                '3.\tMain posts should only contain emojis – preferable something that is known to people so that people can be able to guess what the meaning of the emojis is.\n' +
                '4.\tAnswers to main posts can contain strings.\n</ul>'
        },

        {
            question: 'When do you see an answer?',
            answer: 'Every new post has an expiry time which is set by the person who makes the post. It can be either 1, 2, or 3 hours depending on the user input. All answers related to that post will be revealed after this time or when the user answers the emortion.'
        },
        {
            question: 'What is coming next?',
            answer: '<ul>1.\tEmojing: A system where people can chat privately with one another in separate chatrooms but only with emojis??\n' +
                '2.\tAbility to select categories regarding the post when creating a new post, a hint system??\n</ul>'
        },

    ];
    function Faq({item,index})
    {
        return (     <div className="card">
            <div className="card-header" id={"heading"+index}>
                <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={"#collapse"+index}
                            aria-expanded="false" aria-controls={"collapse"+index}>
                        {item.question}
                    </button>
                </h2>
            </div>

            <div id={"collapse"+index} className="collapse" aria-labelledby={"heading"+index}
                 data-parent="#accordionExample">
                <div className="card-body">
                  {item.answer}
                </div>
            </div>
        </div>)
    }
    return (<center>
        <h2>READY TO EMOTE IT?</h2>
        <div className="accordion col-lg-8 col-md-1 mt-5" id="accordionExample">
            {questions.map((item, index) => (
            <Faq item={item} index={index}/>
            ))}
    </div>
    <button className="btn btn-primary" onClick={()=>{window.location.href='/Home'}}>READY FOR MY FIRST EMORTION</button>
        <Disclaimer/>
    </center>)
}

export default FAQ;
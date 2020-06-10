import React, {useState} from 'react'
import $ from "jquery";

function Feedback() {
    const [submited, setSubmited] = useState(false);
    return (!submited) ? (
        <div className={"container-fluid"}>
            <center>
                <form id="feedbackForm" onSubmit={submit}>
                    <label className={"btn btn-secondary"}>Please Enter Any thoughts or needed changes or suggestion
                        Here.</label>
                    <textarea required className={"form-control w-75"} name={"feedback"}></textarea>
                    <input type={"submit"} className="btn btn-info mt-2"/>
                </form>
            </center>
        </div>
    ) : (<div className={"container-fluid"}>
        <center>
        <label className={"btn btn-secondary"}>Thank you for your time and evaluation. The feedback is much
            appreciated!</label>
            <input type="button" className="btn btn-info" onClick={again} value="Another Feedback"/>
        </center>
    </div>);

    function again(){
        setSubmited(false);
    }
    function submit(e) {
        e.preventDefault();
            var form = $('#feedbackForm').serializeArray();

            $.ajax({
                url: '/api/feedback',
                type: 'POST',
                data: JSON.stringify(
                    form
                ),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                  setSubmited(true);
                }
            });
    }
}

    export default Feedback;
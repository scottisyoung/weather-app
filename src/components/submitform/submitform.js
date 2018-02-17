import React, {Component} from 'react';

function SubmitForm (props) {
    return (
        <div>
            <form onSubmit={props.submit} className="form-inline mt-5 justify-content-between">
                <input value={props.inputValue} onChange={props.change} className="form-control col-8 mb-4 mb-sm-0" type="text" placeholder="City, State or Zip Code"></input>
                <button type="submit" className="btn col-3 btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default SubmitForm;
import React from 'react';

function UnitSwitch (props) {
    return (
        <div>
            <div className="d-inline-block btn-group btn-group-sm" data-toggle="buttons">
                <label id="F" onClick={props.handleClick} className="btn btn-primary active">
                <input type="hidden" name="options"></input>
                &deg; F
              </label>
              <label id="C" onClick={props.handleClick} className="btn btn-primary">
                <input type="hidden" name="options"></input>
                &deg; C
              </label>
            </div>
        </div>
    )
}
export default UnitSwitch;
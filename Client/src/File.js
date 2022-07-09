import React from 'react';
import './File.css'
const File = (props) => {
    return (
        <div>
            <div className="fileMainContainer" >
                <h6>{props.file.name}</h6>
                <div className="progressContainer">
                    {props.file.Uploaded && <div className="progressBar" role='progressbar'
                        aria-valuenow={props.file.Uploaded}
                        aria-valuemin='0' aria-valuemax='100' style={{ width: `${props.file.Uploaded}%` }}>

                    </div>
                    }
                    {props.file.Uploaded ? <span className="span" style={{ 'color': '#292c35', 'font-weight': '600' }}>{props.file.Uploaded} %</span> : <span className="span">Ready To Upload</span>}
                </div>
            </div >
        </div>

    );
}

export default File;

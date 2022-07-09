import React, { useRef, useState, useEffect, formData } from 'react';
import './FileUpload.css'
import File from './File'
import axios from 'axios';
const Fileupload = () => {
    const [Drag, setDrag] = useState(false);
    const [Files, setFiles] = useState([]);
    const inputRef = useRef(null);
    console.log('deep patel');
    let ShowFiles = Files.map(file => {
        return <File file={file} />
    })

    function handleStyleForDrag(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDrag(true);
        } else {
            setDrag(false);
        }
    }
    function handleDropedFile(event) {
        event.preventDefault();
        event.stopPropagation();
        setDrag(false);
        console.log('deep patel')
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setFiles((prevFiles) => ([...prevFiles, ...event.dataTransfer.files]));
        }
    }

    function handleFile(event) {
        event.preventDefault();
        setDrag(false);
        if (event.target.files && event.target.files[0]) {
            setFiles((prevFiles) => ([...prevFiles, ...event.target.files]));
        }
    }

    function inputClick() {
        inputRef.current.click();
    }
    function handleUploadOfTheFile() {
        postRequest();
    }
    async function postRequest() {
        const formData = new FormData();
        for (let i = 0; i < Files.length; i++) {
            console.log(Files[i]);
            formData.append('files', Files[i]);

            if (!Files[i].Uploaded) {
                try {
                    const result = await axios.post('/upload', formData, {
                        onUploadProgress: (data) => {
                            if (Files[i].Uploaded !== 100) {
                                setFiles(prevFiles => {
                                    const File = prevFiles.find(file => file.name === Files[i].name);
                                    let index = prevFiles.indexOf(File);
                                    if (~index) {
                                        File.Uploaded = Math.round((data.loaded / data.total) * 100);
                                        prevFiles[index] = File;
                                    }
                                    return [...prevFiles];
                                })
                            }
                        }
                    });
                    console.log('result is')
                    console.log(result);
                } catch (e) { console.log(e) }
            }

        }
    }
    useEffect(() => {
        ShowFiles = Files.map(file => {
            return <File file={file} />
        })
    }, [Files]);
    return (
        <div className="mainContainer">
            <div className="form-mainContainer">
                <input type="file" id="inputLabel" multiple={true} ref={inputRef} onChange={handleFile} className="form-input" />
                <label htmlFor='inputLabel'>
                    <div className={Drag ? "DragElementContainer" : "elementContainer"} onDragEnter={handleStyleForDrag}>
                        <p>All the files are Supported</p>
                        <button className="button-selectFiles" onClick={inputClick}>Click inside the box to select the files</button>
                    </div>
                </label>
                {Drag && <div className="form-drop-file" onDragEnter={handleStyleForDrag} onDragOver={handleStyleForDrag} onDrop={handleDropedFile} onDragLeave={handleStyleForDrag}></div>}
                {Files.length > 0 && <button className="button-uploadFiles" onClick={handleUploadOfTheFile}>Click to upload files</button>}
            </div>
            <div>
                {ShowFiles}
            </div>
        </div>
    );
}
export default Fileupload;
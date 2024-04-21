import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import style from '../../CSS/Announcement/MakeAnnouncement.module.css';
import { Cross, Pdf, Send, Upload } from '../helper/icons';
import { useAppSelector } from '../../states/Hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { MakeAnnouncements } from '../../states/Announcement';

const MakeAnnouncement = (): React.JSX.Element => {
    const isActive = useAppSelector(state=>state.userInterface.isActive)
    const inputfileRef = useRef<HTMLInputElement>(null);
    const inputSubmitRef = useRef<HTMLButtonElement>(null);
    const Id = useAppSelector(state => state.userInterface.classroomDetail?._id);
    const dispatch = useDispatch<AppDispatch>();
    const[isVisible,setIsVisible] = useState(false); // to check if user visited the Announcement section and then display the upload and submit button
    const [files, setFiles] = useState<File[]>([]);
    const [announcement, setAnnouncement] = useState<string>('');
    const [hasSubmitted,setHasSubmitted] = useState(false)  //to disable submit button once the user has clicked on submit

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        inputSubmitRef.current?.click();
    };

    const handleUploadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        inputfileRef.current?.click();
    };

    const handleSelectedFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = e.target.files[0];
            if (selectedFiles !== undefined) { //this is for the case where user close the file window without selecting any file
                setFiles(prevFiles => [...prevFiles, selectedFiles]);
            }
        }
    };

    const handleAnnouncementChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnnouncement(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setHasSubmitted(true)
            const formData = new FormData();
            formData.append('message', announcement);
            if (Id) {
                formData.append('Id', Id);
            }
            files.forEach(file => {
                formData.append('files', file);
            });
            dispatch(MakeAnnouncements(formData)).then((result) => {
                if(result.payload.success)
                window.location.reload()

                setHasSubmitted(false)
            });

        } catch (error) {
            console.error('Error submitting announcement:', error);
        }
    };

    const removeFile = (indexToRemove: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };


    return (
        <div className={style.announcement_container} onClick={()=>{setIsVisible(true)}} >
            <form className={style.announcement_form} onSubmit={handleSubmit}>
                <textarea placeholder="Announce something to your class" name='announcement' value={announcement} onChange={handleAnnouncementChange} className={`${style.textArea} ${isVisible?style.FocusedtextArea:''}`} disabled={!isActive} required></textarea>
                <input type='file' name='files' ref={inputfileRef} accept='image/jpeg, image/png, application/pdf' style={{ display: 'none' }} onChange={handleSelectedFile} disabled={!isActive}></input>
                <button type='submit' style={{ display: 'none' }} ref={inputSubmitRef} disabled={!isActive}></button>
            </form>

            <div className={style.file_cards_container} >
                {files && files.map((file, index) => (
                    <div className={style.small_pdf_card}>

                        <div className={style.thumbnail}>
                            <Pdf />
                        </div>

                        <div className={style.info}>
                            <div className={style.name}>{file.name}</div>
                            <div>{(file.size / 1024).toFixed(2)} KB</div>
                        </div>
                        <div onClick={() => { removeFile(index) }}>
                            <Cross />
                        </div>
                    </div>
                ))}
            </div>

            <div className={style.buttons_container} style={{display:isVisible?'block':'none'}}>
                <button onClick={handleUploadClick} disabled={files.length < 3 ? false : true}>
                    <Upload />
                </button>
                <button onClick={handleLinkClick} disabled={hasSubmitted}>
                    <Send />
                </button>
            </div>
        </div>
    );
};

export default MakeAnnouncement;

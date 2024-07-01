import { Cross, GoBack, GoogleInitial, Pdf, Upload } from '../helper/icons';
import PdfComponent from './PdfComponent';
import style from '../../CSS/Announcement/AnnouncementDescription.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { addComments, fetchComments } from '../../states/comments';
import { useAppDispatch, useAppSelector } from '../../states/Hooks';
import { setLoadingState } from '../../states/UserInterface';
import CommentCard from './CommentCard';


interface filesStructure {
    name: string,
    contentType: string,
    data: string
}

const AnnouncementDescription = (): React.JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const announcement = location.state || {};
    const id = useAppSelector(state => state.userInterface.classroomDetail?._id);
    const announcementComments = useAppSelector(state => state.comments.comments);

    const [comment, setComment] = useState<string>('');
    const [showInputField, setShowInputField] = useState<boolean>(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);

    const inputfileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(setLoadingState(true));
        if (id !== undefined && announcement._id !== undefined) {
            dispatch(fetchComments({ id, announcementId: announcement._id })).then(() => {
                dispatch(setLoadingState(false));
            }).catch(() => {
                dispatch(setLoadingState(false));
            });
        }
        else {
            dispatch(setLoadingState(false));
        }
        //eslint-disable-next-line
    }, [])

    const handleChange = (e: React.ChangeEvent) => {
        setComment((e.target as HTMLInputElement).value);
    }

    const handleUploadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        inputfileRef.current?.click();
    };

    const handleSelectedFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = e.target.files[0];
            if (selectedFiles !== undefined) {
                if(files.length>=1)
                    {
                        return
                    }
                setFiles(prevFiles => [...prevFiles, selectedFiles]);
            }
        }
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisableSubmit(true);
        const formData = new FormData();
        formData.append('text', comment);
        formData.append('AnnouncementId', announcement._id)
        if (id) {
            formData.append('id', id);
        }

        
            formData.append('files', files[0]);
       
        dispatch(addComments(formData)).then(res => {
            if (res.payload.success) {
                setComment('');
                setFiles([]);
            }
            setDisableSubmit(false)
        })
    }


    const removeFile = (indexToRemove: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };



    return (
        <>
            <div className={style.go_back_button} onClick={() => { navigate(-1) }}>
                <GoBack />
            </div>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.profile}>
                        <GoogleInitial />
                    </div>
                    <div>
                        <div><b>Room Admin</b></div>
                        <small>{`${announcement.date}`.split('T')[0]}</small>
                    </div>
                </div>
                <div className={style.main}>
                    {
                        `${announcement.announcement}`
                    }
                    <h4>Attachments</h4>
                    <div className={style.announcement_files}>
                        {
                            announcement.files && announcement.files.map((element: filesStructure, index: number) => (
                                <PdfComponent key={index} files={element} />
                            ))
                        }
                    </div>

                </div>

            </div>

            <div className={style.comment_container}>
                <div className={style.make_comment}>
                    <p onClick={() => setShowInputField(true)} style={{ display: showInputField ? 'none' : 'block' }}>Add comment</p>


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
                    <form onSubmit={handleSubmit} className={style.comment_form} style={{ display: showInputField ? 'flex' : 'none' }}>
                        <input type='text' placeholder='Add Comment' value={comment} onChange={handleChange} required></input>
                        <input type='file' name='files' ref={inputfileRef} accept='image/jpeg, image/png, application/pdf' style={{ display: 'none' }} onChange={handleSelectedFile}></input>
                        <button onClick={handleUploadClick} disabled={files.length < 1 ? false : true} className={style.upload_button}>
                            <Upload />
                        </button>
                        <button type='submit' disabled={disableSubmit} className={style.submit_button}>Submit</button>
                    </form>
                </div>

                <div className={style.made_comment}>
                    <h4>Comments </h4>
                    {
                        announcementComments.map((value, index) =>
                            <CommentCard key={index} prop={value}/>
                        )
                    }
                </div>

            </div>

        </>
    )
}

export default AnnouncementDescription;
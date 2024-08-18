import { GoBack, GoogleInitial, Spinner, Upload } from '../helper/icons';
import PdfComponent from './PdfComponent';
import style from '../../CSS/Announcement/AnnouncementDescription.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { addComments, fetchComments, incrementPage } from '../../states/comments';
import { useAppDispatch, useAppSelector } from '../../states/Hooks';
import { setLoadingState } from '../../states/UserInterface';
import CommentCard from './CommentCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Send } from '../helper/icons';



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
    const totalCount = useAppSelector(state => state.comments.totalCount);
    const isLoading = useAppSelector(state => state.userInterface.isLoading)


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
                if (files.length >= 1) {
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


    const hasMore = () => {
        if (announcementComments.length < totalCount) {
            return true;
        }
        else {
            return false;
        }
    }

    const fetchMore = () => {
        dispatch(incrementPage());
        if (id !== undefined && announcement._id !== undefined) {
            dispatch(fetchComments({ id, announcementId: announcement._id }));
        }
    }



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

                    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                        {files && files.map((file, index) => (
                            <Chip icon={<PictureAsPdfIcon />} label={`${file.name}
                 ${(file.size / 1024).toFixed(2)}KB`} variant="outlined" onDelete={() => removeFile(index)} />
                        ))}
                    </Stack>
                    <form onSubmit={handleSubmit} className={style.comment_form} style={{ display: showInputField ? 'flex' : 'none' }}>
                        <input type='file' name='files' ref={inputfileRef} accept='image/jpeg, image/png, application/pdf' style={{ display: 'none' }} onChange={handleSelectedFile}></input>
                        <FormControl variant="outlined">
                            <InputLabel>comment</InputLabel>
                            <OutlinedInput
                                type='text'
                                label="comment"
                                value={comment}
                                onChange={handleChange}
                                required
                                placeholder='Add comment'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleUploadClick} disabled={files.length < 1 ? false : true}>
                                            <Upload />
                                        </IconButton>
                                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" disabled={disableSubmit} type='submit'>
                                            <Send />
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />
                        </FormControl>
                    </form>
                </div>

                <div className={style.made_comment}>
                    <h4>Comments </h4>
                    {

                        isLoading ? ('') : (totalCount > 0 ? (
                            <InfiniteScroll
                                dataLength={announcementComments.length}
                                hasMore={hasMore()}
                                next={fetchMore}
                                loader={<div style={{ margin: ' 1em auto', maxWidth: 'max-content' }}>
                                    <Spinner />
                                </div>}
                            >
                                {announcementComments.map((value, index) => {
                                    // console.log(value)
                                    return <CommentCard key={index} prop={value} />
                                })}
                            </InfiniteScroll>

                        ) : (
                            ''
                        ))
                    }
                </div>

            </div>

        </>
    )
}

export default AnnouncementDescription;
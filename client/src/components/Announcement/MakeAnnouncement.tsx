import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import style from '../../CSS/Announcement/MakeAnnouncement.module.css';
import { Send, Upload } from '../helper/icons';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useAppSelector } from '../../states/Hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { MakeAnnouncements } from '../../states/Announcement';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const MakeAnnouncement = (): React.JSX.Element => {
    const isActive = useAppSelector(state => state.userInterface.isActive);
    const inputfileRef = useRef<HTMLInputElement>(null);
    const inputSubmitRef = useRef<HTMLButtonElement>(null);
    const Id = useAppSelector(state => state.userInterface.classroomDetail?._id);
    const dispatch = useDispatch<AppDispatch>();

    const [isVisible, setIsVisible] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [announcement, setAnnouncement] = useState<string>('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

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
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                setFiles(prev => [...prev, selectedFile]);
            }
        }
    };

    const handleAnnouncementChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnnouncement(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setHasSubmitted(true);
            const formData = new FormData();
            formData.append('message', announcement);
            if (Id) formData.append('Id', Id);
            files.forEach(file => formData.append('files', file));

            dispatch(MakeAnnouncements(formData)).then(result => {
                if (result.payload.success) {
                    setAnnouncement('');
                    setFiles([]);
                }
                setHasSubmitted(false);
            });
        } catch (error) {
            console.error('Error submitting announcement:', error);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div
            className={style.announcement_container}
            onClick={() => setIsVisible(true)}
            style={{ display: isActive ? 'block' : 'none' }}
        >
            <form className={style.announcement_form} onSubmit={handleSubmit}>
                <textarea
                    placeholder="Announce something to your class..."
                    name="announcement"
                    value={announcement}
                    onChange={handleAnnouncementChange}
                    className={`${style.textArea} ${isVisible ? style.FocusedtextArea : ''}`}
                    disabled={!isActive}
                    required
                ></textarea>

                <input
                    type="file"
                    ref={inputfileRef}
                    accept="image/jpeg, image/png, application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleSelectedFile}
                    disabled={!isActive}
                />
                <button type="submit" style={{ display: 'none' }} ref={inputSubmitRef} disabled={!isActive}></button>
            </form>

            {files.length > 0 && (
                <Stack
                    spacing={1}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                    className={style.filesStack}
                >
                    {files.map((file, index) => (
                        <Chip
                            key={index}
                            icon={<PictureAsPdfIcon />}
                            label={`${file.name} (${(file.size / 1024).toFixed(2)} KB)`}
                            variant="outlined"
                            onDelete={() => removeFile(index)}
                        />
                    ))}
                </Stack>
            )}

            <div className={`${style.buttons_container} ${isVisible ? style.showButtons : ''}`}>
                <button
                    className={style.iconButton}
                    onClick={handleUploadClick}
                    disabled={files.length >= 3}
                    title="Upload file"
                >
                    <Upload />
                </button>
                <button
                    className={`${style.iconButton} ${style.sendButton}`}
                    onClick={handleLinkClick}
                    disabled={hasSubmitted}
                    title="Send announcement"
                >
                    <Send />
                </button>
            </div>
        </div>
    );
};

export default MakeAnnouncement;

import { GoBack, GoogleInitial } from '../helper/icons';
import PdfComponent from './PdfComponent';
import style from '../../CSS/Announcement/AnnouncementDescription.module.css';
import { useLocation, useNavigate } from 'react-router-dom';


interface filesStructure {
    name: string,
    contentType: string,
    data: string
}

// interface Announcement {
//     _id: string
//     announcement: string,
//     date: Date,
//     classId: string,
//     files: filesStructure[] | null
// }

const AnnouncementDescription = (): React.JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const announcement = location.state || {};
    console.log(announcement)
    return (
        <>
        <div className={style.go_back_button} onClick={()=>{navigate(-1)}}>
        <GoBack/>
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
          
        </>
    )
}

export default AnnouncementDescription;
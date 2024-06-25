import { useNavigate } from 'react-router-dom';
import style from '../../CSS/Announcement/AnnouncementCard.module.css';
import { GoogleInitial } from '../helper/icons';
import PdfComponent from './PdfComponent';


interface filesStructure {
    name: string,
    contentType: string,
    data: string
}

interface Announcement {
    _id: string
    announcement: string,
    date: Date,
    classId: string,
    files: filesStructure[] | null
}

const AnnouncementCard = ({ announcement }: { announcement: Announcement }): React.JSX.Element => {
    // const classAdmin = useAppSelector(state => state.userInterface.classroomDetail?.adminName)
    const navigate = useNavigate();
    return (
        <div className={style.announcement_card} onClick={()=>{
            navigate('/announcement/description',{state:announcement})
        }}>
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
                {
                    announcement.files && announcement.files.map((element,index)=>(
                        <PdfComponent key={index} files={element}/>
                    ))

                }
            </div>
            
        </div>
    )
}

export default AnnouncementCard;



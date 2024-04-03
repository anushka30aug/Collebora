import { NoAnnouncement } from "../helper/icons";
import style from '../../CSS/Announcement/NoAnnouncements.module.css'
const NoAnnouncements = (): React.JSX.Element => {
    return (
        <div className={style.container}>
            <NoAnnouncement />
            <div className={style.content}>
                <h4>No Announcement</h4>
                <p>This is where the latest Announcements of Room are visible</p>
            </div>
        </div>
    )
}

export default NoAnnouncements;
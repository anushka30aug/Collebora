import style from '../../CSS/Announcement/CommentCard.module.css'
import PdfComponent from './PdfComponent'

interface fileStructure {
    name: string,
    contentType: string,
    data: string
}

interface postedBy{
    name:string,
    profilePicture:string,
    _id:string
}

interface commentStructure {
    _id: string,
    announcementId: string,
    date: Date,
    postedBy: postedBy,
    text: string,
    files: fileStructure[] | null
}

const CommentCard = ({prop}:{prop:commentStructure}): React.JSX.Element => {
    return (
        <div>
            <div className={style.card_header}>
                <div className={style.comment_header_left}>
                    <img src={prop.postedBy.profilePicture} alt="profile"/>
                </div>
                <div className={style.comment_header_right}>
                    <h5>{prop.postedBy.name}</h5>
                </div>
            </div>
            <div className={style.card_body}>
                <p>{prop.text}</p>
            </div>
            <div className={style.comment_files}>
                        {
                            prop.files?.map((element: fileStructure, index: number) => (
                                <PdfComponent key={index} files={element} />
                            ))
                        }
                    </div>
        </div>
    )
}

export default CommentCard;
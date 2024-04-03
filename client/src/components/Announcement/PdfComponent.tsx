import style from '../../CSS/Announcement/PdfComponent.module.css';
import { Pdf } from '../helper/icons';

interface FilesStructure {
    name: string;
    contentType: string;
    data:string;
}

const PdfComponent = ({ files }: { files: FilesStructure }): React.ReactElement => {
    const handleClick = () => {
        // Convert base64 data to a Blob
        const byteCharacters = atob(files.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: files.contentType });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Open the file in a new tab
        window.open(url);
    };

    return (
        <div className={style.small_pdf_card} onClick={handleClick}>
            <div className={style.thumbnail}>
                <Pdf />
            </div>
            <div className={style.info}>
                <div className={style.name}>{files.name}</div>
            </div>
        </div>
    );
};

export default PdfComponent;

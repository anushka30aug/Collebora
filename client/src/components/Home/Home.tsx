import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../helper/Navbar";
import Menu from "../helper/Menu";
import style from '../../CSS/Home/Home.module.css'
import { useAppSelector } from "../../states/Hooks";
import MainContent from "./MainContent";
import DeleteRoom from "../modal/DeleteRoom";
import RenameRoom from "../modal/RenameRoom";


const Home = (): React.JSX.Element => {
    const navigate = useNavigate();
    const deleteRoom = useAppSelector(state => state.userInterface.showDeleteModal);
    const renameRoom = useAppSelector(state => state.userInterface.showRenameModal);
    useEffect(() => {
        if (localStorage.getItem('auth-token-workspace') === null || undefined) {
            navigate('/auth');
        }
        //eslint-disable-next-line
    }, [])


    return (
        <div className={style.home_component}>
            {/* {createRoom && <CreateRoom />} */}
            {deleteRoom && <DeleteRoom />}
            {renameRoom && <RenameRoom />}
            {/* {menuOption==='Logout' && <Logout/>} */}
           
            <header className={style.header}>
                <Navbar />
            </header>
            <main className={style.main_content}>
                <Menu />

                <MainContent />

            </main>
        </div>
    )
}

export default Home; 
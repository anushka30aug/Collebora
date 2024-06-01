import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../helper/Navbar";
import Menu from "../helper/Menu";
import style from '../../CSS/Home/Home.module.css'
import CreateRoom from "../Room/CreateRoom";
import { useAppSelector } from "../../states/Hooks";
import MainContent from "./MainContent";

const Home = (): React.JSX.Element => {
    const navigate = useNavigate();
    const isModal = useAppSelector(state => state.userInterface.showCreateModal);
    useEffect(() => {
        if (localStorage.getItem('auth-token-workspace') === null || undefined) {
            navigate('/auth');
        }
        //eslint-disable-next-line
    }, [])


    return (
        <div className={style.home_component}>
            {isModal && <CreateRoom />}
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
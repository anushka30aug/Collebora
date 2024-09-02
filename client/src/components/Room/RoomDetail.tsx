import React, { useEffect } from "react"
import Navbar from "../helper/Navbar";
import style from '../../CSS/Room/RoomDetail.module.css'
import Menu from "../helper/Menu";
import MainContent from "./MainContent";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../states/Hooks";

const RoomDetail = (): React.JSX.Element => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('auth-token-workspace')
        if (!token) {
            navigate('/auth')
        }
      // eslint-disable-next-line
    }, [])
    return (
        <div className={style.roomDetail_container}>
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

export default RoomDetail;
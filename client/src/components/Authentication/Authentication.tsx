import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../../CSS/Authentication/Authentication.module.css';
import { Google } from '../helper/icons';
import classroomImg from '../helper/authentication.jpg';

const host = process.env.REACT_APP_IP_ADDRESS;

const Authentication = (): React.JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('auth-token-workspace')) navigate('/');
  }, [navigate]);

  const handleLogin = () => {
    window.open(`${host}/classroom/authentication/google`, '_self');
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.imageWrapper}>
          <img src={classroomImg} alt="Classroom" className={style.image} />
        </div>

        <h1 className={style.title}>Welcome to <span>Collebora</span></h1>
        <p className={style.subtitle}>
          Sign in to continue to your workspace
        </p>

        <button className={style.googleButton} onClick={handleLogin}>
          <Google />
          <span>Continue with Google</span>
        </button>

        <p className={style.note}>
          By signing in, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Authentication;

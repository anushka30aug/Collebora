import { useLocation, useNavigate } from 'react-router-dom';
import style from '../../CSS/Authentication/AuthRedirect.module.css'
import { Spinner } from '../helper/icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../states/User';
import { AppDispatch } from '../../states/Store';
// import { fetchClassrooms } from '../../states/Room';

const AuthRedirect = (): React.JSX.Element => {
   const location = useLocation();
   const navigate = useNavigate();
   const params = new URLSearchParams(location.search);
   const token = params.get('token');
   const dispatch = useDispatch<AppDispatch>();
   useEffect(()=>{
      if (token) {
         localStorage.setItem('auth-token-workspace', token);
         dispatch(fetchUser()).then(user=>navigate('/'));
         // dispatch(fetchClassrooms())
      }
   },[token])
   
   return (
      <div className={style.loadingComponent}>
            <Spinner/>
            <b>Loading...</b>
      </div>
   )
}

export default AuthRedirect;
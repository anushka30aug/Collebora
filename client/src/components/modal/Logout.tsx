import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../states/Hooks';
import { setIsActive, setMenuOption } from '../../states/UserInterface';
import { useNavigate } from 'react-router-dom';

const Logout = (): React.JSX.Element => {
    const option = useAppSelector(state=>state.userInterface.menuOption);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClose=()=>{
      dispatch(setIsActive(true));
        dispatch(setMenuOption('home'));
        
    }
    
    return(
    <Dialog
        open={option==='Logout'}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Wait! Are you sure want to log out?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          We hate to see you go! If you log out now, you might miss out on new updates
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Stay Logged In</Button>
          <Button onClick={()=>{
            localStorage.removeItem('auth-token-workspace');
            sessionStorage.clear();
            navigate('/auth');
            dispatch(setMenuOption('home'));
         
          }}>Log Out Anyway</Button>
        </DialogActions>
      </Dialog>
    )
}

export default Logout;
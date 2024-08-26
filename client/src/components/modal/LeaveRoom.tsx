import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { leaveRoom } from '../../states/RoomMembers';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import { editShowLeaveModal } from '../../states/UserInterface';
import { useAppSelector } from '../../states/Hooks';


const LeaveRoom = ({id}:{id:string}): React.JSX.Element => {
    const dispatch =useDispatch<AppDispatch>()
    const open = useAppSelector(state=>state.userInterface.showLeaveModal);
    const handleLeaveClick =(e:React.MouseEvent)=>{
        e.preventDefault();
        dispatch(leaveRoom({id})).then(result=>{
            if(result.payload.success)
                {
                    window.location.reload();
                }
        })
        dispatch(editShowLeaveModal());
    }

    const handleClose=()=>{
        dispatch(editShowLeaveModal())
    }

    return (
        <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Wait! Are you sure want to leave this room?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          on leave you would no longer receive updates from this room
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLeaveClick}>Leave Anyway</Button>
        </DialogActions>
      </Dialog>
    )
}

export default LeaveRoom;
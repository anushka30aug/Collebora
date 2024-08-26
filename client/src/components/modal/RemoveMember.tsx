import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { useAppSelector } from '../../states/Hooks';
import { RemoveMember } from '../../states/RoomMembers';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { editShowRemoveModal } from '../../states/UserInterface';
import { DialogContentText } from '@mui/material';



const RemoveMembers = ({ userToRemove }: {
    userToRemove: string;
}
): React.JSX.Element => {

    const [code, setCode] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const Id = useAppSelector(state => state.userInterface.classroomDetail?._id)
    const open = useAppSelector(state => state.userInterface.showRemoveModal);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Id !== undefined)
            dispatch(RemoveMember({ userToRemove, Id, classcode: code })).then((result)=>{
               if(result.payload.success)
                {
                    window.location.reload()
                }
            })
        dispatch(editShowRemoveModal());
    }


    return (
        <Dialog
        open={open}
        onClose={() => { return dispatch(editShowRemoveModal()) }}
        maxWidth="sm" // or 'md', 'lg', etc.
        fullWidth={true}
    >
        <DialogTitle>Remove member</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Enter the room code to confirm the removal of the member
          </DialogContentText>
            <form onSubmit={handleSubmit}>
                <TextField type="password" name="code" placeholder='room Code' title='(secret code should not be shared with anyone)'  margin="dense" value={code} onChange={handleChange} inputProps={{ minLength: 6 }} fullWidth required variant="standard"/>
                <DialogActions>
                    <Button onClick={() => { dispatch(editShowRemoveModal()) }}>cancel</Button>
                    <Button type="submit" disabled={code.length >= 6 ? false : true}>Remove</Button>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
    )
}

export default RemoveMembers;
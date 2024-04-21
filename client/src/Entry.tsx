import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Authentication/Authentication';
import AuthRedirect from './components/Authentication/AuthRedirect';
import Home from './components/Home/Home';
import JoinRoom from './components/Room/JoinRom';
import RoomDetail from './components/Room/RoomDetail';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useEffect, useRef } from 'react';
import { useAppSelector } from './states/Hooks';
import { useChatSocketCtx } from './context/SocketContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './states/Store';
import { fetchUser } from './states/User';
import { newMessage } from './states/Message';

const Entry = (): React.JSX.Element => {
  const { socket } = useChatSocketCtx()
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<null | LoadingBarRef>(null);
  const Loading = useAppSelector(state => state.userInterface.isLoading)
 
  useEffect(() => {
    if (Loading) {
      ref.current?.continuousStart()
    }
    else {
      ref.current?.complete()
    }
  }, [Loading])

  useEffect(() => {
    if (localStorage.getItem('auth-token-workspace')) {
      socket.connect();
      console.log(socket)
      dispatch(fetchUser()).then((result) => {
        if (result.payload.success) {
          socket.emit("setup", result.payload.data._id)
        }
      })
      socket.on("connected", (userId) => {
        console.log(userId)
    })
    socket.on("message received", (Message) => {
        console.log(Message)
        dispatch(newMessage(Message));
    })
      return () => {
        socket.disconnect();
      };
    }
    //eslint-disable-next-line
  }, [socket]);

  

  return (
    <div>
      <LoadingBar color='#0057ee' ref={ref} height={5} loaderSpeed={1000} />
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/auth' Component={Auth}></Route>
          <Route path='/authRedirect' Component={AuthRedirect}></Route>
          <Route path='/joinRoom' Component={JoinRoom}></Route>
          <Route path='/room' Component={RoomDetail}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Entry;
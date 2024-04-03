import {useDispatch , useSelector, TypedUseSelectorHook} from 'react-redux';
import { RootState , AppDispatch } from './Store';

export const useAppDispatch:()=>AppDispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
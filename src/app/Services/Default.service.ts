import {InjectionToken} from '@angular/core';
import { IPost } from '../Interfaces/Interfaces';
    
export const DEFAULT_SETTINGS = new InjectionToken<IPost>('settings');
export const DEFAULT_VALUE: IPost = {
             title:"",
             img:"",
             excerpt:"",
             categories:"angular",
             id:0,
             content:[]
}

export const ADD_PHOTO = new InjectionToken<IPost>('settings');
export const ADD_PHOTO_VALUE: FormData  =  new FormData();
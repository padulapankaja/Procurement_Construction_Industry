import { SET_CURRENT_USER } from './types'

// user authentication
export function setCurrentUser(user){
    return {
        type : SET_CURRENT_USER,
        user
    };
}

export function SignOut(){
    return {
        type : 'USER_LOGOUT'
    };
}
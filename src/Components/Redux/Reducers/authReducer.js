import { SET_CURRENT_USER } from '../Action/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log(!isEmpty(action.user))
            console.log(action.user)
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        default:
            return state
    }

}

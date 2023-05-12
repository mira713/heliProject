import {GET_DATA,LOADING_DATA} from './type';

let initialData = {
    loading : false,
    data : [],
}

const cardReducer = (state=initialData, {type,payload}) => {
    switch(type){
        default : {
          return state;
        }

        case  GET_DATA : {
           return {
             ...state,
             data : payload,
             loading : false
           }
        }

        case LOADING_DATA : {
            return {
                ...state,
                loading : true
            }
        }
    }
}

export default cardReducer
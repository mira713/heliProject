import {GET_DATA,LOADING_DATA, SEARCH_DATA, UPDATE_DATA} from './type';

let initialData = {
    loading : false,
    data : [],
    dataa:[]
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
             dataa : payload,
             loading : false
           }
        }
        case SEARCH_DATA : {
            return {
                ...state,
                data : payload,
            }
        }
        case UPDATE_DATA : {
            return {
                ...state,
                data : payload,
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
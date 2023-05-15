import {GET_DATA,LOADING_DATA,SEARCH_DATA,UPDATE_DATA} from "./type";
import axios from 'axios';

export const getData = (page=1,queryParam,avail='') => async(dispatch)=>{
    dispatch({type:LOADING_DATA})
     try{
      if(avail==""){
        let res = await axios.get(`https://heliapi.onrender.com/data?_page=${page}&_limit=20&${queryParam}`);
        dispatch({type:GET_DATA,payload:res.data})
      }else{
        console.log(avail)
        let res = await axios.get(`https://heliapi.onrender.com/data?_page=${page}&_limit=20&available=${avail}&${queryParam}`);
        dispatch({type:GET_DATA,payload:res.data})
      }
     }catch(e){
        console.log(e)
     }
}

export const searchData = (text,page) => async(dispatch)=>{
   let res;
    try{
      res = await axios.get(`https://heliapi.onrender.com/data?_page=${page}&_limit=20`);
    }catch(e){
      console.log(e)
    }
    let filtered = res.data.filter(el=>el.first_name.toLowerCase().includes(text.toLowerCase()))
    dispatch({type:SEARCH_DATA,payload:filtered})
}

export const updateData = (newData) => (dispatch)=>{
    dispatch({type:UPDATE_DATA,payload:newData})
}
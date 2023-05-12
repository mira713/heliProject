import {GET_DATA,LOADING_DATA} from "./type";
import axios from 'axios';

export const getData = (page=1,select=[]) => async(dispatch)=>{
    dispatch({type:LOADING_DATA})
    let d=[];
   //  if(select.includes('Male')){
   //    console.log('bhk')
   // }
     try{
       if(select[0]){
         select.map(async(el)=>{
            if(el==="Male"||el=="Female"){
               let res = await axios.get(`https://heliapi.onrender.com/data?_page=${page}&_limit=20&gender=${el}`);
               dispatch({type:GET_DATA,payload:res.data})
            }else if(el=="Sales"||el=="Finance"|| el=="UI Designing"||el=="Management"||el=="IT"||el=="Marketing"||el=="Business Development"){
               let res = await axios.get(`https://heliapi.onrender.com/data?_page=${page}&_limit=20&domain=${el}`);
               dispatch({type:GET_DATA,payload:res.data})
            }else if(el=="true"||el=="false"){
               let res = await axios.get(`https://heliapi.onrender.com/data?_page=${page}&_limit=20&available=${el}`);
               dispatch({type:GET_DATA,payload:res.data})
            }
         })
        }else{
         let res = await axios.get(`https://heliapi.onrender.com/data?_page=${page}&_limit=20`);
         dispatch({type:GET_DATA,payload:res.data})
        }
     }catch(e){
        console.log(e)
     }
}
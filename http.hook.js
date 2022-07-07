import { useState , useCallback } from "react";


export const useHttp = ()=>{ 
   //these states are needed to understand whether the page is loaded or not
   const [load , setLoad] = useState(false);
   const [error , setError] = useState(false);
      //connect for your server 
      const request =  useCallback( async(url , method = 'GET' , body = null , headers = { 'Content-Type' : 'application/json'})=>{
         //load has been started
         setLoad(true)
         //check the connection
         try { 
            const responce = await fetch ( url , { method , body , headers});
            if (!responce.ok){ 
               throw new Error(`Could not fetch ${url} , status ${responce.status}`);
            }
            let data = await responce.json()
            //download finished
            setLoad(false)
            return data
         } //work with error
         catch(e){ 
            setLoad(false)
            setError(e.message)
            throw e;
         }
   } , [])

   const clearError = useCallback(()=> setError(null) , [])
   return { load , error , request , clearError }
}
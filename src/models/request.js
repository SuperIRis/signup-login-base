const request = {
  post(endpoint, data){
    return fetch(endpoint, data).then(res=>res.json()).catch((err)=>{
      if (process.env.NODE_ENV==='development'){ 
        console.error(err);
      }
    });
  }
}
export default request;

const jwt=require('jsonwebtoken')


const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    // const token = req.cookies['authToken'];
    // console.log(token)
  if(token){
    try {
      
        let oktoken= jwt.verify(token,"masai")
        if(oktoken){
            
            const currentDate = new Date();

            // Get the current date components
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            
            // Get the current time components
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            
            // Concatenate the date and time components
            const dateAndTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
            
            // Print the current date and time as numbers
           

            req.body.date=dateAndTime
            
            next()
        }
        
            
        
    
    } catch (error) {
        res.send({error:error.message})
    }
  }else{
    res.send({error:"pleas pass the token"})
  }



}

module.exports={
    auth
}
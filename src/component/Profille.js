import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./Profile.css";


export default function Profille({token}) {
 const [user, setUser] = useState('');
 const [name, setName] = useState("");
 const [img, setImg] = useState("");  

 useEffect( async () => {
   const respones = await axios.get("http://localhost:5000/user", {
     headers: {authorization: "Bearer " + token}
   });

   setUser(respones.data);
   
 }, [user])
// ^ حطينا اليوزر عشان تتحدث الصورة اللي يدخلها اليوزر بدون ما اسوي ريفريش

 const updetUser = ()=>{
   const result = axios.put("http://localhost:5000/updetUser",{
     name },
     {headers: {authorization: "Bearer " + token}});

     setName(result.data);
 }
 const updetImg = ()=>{
  const result = axios.put("http://localhost:5000/updetUser",{
     img },
    {headers: {authorization: "Bearer " + token}});

    setImg(result.data);
}
  const changeName = (e)=>{
    setName(e.target.value);

  }
   const changeImg = (e)=>{
     setImg(e.target.value)
   }
    return (
     <div className='profile-edit'>
    <h1 className='profile-Name'>{user.name}</h1>
    <img className='IMG' src={user.img}/> 
    <br/>
    <div className='inputeditp'>
    <input onChange={(e)=>{changeName(e)}} placeholder='name'  />
    </div>
    <div className='inputeditp'>
    <input onChange={(e)=>{changeImg(e)}} placeholder='img' />
    </div>
  
  
   <button className='butn' onClick={()=>{updetUser();updetImg();}}>submit</button>


     </div>
    )
}

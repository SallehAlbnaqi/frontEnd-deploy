import React, { useState} from "react";
import axios from "axios"
import { useHistory } from "react-router";
export default function SignUp() {
const [ name, setName] = useState("");
const [ email, setEmail] = useState("")
const [ password, setPassword] = useState("")
const history = useHistory();

const addUs = async ()=>{
    const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signUp`, {
        name, email, password
    });
    if ( result.status === 201){
        history.push("/logIn")
    }
};

 const changName = (e)=>{
    setName(e.target.value) 
 };

 const changEmail = (e)=>{
    setEmail(e.target.value)
 };

 const changPass = (e) =>{
    setPassword(e.target.value)
 }

  return <div>
 

  <div className="InputLog" >
    
    <input placeholder="Name" onChange={(e)=>{changName(e)}} />
    <input placeholder="Email" onChange={(e)=>{changEmail(e)}}/>
    <input placeholder="Password" onChange={(e)=>{changPass(e)}}/>
    <div>
<input class="w3-radio" type="radio" name="gender" value="male" checked/>
<label class="w3-white">Male</label>
<input class="w3-radio" type="radio" name="gender" value="female"/>
<label class="w3-white">Female</label>

</div>
      <button className="submit" onClick={()=>{addUs()}}>Sign Up</button>
      </div>
  </div>;
}

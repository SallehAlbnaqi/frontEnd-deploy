import React, { useState} from "react";
import axios from "axios"
import { useHistory } from "react-router";
export default function SignUp() {
const [ name, setName] = useState("");
const [ email, setEmail] = useState("")
const [ password, setPassword] = useState("")
const history = useHistory();

const addUs = async ()=>{
    const result = await axios.post("http://localhost:5000/signUp", {
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
 <div>
<input class="w3-radio" type="radio" name="gender" value="male" checked/>
<label class="w3-white">Male</label>
<input class="w3-radio" type="radio" name="gender" value="female"/>
<label class="w3-white">Female</label>

</div>

  <div className="InputLog" >
    
    <input placeholder="name" onChange={(e)=>{changName(e)}} />
    <input placeholder="email" onChange={(e)=>{changEmail(e)}}/>
    <input placeholder="pass" onChange={(e)=>{changPass(e)}}/>
    
      <button className="submit" onClick={()=>{addUs()}}>signUp</button>
      </div>
  </div>;
}

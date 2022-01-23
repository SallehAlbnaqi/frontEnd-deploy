import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./veget.css";

export default function VegetFood({ token }) {
  const [Veget, setVeget] = useState(null);
  const [comment, setComment] = useState([]);
  const [user, setUser] = useState([])
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(`http://localhost:5000/vegetFood/${id}`, {
     headers: { authorization: "Bearer " + token },

    });

    setVeget(response.data);
    console.log(response.data);
    const result = await axios.get("http://localhost:5000/user", {
      headers: {authorization: "Bearer " + token}
    });
 
    setUser(result.data);
  }, []);


  const goToVegetFood = (id) => {
    history.push(`/DietFood/${id}`);
    
  };



  const postCommentVeg = async ()=>{
    const resp = await axios.post(`http://localhost:5000/commentVeget/${id}`, 
      {comment: comment}, {headers: { authorization: "Bearer " + token}},
      // console.log(resp)
    )

    setVeget({...Veget, comment: resp.data.comment})
  };


  const inpComent = (e)=>{
    setComment(e.target.value);
  }

const deletCommentVeg = async (comment)=>{
  console.log(token , id);
 const ress = await axios.put(`http://localhost:5000/commentVegDel/${id}`, 
 {comment: comment}, {headers: {authorization: "Bearer " + token}},
 );
 console.log(ress)

 setVeget({...Veget, comment: ress.data.comment})
}



  
  return (
    <>
    
    {Veget ? <div className="vegetFoood">
      <h1 className="NameVeget" style={{ color: "white" }}>
        {Veget.name}
      </h1>
      <div className="nameVegetFood">
      <img 
        style={{ width: "300px", height: "300px", "border-radius": "8px" }}
        src={Veget.img}
      />
      <iframe src={Veget.video} className="imgveget" frameborder="0"></iframe>
      </div>
      <p className="discImg" style={{ color: "white" }}>
        {Veget.description}
      </p>

      <input onChange={(e) => {inpComent(e)}} placeholder="comment"/>
      <button onClick={() => {postCommentVeg()}}>add comment</button>
      

      {Veget && Veget.comment.map((element, index)=>{
        return (
          <div>
              <p style={{ color: "white" }}>
                {element.userName}
                <br/>
                {element.comment}
              </p>
              <br/>
              {element.userId == user._id? <button onClick={()=>{deletCommentVeg(element.comment)}}>remove</button>:""}
               {/* الحذف يطلع لليوزر اللي اضاف الكومنت , كل يوزر له حذف خاص به  */}
              
          </div>
        );
      })}
    </div>:""}
    </>
  );
}

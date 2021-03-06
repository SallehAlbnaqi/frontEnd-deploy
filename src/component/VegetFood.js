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
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vegetFood/${id}`, {
     headers: { authorization: "Bearer " + token },

    });

    setVeget(response.data);
    console.log(response.data);
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      headers: {authorization: "Bearer " + token}
    });
 
    setUser(result.data);
  }, []);


  const goToVegetFood = (id) => {
    history.push(`/DietFood/${id}`);
    
  };



  const postCommentVeg = async ()=>{
    const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/commentVeget/${id}`, 
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
 const ress = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/commentVegDel/${id}`, 
 {comment: comment}, {headers: {authorization: "Bearer " + token}},
 );
 console.log(ress)

 setVeget({...Veget, comment: ress.data.comment})
}



  
  return (
    <>
    
    {Veget ? <div className="vegetFoood">
      <h1 className="NameVeget" style={{ color: "#7a712e" }}>
        {Veget.name}
      </h1>
      <div className="nameVegetFood">
      <img 
        style={{ width: "300px", height: "300px", "border-radius": "8px" }}
        src={Veget.img}
      />
      <iframe src={Veget.video} className="col-3" frameborder="0"></iframe>
      </div>
      <p className="discImg" style={{ color: "#7a712e" }}>
        {Veget.description}
      </p>

      <input onChange={(e) => {inpComent(e)}} placeholder="comment"/>
      <button onClick={() => {postCommentVeg()}}>add comment</button>
      

      {Veget && Veget.comment.map((element, index)=>{
        return (
          <div>
              <p style={{ color: "#7a712e" }}>
                {element.userName}
                <br/>
                {element.comment}
              </p>
              <br/>
              {element.userId == user._id? <button onClick={()=>{deletCommentVeg(element.comment)}}>remove</button>:""}
               {/* ?????????? ???????? ???????????? ???????? ???????? ?????????????? , ???? ???????? ???? ?????? ?????? ????  */}
              
          </div>
        );
      })}
    </div>:""}
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./DietFood.css";

export default function DietFood({ token }) {
  const [Diet, setDiet] = useState(null);
  const [user, setuser] = useState([])
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  // ^ مررنا الايدي عشان اعرف الايدي تبع اليوزر
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(`http://localhost:5000/getDiet/${id}`, {
      headers: { authorization: "Bearer " + token },
    });

    setDiet(response.data);
    console.log(response.data, "data");
    const result = await axios.get("http://localhost:5000/user", {
      headers: {authorization: "Bearer " + token}
    });
 
    setuser(result.data);
  }, []);

  const goFodDiet = (id) => {
    history.push(`/DietFood/${id}`);
  };

  const postComment = async () => {
    const res = await axios.post(`http://localhost:5000/AddComment/${id}`,
      { comment: comment }, { headers: { authorization: "Bearer " + token } }
    );
    setDiet({ ...Diet, comment: res.data.comment });
    console.log(res);
  };

  const inpCom = (e) => {
    setComment(e.target.value);
  };


  const deletComDiet = async (comment)=>{
     const result = await axios.put(`http://localhost:5000/Comment/${id}`,
     {comment: comment}, {headers: {authorization: "Bearer " + token}},
     
     );
          
     setDiet({...Diet, comment: result.data.comment});
  }

  return (
    <div className="DietFoood">
      {Diet && (
        
        <>
          <h1 className="NameDiet" style={{ color: "#7a712e" }}>
            {Diet.name}
          </h1>
         
          <img className="col-6"
            style={{ width: "300px", height: "300px", "border-radius": "8px"  }}
            src={Diet.img}
          />
      <iframe src={Diet.video} className="col-3" frameborder="0"></iframe>
      
      <h2 className="NameDietFood" style={{ color: "#7a712e" }}>
        {Diet.description}
      </h2>
        </>
      )}

    
 

      <input onChange={(e) => {inpCom(e)}} placeholder="comment"/>
      <button onClick={() => {postComment()}}>add comment</button>
      
      {Diet && Diet.comment.map((element, index) => {
          console.log(element);
          return (
            <div>
              <p style={{ color: "white" }}>
                {element.userName}
                <br/>
                {element.comment}
              </p>
              {element.userId == user._id? <button onClick={()=>{deletComDiet(element.comment)}}>remove</button>:""}
            </div>
          );
        })}
    </div>
  );
}


// 
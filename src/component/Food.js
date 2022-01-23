import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import "./FoodDiabed.css"


export default function Food({token}) {
// const [FoodDiabetics, setFoodDiabetics] = useState (null);
const [FoodDiab, setFoodDiab] = useState(null);

const [user, setUser] = useState([])
const [comment, setComment] = useState([]);
const { id } = useParams();

console.log(useParams());

useEffect( async () => {
    console.log(token,"token");
    console.log(id ,id);
  const res = await axios.get(`http://localhost:5000/get-food/${id}`,{
      headers: {authorization: "Bearer " + token}
  });
  setFoodDiab(res.data);
  console.log(res.data);

  
    const result = await axios.get("http://localhost:5000/user", {
      headers: {authorization: "Bearer " + token}
    });
 
    setUser(result.data);
}, [])



const postCommen = async ()=>{
    const result = await axios.post(`http://localhost:5000/commentFodDibe/${id}`,
    { comment: comment }, { headers: {authorization: "Bearer " + token}
});

setFoodDiab({ ...FoodDiab, comment: result.data.comment });
console.log(result)
};

const inpComent = (e)=>{
    setComment(e.target.value);
}
 

const deletCommentFod = async (comment)=>{
  console.log(token, id);
  const resu = await axios.put(`http://localhost:5000/commentFodDibe/${id}`, 
  {comment: comment}, {headers: {authorization: "Bearer " + token}},
  );
  console.log(resu)

  setFoodDiab({...FoodDiab, comment: resu.data.comment})
  
}
    return (
        <>
        {FoodDiab  ? 
        <div className='FoodDiabed'>
        <h1 className='NameDiadbed' style={{color:"white"}}>{FoodDiab.name}</h1>
        <h1>{FoodDiab.data}</h1>
        <img  src={FoodDiab.img} style={{width: "300px" , height: "300px" , "border-radius": "8px",}}  />
        <iframe src={FoodDiab.video} className="imgFodDiab" frameborder="0"></iframe>
        <h1 className='discrFood' style={{color:"white"}}>{FoodDiab.description}</h1>
       
        <input onChange={(e) => {inpComent(e)}} placeholder="comment"/>
        <button onClick={() => {postCommen()}}>add comment</button>
        

      { FoodDiab && FoodDiab.comment.map((element, index) => {
          console.log(element);
          return (
            <div>
              <p style={{ color: "white" }}>
                {element.userName}
                <br/>
                {element.comment}
              </p>
              {element.userId == user._id? <button onClick={()=>{deletCommentFod(element.comment)}}>remove</button>:""}

            </div>
          );
        })}

    </div>:""}
        </>
    )
}


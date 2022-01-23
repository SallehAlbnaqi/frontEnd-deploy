import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Diet.css"
// import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardColumns } from "react-bootstrap";

export default function Diet({ token, admin }) {
  const [Diet, setDiet] = useState([]);
  const [user, setuser] = useState([]);
  // const {id} = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [comment, setComment] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    console.log("saleeh");
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Diet`, {
      headers: { authorization: "Bearer " + token },
    });

    setDiet(result.data);
    console.log(result.data);
    if (token) {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        headers: { authorization: "Bearer " + token },
      });
      setuser(response.data);
    }
  }, []);

  const goFodDiet = (id) => {
    history.push(`/DietFood/${id}`);
  };

  const changInN = (e) => {
    setName(e.target.value);
  };

  const changInDes = (e) => {
    setDescription(e.target.value);
  };

  const changImg = (e) => {
    setImg(e.target.value);
  };

  const changVid = (e) => {
    setVideo(e.target.value);
  };

  const addDiet = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/Diet`,
      {
        newName: name,
        newDescription: description,
        newImg: img,
        newVideo: video,
      },

      { headers: { authorization: "Bearer " + token } }
    );
    const copyDiet = [...Diet];
    copyDiet.push(response.data);
    setDiet(copyDiet);
    console.log(addDiet);
  };

  const delDiet = async (id, index) => {
    const delet = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Diet/${id}`, {
      headers: { authorization: "Bearer " + token },
    });

    const copyDiet = [...Diet];
    copyDiet.splice(index, 1);
    setDiet(copyDiet);
  };
  return (
    
    <div>
      {user.admin == true ? (
        <div>
          <input
            onChange={(e) => {
              changInN(e);
            }}
            placeholder="name"
          />
          
          <input
            onChange={(e) => {
              changInDes(e);
            }}
            placeholder="description"
          />
          
          <input
            onChange={(e) => {
              changImg(e);
            }}
            placeholder="img"
          />
          
          <input
            onChange={(e) => {
              changVid(e);
            }}
            placeholder="video"
          />
          
          <button
            onClick={() => {
              addDiet();
            }}
          >
            add
          </button>
          
        </div>
      ) : (
        ""
      )}
      <div className="dietRapperDiv">
       
        {Diet.map((element, index) => {
          return (
            <div className="DietChdiv">
              {/* <h2 className='h1' style={{color:"white"}}>{element.description}</h2> */}
              
           <img className='img' onClick={()=>{goFodDiet(element._id)}}src={element.img}/>
     
);
  

  
     {user.admin == true ? (
            <button className="btnDiet"
               onClick={() => {
                delDiet(element._id, index);
                 }}
                >
                  remove
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
        ;
      </div>
      
    </div>
  );
  
}
  
 

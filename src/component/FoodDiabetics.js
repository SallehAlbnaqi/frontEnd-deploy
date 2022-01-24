import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./FoodDib.css";
import Button from 'react-bootstrap/Button'


export default function FoodDiabetics({ token, admin }) {
  const [FoodDiab, setFoodDiab] = useState([]);
  const [user, setuser] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/FoDiab`, {
      headers: { authorization: "Bearer " + token },
    });
    setFoodDiab(response.data);
    if (token) {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        headers: { authorization: "Bearer " + token },
      });
      setuser(response.data);
    }
    //   console.log(response.data);
  }, [token]);

  const GoToFood = (id) => {
    history.push(`/Food/${id}`);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeDisc = (e) => {
    setDescription(e.target.value);
  };

  const changeImg = (e) => {
    setImg(e.target.value);
  };

  const changVidd = (e) => {
    setVideo(e.target.value);
  };

  const AddDiad = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/FoDiab`,
      {
        newName: name,
        newDescription: description,
        newImg: img,
        newVideo: video,
      },
      { headers: { authorization: "Bearer " + token } }
    );
    console.log(response.data,"saaleh")

    const copyed = [...FoodDiab];
    copyed.push(response.data);
    setFoodDiab(copyed);
    
  };

  const delDiad = async (id, index) => {
    const deletDi = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/FoDiab/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    const copyAr = [...FoodDiab];
    copyAr.splice(index, 1);
    setFoodDiab(copyAr);
  };
  return (
    <div>
      {user.admin == true ? 
        <div>
            <input
              onChange={(e) => {
                changeName(e);
              }}
              placeholder="name"
            />
          
            <input
              onChange={(e) => {
                changeDisc(e);
              }}
              placeholder="discription"
            />
          
            <input
              onChange={(e) => {
                changeImg(e);
              }}
              placeholder="img"
            />
          
          
            <input
              onChange={(e) => {
                changVidd(e);
              }}
              placeholder="video"
            />
            <button
              onClick={() => {
                AddDiad();
              }}
            >
              {" "}
              add food{" "}
            </button>
          </div>
        : ""}

<h1 style={{"text-align":"center","margin-top":"2%",marginBottom:"7%",color:"#7a712e"}}
            >Food Diabetics</h1>
      
      <div className="container">
        <div className="row"  >
      {FoodDiab.map((element, index) => {
        return (
          
          

      <div className="col-md-4" >
      <div className="card1" key={index}>
      <div className="overflow">

         <img src={element.img}  className="card1-img-top"style={{"width":"40rem",height:"250px"}} 
          onClick={() => { GoToFood(element._id)}}
                 src={element.img}
               />
              </div>
<ul className="list-group list-group-flush">
<li className="list-group-item" style={{fontSize: "21px",fontWeight: "300px", color:"#7a712e"}}
         >{element.name}</li>
         </ul>

            <br />
            <hr/>
            {user.admin == true ? (
              <Button variant="outline-secondary"

                onClick={() => {
                  delDiad(element._id, index);
                }}
              >
                remove
              </Button>
            ) : (
              ""
            )}
            
            </div>
            </div>
            
            
            
         
         
        
          
        );
        
        
      })}
      </div>
      </div>
      
    </div>
    
  );
  
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./VegetarianFoood.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'

export default function VegetarianFoood({ token, admin }) {
  const [Veget, setVeget] = useState([]);
  const [user, setuser] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/veget`, {
      headers: { authorization: "Bearer " + token },
    });
    setVeget(response.data);

    if (token) {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        headers: { authorization: "Bearer " + token },
      });
      setuser(response.data);
    }
    // console.log(response.data);
  }, []);

  const GoToVegetFood = (id) => {
    history.push(`/VegetFood/${id}`);
  };

  const changName = (e) => {
    setName(e.target.value);
  };

  const changDes = (e) => {
    setDescription(e.target.value);
  };

  const changImg = (e) => {
    setImg(e.target.value);
  };

  const changVideo = (e) => {
    setVideo(e.target.value);
  };

  const addVeget = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/veget`,
      {
        newName: name,
        newDescription: description,
        newImg: img,
        newVideo: video,
      },
      { headers: { authorization: "Bearer " + token } }
    );

    const copyAr = [...Veget];
    copyAr.push(response.data);
    setVeget(copyAr);
    console.log(copyAr);
  };

  const deleVeget = async (id, index) => {
    const delet = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/veget/${id}`, {
      headers: { authorization: "Bearer " + token },
    });

    const copyArray = [...Veget];
    copyArray.splice(index, 1);
    setVeget(copyArray);
    console.log(copyArray);
  };

  return (
    <div>
      {user.admin == true
        ?<div className="inputs">
            <input
              onChange={(e) => {
                changName(e);
              }}
              placeholder="name"
            />
  
            <input
              onChange={(e) => {
                changDes(e);
              }}
              placeholder="description"
            />
            <input
              onChange={(e) => {
                changVideo(e);
              }}
              placeholder="video"
            />
         
            <input
              onChange={(e) => {
                changImg(e);
              }}
              placeholder="img"
            />
          
            <button className="buttons"
              onClick={() => {
                addVeget();
              }}
            >
              add
            </button>
            </div>
          
        : ""}
        
          <h1 style={{"text-align":"center","margin-top":"2%",marginBottom:"7%",color:"#7a712e"}}
            >Vegetarian Food</h1>
            <div className="container">
          <div className="row">
      {Veget.map((element, index) => {

        return (
         
         
        
         
      <div className="col-md-4" >
      <div className="card1" key={index}>
      <div className="overflow">

            <img src={element.img} className="card1-img-top" style={{"width":"30rem",height:"250px"}} 
             
             onClick={() => {GoToVegetFood(element._id)}} src={element.img}/>
  
      <ul className="list-group list-group-flush">
      <li className="list-group-item" style={{fontSize: "21px",fontWeight: "300px", color:"#7a712e"}}>{element.name}</li>
      </ul>     
      </div>
      <br/>
  <hr/>
      
            {user.admin == true ? (
              <Button variant="outline-secondary"
                onClick={() => {
                  deleVeget(element._id, index);
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
      ;
      </div>
      </div>
    </div>
    
    
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./VegetarianFoood.css";

export default function VegetarianFoood({ token, admin }) {
  const [Veget, setVeget] = useState([]);
  const [user, setuser] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get("http://localhost:5000/veget", {
      headers: { authorization: "Bearer " + token },
    });
    setVeget(response.data);

    if (token) {
      const response = await axios.get("http://localhost:5000/user", {
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
      "http://localhost:5000/veget",
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
    const delet = await axios.delete(`http://localhost:5000/veget/${id}`, {
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
        <div className="vegetRapperDiv">
      {Veget.map((element, index) => {
        return (
          <div className="vietChdiv">
           <br/>
            {/* <h2 className='h1' style={{color:"white"}}>{element.description}</h2> */}
            <img className="vegetImg"
              onClick={() => {
                GoToVegetFood(element._id);
              }}
              style={{
                width: "300px",
                height: "300px",
                "border-radius": "8px",
              }}
              src={element.img}
            />
            <br />
            <h1 className="vegetH1" style={{ color: "white" }}>
              {element.name}
            </h1>
            {user.admin == true ? (
              <button
                onClick={() => {
                  deleVeget(element._id, index);
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

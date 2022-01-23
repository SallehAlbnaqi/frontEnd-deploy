import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

    const copyed = [...FoodDiab];
    copyed.push(response.data);
    setFoodDiab(copyed);
    console.log(AddDiad);
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

      {FoodDiab.map((element, index) => {
        return (
          <div>
            {/* <img  onClick={() => {
              GoToFood(element.id);
            }} src={element.url} />
            <h1>{element.name}</h1> */}
            <h1 className="h1" style={{ color: "white" }}>
              {element.name}
            </h1>
            {/* <h2 className='h1' style={{color:"white"}}>{element.description}</h2> */}
            <img
              className="imgFoodDIAB"
              onClick={() => {
                GoToFood(element._id);
              }}
              style={{
                width: "300px",
                height: "300px",
                "border-radius": "8px",
              }}
              src={element.img}
            />
            <br />
            {user.admin == true ? (
              <button
                onClick={() => {
                  delDiad(element._id, index);
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
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Diet.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
// import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";


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
    <>
    
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
    
<h1 style={{"text-align":"center","margin-top":"2%",marginBottom:"7%",color:"#7a712e"}}
>Diet Food Recipies</h1>

      <div className="container">
        <div className="row"  >
        
        {Diet.map((element , index)=>(
          
     <div className="col-md-4" >
      <div className="card1" key={index}>
      <div className="overflow">
      <img src={element.img}  className="card1-img-top" style={{"width":"40rem",height:"250px"}} 
                 
                onClick={() => {
                  goFodDiet(element._id);
                }}
                src={element.img}
              />
              
                
      </div>
      <ul className="list-group list-group-flush">
      <li className="list-group-item" style={{fontSize: "21px",fontWeight: "300px", color:"#7a712e"}}>{element.name}</li>
      </ul>
      
      <br/>
  <hr/>
          
            {user.admin == true ? (
                <Button  variant="outline-secondary"

                  onClick={() => {
                    delDiet(element._id, index);
                  }}
                >
                  remove
                </Button>
              ) : (
                ""
              )}
               
      
      </div>
     
      </div>
      
      
      
       ))}
       
       </div>
       </div>
       

       


       
       
       </>


    //           {user.admin == true ? (
    //             <button className="btnDiet"
    //               onClick={() => {
    //                 delDiet(element._id, index);
    //               }}
    //             >
    //               remove
    //             </button>
    //           ) : (
    //             ""
    //           )}
    //         </div>
    //       );
    //     })}
    //     ;
    //   </div>
      
    // </div>
  );
  
}


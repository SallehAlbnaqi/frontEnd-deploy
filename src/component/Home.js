import React,{useState,useEffect} from 'react'
import axios from 'axios'
// import { AiFillLike } from 'react-icons'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function Home({token}) {
    // مررنا التوكن ك بروبز عشان نستخدمة
 const [ food, setFood] = useState([]);
 const [ name , setName ] = useState("");
 const [ description, setDescription ] = useState("");
 const [ img, setImg ] = useState("");
// const [searchAr, setsearchAr] = useState("");
// useEffect( async() => {
//  const result = await axios.get("http://localhost:5000/Food",{
//   headers:{ authorization : "Bearer " + token},
//         });

//  console.log(result.data);
//   setFood(result.data);
//         // ^ باليوس افكت نستقبل البيانات من الباك اند
//   },[] )
  
// const changeName =(e)=>{
//  setName(e.target.value)
// }

//  const changeDisc = (e)=>{
//   setDescription(e.target.value)
// }

// const changeImg = (e)=>{
//   setImg(e.target.value)
//  }

// const addFood =async ()=>{
//  const respons = await axios.post("http://localhost:5000/Food",
//  {newName:name, newDescription:description, newImg:img },
//     {headers: { authorization: "Bearer "+ token}}
//       // ^ استخدمنا الهيدر والاثنتوكيشن عشان نعرف المستخدم اللي ضاف او حذف وهكذا

//  )
//  const copyArr = [...food]
//  copyArr.push(respons.data);
//   setFood (copyArr);
       
// }

// // const putFood = async (id,index)=>{
// //   const res = await axios.put(`http://localhost:5000/FoodUpb/${id}`, {

// //   })
// // }

// const deletFood = async(id,index)=>{
//  const deletFood = await axios.delete(`http://localhost:5000/Food/${id}`,{
//   headers:{authorization:"Bearer " + token},
//  });

// const copyArr = [...food];
// copyArr.splice(index,1);
//  setFood(copyArr);
        
//  }

  // const searchTarg = (e)=>{
  //   setsearchAr(e.target.value)
  // }
  // const searArr = ()=> {
  //  const search1 = food.filter((element) => {
  //  if (element.name.toLowerCase().includes(searchAr.toLocaleLowerCase)){
  //   return searchAr;
  // }

  // setFood(searArr)
  //  return searchAr;
  // });

    // setsearchAr(search1);
    // console.log(search1);

    // }


    return (
      
        <div>
            
 {/* <input className='inputAddFod' onChange={(e)=>{changeName(e)}} placeholder='name'/>
 <input className='inputAddFod'  onChange={(e)=>{changeDisc(e)}} placeholder='discription' />
 <input className='inputAddFod'  onChange={(e)=>{changeImg(e)}} placeholder='img' />
 <button className='butAddFod' onClick={()=>{addFood()}}> add food </button> */}
 {/* <button className='butSearch' onClick={()=>{searArr()}}>search</button>
  <input className='inputSearch' onChange={(e)=>{searchTarg(e)}}placeholder='search'/> */}
  
  
  <h1 className='title'>أهلا وسهلا بكم في موقع ( عرض الاطعمة )</h1>
  <p className='parag'>يُذكَر أنّ الطعام من الحاجات اليوميّة الطبيعية للإنسان، لذلك لا بدّ من تناوله يوميًا على شكل وجبات منتظمة أو غير ذلك، ويرغب كثير من الناس أحيانًا في تناول وجبات الطعام في مطعم ما،
   أو أي مكان خارج البيت، خصوصًا أن المطاعم تُقدّم خيارات متعددة ومختلفة تتيح اختيار أنواع الوجبات المفضلة، وتساعد في تغيير الروتين اليومي للطعام، مما يفتح الشهية لتناول كميات أكبر من الطعام وكسر حدّة الملل، ونظرًا لاختلاف الأذواق بين الناس،
    فإنّ لكل شخص مطعم مفضل يحب تناول الطعام فيه دومًا دون غيره, لذلك نسعى لتوفير جميع انواع الاطعمة التي تراعي الجوانب الصحية لكل فرد من المجتمع </p>
      {food.map((element, index)=>{
                
     return (  
                    
 <div className='Box'>
 <h1 > {element.name}</h1>
 <h2>{element.description}</h2>
 <img style={{width: "300px" , height: "300px" , "border-radius": "8px"}} src={element.img}/>
 {/* <button onClick={()=>{deletFood(element._id,index)}}>remove</button> */}
       {/* ^ عن طريق الماب قمنا بعرض الصور والبيانات بالصفحة */}

              
            
</div>

                
 )
  return (
  <AliceCarousel autoPlay autoPlayInterval="3000">
  <img src="../Images/Cake1.jpg" className="sliderimg" alt="Cake Photo" />
  <img src="../Images/Cake2.jpg"  className="sliderimg" alt="Cake Photo" />
  <img src="../Images/Cake9.jpg" className="sliderimg" alt="Cake Photo" />
  
</AliceCarousel>
)
 
    })
    };
    
     </div>
    )
    
    
}





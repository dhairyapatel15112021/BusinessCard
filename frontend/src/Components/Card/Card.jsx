import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { loginContext, updateContext } from '../../App';
export const Card = ({ card }) => {
  const {isLogin,setLogin} = useContext(loginContext);
  const {update, setUpdate} = useContext(updateContext);
  function updateCard(cardId){
      if(!isLogin){
        alert("Update Card feature only avalabile to admin!!");
      }
      else{
        setUpdate({isUpdate:true,id:cardId});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }
  return (
    <div style={style.card}>
      <div style={style.update} onClick={()=>updateCard(card._id)}><i className="fa-regular fa-pen-to-square"></i></div>
      <div style={style.name}>{card.name}</div>
      <div style={style.description}>{card.description}</div>
      <div style={style.number}>{card.phoneNumber}</div>
      <div style={style.address}>{card.address}</div>
      <div style={style.interest}>Interests</div>
      <div style={{ display: 'flex' }}>
        {
          card.hobbies.map((item) => {
            return <div style={{margin:'1%',textDecoration:'underline'}}>{item}</div>
          })
        }
      </div>
      <div style={{ display: 'flex' }}>
        {
          card.twitter &&  <Link style={style.link} to={card.twitter}><i className="fa-brands fa-x-twitter"></i></Link>
        }
        {
          card.instagram &&  <Link style={style.link} to={card.instagram}><i className="fa-brands fa-instagram"></i></Link>
        }
        {
          card.linkedin &&  <Link style={style.link} to={card.linkedin}> <i className="fa-brands fa-linkedin-in"></i></Link>
        }
      </div>
    </div>
  )
}

const style = {
    card : {
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', 
      borderRadius: '20px',
      width:'29%',
      margin:'1% 1%',
      padding:'1%',
      position:'relative' 
    },
    update : {
      position:'absolute',
      top:'7%',
      left:'93%'
    },
    name : { 
      fontWeight: 'bold',
      fontSize:'1.6vmax' 
    },
    description : {
      margin:'1% 0%'
    },
    number : {
      fontWeight:'bolder',
      margin:'0.5% 0%',
      color:'#000000'
    },
    address : {
      width:'90%',
      margin:'0.5% 0%'
    },
    interest : { 
      fontWeight: 'bold' 
    },
    link : {
      textDecorationLine:'none',
      color:'white',
      margin:'2% 0.5%',
      padding:'1.5%',
      border:'none',
      borderRadius:'7px',
      backgroundColor:'#4b7dcc'
    }
}
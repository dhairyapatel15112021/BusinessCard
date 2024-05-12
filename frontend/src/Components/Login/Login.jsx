import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../App';

export const Login = () => {
  const {isLogin,setLogin} = useContext(loginContext);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  function setValues(e){
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  async function submitForm(){
    try{
      console.log(formData);  
      const response = await fetch("http://localhost:4000/login/",{
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if(data.token){
        setLogin(true);
        localStorage.setItem("token",`Bearer ${data.token}`);
        navigate("/");
      }
      else{
        alert("Something Went! Not Logged In");
      }
    }
    catch(err){
      alert("Error While login");
    }
  }
  return (
    <form style={{ display: 'flex', flexDirection: 'column', width: '30%', justifyContent: 'center', alignItems: 'center', height: '70vh', marginLeft: '35%' }}>
      <input type="text" name="username" placeholder='Username' style={{ padding: '1%', margin: '1%',marginTop:'5%', width: '12vw',fontSize:'1.1vmax' }} onChange={(e)=>setValues(e)} />
      <input type="password" name="password" placeholder='Password' style={{ padding: '1%', margin: '1%',marginTop:'3%', width: '12vw',fontSize:'1.1vmax' }} onChange={(e)=>setValues(e)} />
      <div style={{ margin: '1% 6%', textAlign: 'center',marginTop:'3%',fontSize:'1.2vmax' }}>* All Fields are Mandatory</div>
      <button type="button" style={{ padding: '1% 3%', margin: '1%',marginTop:'3%',fontSize:'1.2vmax' }} onClick={submitForm}>Submit</button> 
    </form>
  )
}

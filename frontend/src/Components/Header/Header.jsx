import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { loginContext } from '../../App'

export const Header = () => {
    const { isLogin, setLogin } = useContext(loginContext);
    function logout(){
        localStorage.removeItem("token");
        setLogin(false);
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '10vh', width: '100vw' }}>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: '500', fontSize: '1.5vmax' }} >Home</NavLink>
            {
                isLogin ?
                    <div style={{ fontWeight: '500', fontSize: '1.5vmax', cursor: 'pointer',display:'flex',alignItems:'center',justifyContent:'center' }} onClick={logout}>
                        <div>Logout</div>
                        <div style={{border:'1px solid #000000', padding:'2%',borderRadius:'10px',marginLeft:'5%'}}>admin</div>
                    </div> :
                    <NavLink to="/login" style={{ textDecoration: 'none', color: 'black', fontWeight: '500', fontSize: '1.5vmax' }}>
                        Login
                    </NavLink>
            }

        </div>
    )
}

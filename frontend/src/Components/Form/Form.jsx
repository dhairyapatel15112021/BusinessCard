import React, { useState, useEffect, useContext } from 'react'
import { Card } from '../Card/Card';
import { updateContext } from '../../App';

export const Form = () => {
    const [formData, setFormData] = useState({});
    const [hobbies, setHobbies] = useState([]);
    const [cards, setCards] = useState([]);
    const {update, setUpdate} = useContext(updateContext);
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({ ...formData, hobbies }),
        headers: { 'Content-Type': 'application/json' }
    };
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/cards/");
            const data = await response.json();
            if (data.cardData) {
                setCards(data.cardData);
            }
            else {
                alert("Error While Fetching cards from database");
            }
        }
        catch (e) {
            alert(e);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    function setData(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    function setHobbieData(e) {
        const { value, checked } = e.target;
        if (checked) {
            setHobbies([...hobbies, value]);
        }
        else {
            setHobbies(hobbies.filter((item) => item !== value));
        }
    }
    async function updateCard(){
        try{
            const reponse = await fetch("http://localhost:4000/update/", {
                method: "POST",
                body: JSON.stringify({ ...formData, hobbies,id:update.id }),
                headers: { 'Content-Type': 'application/json',Authorization:localStorage.getItem("token")}
            });
            const data = await reponse.json();
            if (data.msg) {
                // setCards([...cards,{...formData,hobbies}]);
                setFormData({});
                setUpdate(false);
                fetchData();
                alert("congratulations!, Updated");
            }
            else {
                alert("Something Wrong With Backend, Not Updated");
            }
        }
        catch (e) {
            alert("Something Went Wrong");
        }
    }
    async function submitForm(event) {
        event.preventDefault();
        if(update.isUpdate){
            updateCard();
            return;
        }
        // debouncing for links : maybe using it also but we can not attend our moto, so did not implement it.
        try {
            const reponse = await fetch("http://localhost:4000/card/", requestOptions);
            const data = await reponse.json();
            if (data.msg) {
                setCards([...cards,{...formData,hobbies}]);
                setFormData({});
                alert("congratulations!, Card Is build, You can see below it");
            }
            else {
                alert("Something Wrong With Backend, Business Card is not build!");
            }
        }
        catch (e) {
            alert("Something Went Wrong");
        }
    }
    return (
        <div>
            <div style={{ margin: '1%', paddingTop: '2%', width: '90vw', fontSize: '2vmax' }}>Fill Below Form For <span style={{fontWeight:"bold"}}>{update.isUpdate ? "Update" : "New"}</span> Business Card</div>
            <form style={{ margin:'1%', display: 'flex', flexWrap: 'wrap',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '20px',width:'98vw' }}>
                <input type="text" name="name" placeholder='Name *' onChange={(e) => setData(e)} style={{ padding: '1%', margin: '1%', width: '12vw' }} />
                <input type="text" name="description" placeholder='Description *' onChange={(e) => setData(e)} style={{ padding: '1%', margin: '1%', width: '12vw' }} />
                <input type="text" name="phoneNumber" placeholder='Phone Number *' onChange={(e) => setData(e)} style={{ padding: '1%', margin: '1%', width: '12vw' }} />
                <input type="text" name="address" placeholder='Address *' onChange={(e) => setData(e)} style={{ padding: '1%', margin: '1%', width: '12vw' }} />
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '30vw' }}>
                    <input type="checkbox" name='music' value="music" onChange={(e) => setHobbieData(e)} />Music
                    <input type="checkbox" name='sports' value="sports" onChange={(e) => setHobbieData(e)} />Sports
                    <input type="checkbox" name='movies' value="movies" onChange={(e) => setHobbieData(e)} />Movies
                    <input type="checkbox" name='stockmarket' value="stock market" onChange={(e) => setHobbieData(e)} />Stock Market
                </div>
                <input type="text" name="twitter" placeholder='Twitter' onChange={(e) => setData(e)} style={{ padding: '1%', margin: '1%', width: '12vw' }} />
                <input type="text" name="linkedin" placeholder='linkedin' onChange={(e) => setData(e)} style={{ padding: '1%', margin: '1%', width: '12vw' }} />
                <input type="text" name="instagram" placeholder='instagram' onChange={(e) => setData(e)} style={{ padding: '1%', margin: '1%', width: '12vw' }} /><br />
                <input type="submit" value="Submit" style={{ padding: '1% 2%', margin: '1%', fontSize: '1.2vmax' }} onClick={submitForm} />
            </form>
            <div style={{ margin: '1%', paddingBottom: '2%' }}>* markes Fields are Mandatory</div>
            <div style={{display:'flex',flexWrap:'wrap'}}>
                {
                    cards && cards.map((item, index) => {
                        return <Card card={item} />
                    })
                }
            </div>
        </div>
    )
}

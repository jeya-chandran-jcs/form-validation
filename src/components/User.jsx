import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../Global'
import axios from 'axios'
export default function User() {
    const [data,setdata]=useState([])
    const navigate = useNavigate()

    const getUserData = async () => {
        try {
            const response = await axios.get(`${API}`);
            setdata(response.data); // Assuming response.data is the array you want to set
           
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    useEffect(()=>{
        getUserData()
    },[])

    const handleDelete=async(id)=>{
        try{
            await axios.delete(`${API}/${id}`)
            await  getUserData()
        }
        catch(err){
            console.log("deleting",err)
        }
    }
    return (
        <div className='container'>
            <header className='bg-dark text-light p-4 fs-3 font-weight-bold text-center'>
                Library Management System
            </header>
            <button className='btn btn-secondary mt-4 d-flex justify-content-center align-items-center mx-auto' onClick={() => navigate("/user/create")}>Create</button>
        {data.length===0 ? (<h1>sry no data is available .just click the create button to create it</h1>
        ):(
     <div className='row'>
         {data.map((item,index)=>(
           <div className='col-sm-4 col-md-6 col-lg-4 mt-2'>
           <div className='card  mt-2' key={index}>
                <div className='card-header' >
                    <h5 className='card-title text-center'>{item.title}</h5>
                    <div className='card-body'>
                        <h3 className='card-subtitle text-muted text-center'>Author</h3>
                        <h4 className='card-text'> Name : {item.authorname}</h4>
                        <h4 className='card-text'> Birthdate : {item.birthdate}</h4>
                        <p className='card-text'> Biography : {item.bio}</p>
                        <br />
                        <p><strong>ISBN : {item.isbn}</strong></p>
                        <h4>Published Date : {item.publish}</h4>
                    </div>
                </div>
                <div className='card-footer text-center'>
               <button className='btn btn-info' onClick={()=>navigate(`/user/edit/${item.id}`)}>edit</button>
               <button className='btn btn-danger mx-3' onClick={()=>handleDelete(item.id)}>delete</button>
                </div>                
            </div>
            </div>
    ))}
         
    </div>
         )}
</div>
    )
}

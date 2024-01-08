import React, { useState,useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { API } from '../Global'
import { useNavigate, useParams } from 'react-router-dom'


const formValidation=yup.object({
    title:yup.string().min(3,"too short title").max(15,"too long title").required("title is required"),
    authorname:yup.string().required("title is required"),
    birthdate:yup.date().required("birthdate is required"),
    bio:yup.string().min(20,"too short bio").max(50,"too long bio").required("biographhy is required"),
    isbn:yup.string().matches(/^[0-9-]+$/, 'Must be a number and hyphen example 978-0-306-40615-7').required("isbn is required"),
    publish:yup.date().required("publishing date is required")
    
})
export default function Create() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [selectedItem, setSelectedItem] = useState({
        title: "",
        authorname: "",
        birthdate: "",
        bio: "",
        isbn: "",
        publish: ""
    })
   
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${API}/${id}`);
                setSelectedItem(response.data);
                console.log(response.data)
            } catch (err) {
                console.log(err, "fetching error");
            }
        };
        fetchItem();
    }, [id]);  
              
    const formik=useFormik({
        enableReinitialize: true,
        initialValues: {
            title: selectedItem.title,
            authorname: selectedItem.authorname,
            birthdate: selectedItem.birthdate,
            bio: selectedItem.bio,
            isbn: selectedItem.isbn,
            publish: selectedItem.publish
        },
        validationSchema:formValidation,     
        onSubmit: async (values)=>{
            try{
                await axios.put(`${API}/${id}`,values,{
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    }
                })
                navigate("/user")
                }
                catch(err){
                    console.log("putting error",err)
                }
        }   
    })

    
    
    // const handleSubmit=async()=>{
    //     const userData={
    //         title:formik.values.title,
    //         authorname:formik.values.authorname,
    //         birthdate:formik.values.birthdate,
    //         bio:formik.values.bio,
    //         isbn:formik.values.isbn,
    //         publish:formik.values.publish
    //     }
    //     try{
    //     await axios.put(`${API}/${id}`,userData,{
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Accept":"application/json"
    //         }
    //     })
    //     navigate("/user")
    //     }
    //     catch(err){
    //         console.log("putting error",err)
    //     }
    // }
  return (
    <div className='container '>
        <form  onSubmit={formik.handleSubmit}>
            
            <div className='form-group mb-3'>
                <label htmlFor='title' className='form-label  fw-bold'>Title </label>
                <input type="text"  className='form-control' id="title" 
                 value={formik.values.title}  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} 
                   />
                   <div className='error-message'>{formik.touched.title && formik.errors.title ? formik.errors.title : ""}</div>
            </div>

            <div className='form-group mb-3'>
                <label htmlFor='authorname' className='form-label  fw-bold'>Author name :</label>
                <input type="text"  className='form-control' id="authorname" name="authorname"
                 value={formik.values.authorname} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter author name' 
                />
                <div>{formik.touched.authorname && formik.errors.authorname ? formik.errors.authorname : ""}</div>
            </div>
            
            <div className='form-group mb-3'>
                <label htmlFor='birthdate' className='form-label fw-bold'>Author Birth date :</label>
                <input type="date" className='form-control' id="birthdate" name="birthdate"
                 value={formik.values.birthdate} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Author birth date'
                />
                <div>{formik.touched.birthdate && formik.errors.birthdate ? formik.errors.birthdate : ""}</div>
            </div>

            <div className='form-group mb-3'>
                <label htmlFor='bio' className='form-label fw-bold'>Author's Bio :</label>
                <input type='text' className='form-control' id='bio' name="bio"
                 value={formik.values.bio} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter authors bio'
                />
                <div>{formik.touched.bio && formik.errors.bio ? formik.errors.bio : ""}</div>
            </div>

            <div className='form-group mb-3'>
                <label htmlFor='isbn' className='form-label fw-bold'>ISBN no :</label>
                <input type='text' className='form-control' id='isbn' name="isbn"
                value={formik.values.isbn} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter isbn number'
                />
                <div>{formik.touched.isbn && formik.errors.isbn ? formik.errors.isbn : ""}</div>
            </div>

            <div className='form-group mb-3'>
                <label htmlFor='publish' className='form-label fw-bold'>publication date :</label>
                <input type='date' className='form-control' id='publish' name="publish"
                 value={formik.values.publish} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter publication date'
                />
                <div>{formik.touched.publish && formik.errors.publish ? formik.errors.publish : ""}</div>
            </div>
            
            
            <button type="submit" className='btn btn-success moveleft'>Submit</button>
        </form>
    </div>
  )
}

import React from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
export default function Form() {

    const formValidation=yup.object({
        password:yup.string().min(8,"password too short").max(16,"password too long").
        required("password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,"invalid password"),
       
        email:yup.string().min(10,"password needs long").required("email is required")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"invalid email")
    })
    const formik=useFormik({
        initialValues:{email:"",password:""},
        validationSchema:formValidation,
        onSubmit:values=>{
            console.log(values)
        }
    })

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <label>email</label>
            <br/>
            <input type="email" id='email' name="email" placeholder='email' value={formik.values.email}
            onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <div>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</div>
            <br/>
            <label>passsword</label>
            <br/>
            <input type="password" id='password' name="password" placeholder='passsword' value={formik.values.password}
            onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
            <br />
            <button type="submit">submit</button>
        </form>
    </div>
  )
}

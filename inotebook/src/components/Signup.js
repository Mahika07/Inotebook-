import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const host = "https://inotebook-online.herokuapp.com/"
    const [cred, setCred] = useState({ name: "", email: " ", password: "" })
    let navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.sucess) {
            props.showAlert("Sing up sucessfully", "success")
            localStorage.setItem("token", json.token)
            navigate("/")
        }
        else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container my-3'>
                <form className='my-2' onSubmit={handlesubmit}>
                    <div className="mb-3 ">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={onchange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="email" onChange={onchange} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onchange} minLength={5} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup

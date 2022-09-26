import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const host = "https://inotebook-online.herokuapp.com"
    const [cred, setCred] = useState({ email: " ", password: "" })
    let navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/login`
        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })
        const json = await response.json()
        if (json.sucess) {
            props.showAlert("loged in sucessfully", "sucess")
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

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={cred.email} onChange={onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onchange} />
                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login

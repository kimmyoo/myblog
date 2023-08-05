import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"

import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"


const Login = () => {
  const [login] = useLoginMutation()


  const form = useForm()
  const { register, control, handleSubmit, formState } = form
  // form erros from formState which is from useForm hook
  const { errors } = formState


  // const userRef = useRef()
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

  //async 
  const onSubmit = async (formData) => {
    // e.preventDefault()
    console.log(formData)
    const { email, password } = formData
    try {
      // console.log(email, password)
      const { accessToken } = await login({ email, password }).unwrap()
      // dispatch an action to update state
      dispatch(setCredentials({ accessToken: accessToken }))
      // setEmail('')
      // setPassword('')
      navigate('/profile-dash')
    } catch (err) {
      // a couple of scenarios
      if (!err.status) {
        setErrMsg('No Server Response: network failure or server is down')
      } else if (err.status === 400) {
        setErrMsg('missing email or password.')
      } else if (err.status === 401) {
        setErrMsg(err.data?.message)
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  // if (isLoading) return <p>loading...</p>

  const content = (
    <div className="login-form-wrapper">
      <header><h3>LOG IN</h3></header>
      <main>
        {/* add noValidate for react-hook-form to validate form */}
        <form onSubmit={(handleSubmit(onSubmit))} noValidate>
          {/* htmlFor  consistent with id of input */}
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required"
                },
                pattern: {
                  value: emailRegex,
                  message: "Invalid email address"
                },
                validate: {
                  noHotmail: (fieldValue) => {
                    return !fieldValue.endsWith("hotmail.com") || "Losers use hotmail."
                  },
                  noQQmail: (fieldValue) => {
                    return !fieldValue.endsWith("qq.com") || "qq mail sucks."
                  }
                }
              })}
            />
          </p>
          {/* must use optional chaining on errors.properties? */}
          <p className="errMsg">{errors.email?.message}</p>


          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required"
              })}
            />
          </p>
          <p className="errMsg">{errors.password?.message}</p>
          {/* no need to specify type = "submit" */}
          <button>Sign In</button>
          {/* err message displayed here */}
          <p className="errMsg" ref={errRef} aria-live="assertive"> {errMsg} </p>
        </form>

        <DevTool control={control} />
      </main>
    </div>
  )

  return (
    content
  )
}

export default Login
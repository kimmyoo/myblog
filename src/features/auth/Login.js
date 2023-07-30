import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"


const Login = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login] = useLoginMutation()

  // put email field to focus after component mounts
  useEffect(() => {
    userRef.current.focus()
  }, [])

  // if the user start to type email or pass
  // clear error message
  useEffect(() => {
    setErrMsg('')
  }, [email, password])


  const handleUserInput = (e) => {
    setEmail(e.target.value)
  }

  const handlePwdChange = (e) => {
    setPassword(e.target.value)
  }


  //async 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(email, password)
      const { accessToken } = await login({ email, password }).unwrap()
      // dispatch an action to update state
      dispatch(setCredentials({ accessToken: accessToken }))
      setEmail('')
      setPassword('')
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

        <form onSubmit={handleSubmit}>
          {/* htmlFor  consistent with id of input */}
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />
          </p>


          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handlePwdChange}
              value={password}
              required
            />
          </p>
          {/* no need to specify type = "submit" */}
          <button>Sign In</button>
          {/* err message displayed here */}
          <p className="errMsg" ref={errRef} aria-live="assertive"> {errMsg} </p>
        </form>
      </main>
    </div>
  )

  return (
    content
  )
}

export default Login
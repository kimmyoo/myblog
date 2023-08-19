import { Outlet, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"


const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)

    const effectRan = useRef(false)
    const [loginSuccess, setLoginSuccess] = useState(false)

    const [refresh, {
        // uninitialized: the refresh function has not been used
        // isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {
        // react 18 strict mode
        if (effectRan.current === false || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                // console.log("verifying refresh token in PersistLogin component")
                try {
                    console.log("tried")
                    await refresh()
                    setLoginSuccess(true)
                } catch (err) {
                    console.log(err)
                }
            }
            // console.log(token, loginSuccess, isSuccess)

            if (token) setLoginSuccess(true)
            verifyRefreshToken()
            // if token exists, no need to get refresh token; 
            // go ahead a render children component
            // !token ? verifyRefreshToken() : setLoginSuccess(true)

        }
        return () => {
            effectRan.current = true
        }
    }, [refresh, token, loginSuccess])

    // useEffect(() => {
    //     // react 18 strict mode 
    //     if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
    //         const verifyRefreshToken = async () => {
    //             // console.log("verifying refresh token in PersistLogin component")
    //             try {
    //                 await refresh()
    //                 setLoginSuccess(true)
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         }

    //         console.log(token)
    //         if (!token && persist) verifyRefreshToken()
    //     }

    //     return () => effectRan.current = true
    //     // disable warning for dependency
    //     //eslint-disable-next-line
    // }, [])


    let content
    if (!persist) {
        // console.log('no persist')
        content = <Outlet />
    } else if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        console.log('error')
        content = <p
            className="errMsg">{`${error?.data?.message} - `}
            <Link to="/login">Please Login</Link>
        </p>
    } else if (isSuccess && loginSuccess) {
        // console.log('persist')
        content = <Outlet />
    }

    return content
}

export default PersistLogin
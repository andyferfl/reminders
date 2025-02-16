import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext('default')

export default AuthContext

function AuthProvider ({children}) {


    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens')? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let signupUser = async (user) => {
    
        if (user.password !== user.password2){
            alert('Passwords don\'t match')
            return
        }

        let response = await fetch('https://andyferfl.duckdns.org/api/auth/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"username":user.username, "full_name":user.full_name, "password":user.password, "password2":user.password2})
        })
    
        let data = await response.json()

        if(response.ok){
            navigate('/login')
        }else{
            return response
        }
        return
    }

    let loginUser = async (user) => {
    
        let response = await fetch('https://andyferfl.duckdns.org/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"username":user.username, "password":user.password})
        })
    
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else{
            alert('Something went wrong!')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async ()=>{
        console.log('oops')
        let response = await fetch('https://andyferfl.duckdns.org/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"refresh":authTokens?.refresh})
        })
    
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false);
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser,
    }

    useEffect(()=>{

        if(loading && authTokens){
            updateToken();
        }

        let refreshInterval = 1000 * 6 * 20
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        },refreshInterval)
        return ()=> clearInterval(interval)
    },[authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )

}

export {AuthProvider}
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, settoken] = useState(localStorage.getItem("token"))
    const [user,setuser] = useState("")

    const storeToken = (servertoken) => {
        settoken(servertoken)
        return localStorage.setItem("token", servertoken)
    }

    let isloggedin = !!token;

    const logoutuser = () => {
        settoken("")
        return localStorage.removeItem("token")
    }
    
    useEffect(()=>{
        userAuthentication();
    },[])

    const userAuthentication=async()=>{
        try{
            const response= await fetch('http://localhost:8000/app/v1/user',
                {method:"GET",
                headers:{ Authorization:`Bearer ${token}`}
                }
            );
            if(response.status==200){
                const data=await response.json()
                //console.log(data);
                setuser(data)
            }
        }catch(err){
        console.log(err);
    }
}

    return (<AuthContext.Provider value={{token, storeToken, logoutuser, isloggedin,user,setuser }} >
        {children}
    </AuthContext.Provider>)
}


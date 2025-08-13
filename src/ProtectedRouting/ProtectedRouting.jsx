import { Navigate } from "react-router-dom"

export function ProtectedRouting(props){
    if(localStorage.getItem("token")){
        return props.children
    }else{
        return <Navigate to="/login" />
    }
}
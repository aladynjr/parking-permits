import React,{useEffect} from 'react'
import Join from '../components/join'
import Login from '../components/login'
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function LoginPage() {

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      navigate("/Home");
    } else {
      navigate("/");

    }
  }, [])

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      navigate("/Home");
    }

  });

  return (
    <div>LoginPage

<Join />
   <Login /> 
    </div>
  )
}

export default LoginPage
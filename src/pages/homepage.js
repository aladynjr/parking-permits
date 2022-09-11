import React, {useState, useEffect} from 'react'
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import GetStudentData from '../utilities/getstudentdata'
function HomePage() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    localStorage.removeItem('isLogged');
    navigate("/")

  };


  const [studentID, setStudentID] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setStudentID(currentUser.uid)
    }
  });

console.log({studentID})
  const [studentData, setStudentData] = useState(null)

  const FetchStudentData = async () => {
    try {
    const response = await fetch(`http://localhost:8080/api/student/${studentID}`);
    const jsonData = await response.json();

      setStudentData(jsonData);

    } catch (err) {
      console.error(err.message);
  }
  }

  useEffect(()=>{
    if(!studentID) return;
    FetchStudentData()
  },[studentID])

console.log(studentData)

  return (
    <div>Home Page
<p>
{studentData?.student_name}

</p>
<p>
{ studentData?.student_email}

</p>


<Button variant="contained" color="error" style={{position:'absolute', bottom:'10px', right:'30px'}} onClick={() => { logout() }} >logout</Button>



    </div>
  )
}

export default HomePage
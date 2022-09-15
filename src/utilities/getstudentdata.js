import React, { useEffect, useState } from 'react'
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

function GetStudentData() {


  const [studentID, setStudentID] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setStudentID(currentUser.uid)
    }
  });

console.log({studentID})
  const [studentData, setStudentData] = useState({})

  const FetchStudentData = async () => {
    if(!studentID) return;
    try {
      const response = await fetch(process.env.REACT_APP_HOST+`/api/student/${studentID}`);
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


return studentData



}

export default GetStudentData
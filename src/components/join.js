import React, { useState } from 'react'
import { auth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,

} from "firebase/auth";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';


import { SiFastapi } from 'react-icons/si'

import { AiOutlineUserAdd } from 'react-icons/ai'
import { Divider } from '@mui/material';

function Join({ setJoinModal }) {
  const navigate = useNavigate();

  const [logging, setLogging] = useState(false)
  const [signupError, setSignupError] = useState('')
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')


  const AddNewUser = async (
    student_uid,
    student_email,
    student_name,
    student_grade,
    student_state,
    student_school) => {

    try {
      const body = {
        student_uid,
        student_email,
        student_name,
        student_grade,
        student_state,
        student_school
      };
      const response = await fetch(process.env.REACT_APP_HOST+"/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
     window.location.reload(false);

  };

  const [joinLoading, setJoinLoading] = useState(false);

  const register = async () => {
    setJoinLoading(true);
    try {
      setLogging(true);
      const newUser = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPassword
      );
      console.log(newUser.user.uid);


      AddNewUser(newUser.user.uid,newEmail,newName  )

    } catch (error) {
      if (error.message == 'Firebase: Error (auth/invalid-email).') { setSignupError('???????????? ?????????? ?????????? ??????????????'); }
      if (error.message == 'Firebase: Error (auth/email-already-in-use).') { setSignupError('?????????????? ???????????? ???? ???????? ??????'); }
      if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') { setSignupError('???????? ?????????? ?????? ???? ???????? ???????? ???? 6 ????????'); }

      setLogging(false);
      console.log(error.message);


    }
    setJoinLoading(false);
  };

  function MakeID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  return (
    <div className='joinform'>
      <h1>Create An Account</h1>
      <LoadingButton variant="contained" style={{ background: 'dodgerblue' }} onClick={() => { setNewEmail(MakeID(10) + '@gmail.com'); setNewPassword(MakeID(8)); setNewName(MakeID(10)); }} loading={joinLoading} loadingPosition="end" endIcon={<SiFastapi />} >One Click Fake Data</LoadingButton>
      <p style={{ marginTop: '-10px', fontSize: '13px', opacity: '0.8' }} >if you just want to test the website</p>

      <TextField variant="outlined" label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />

      <TextField variant="outlined" label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <TextField variant="outlined" type="password" label="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

      <LoadingButton variant="contained" color="success" onClick={register} loading={joinLoading} loadingPosition="end" endIcon={<AiOutlineUserAdd />} >Create Account</LoadingButton>


      {/* <Button variant="outlined" style={{fontSize:'10px', color:'black', border:'none', marginTop:'20px'}}  onClick={()=>{setJoinModal(false)}} >Close</Button> */}

    </div>
  )
}

export default Join
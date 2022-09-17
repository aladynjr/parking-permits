import React, { useState, useEffect } from 'react'
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import GetStudentData from '../utilities/getstudentdata'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';

import { Divider } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import AddRegistration from '../components/addregistration';
import RegistrationsList from '../components/registrationslist';
function HomePage() {
  const navigate = useNavigate();

  



  const [registrations, setRegistrations] = useState(null);

  return (
    <div >


<h1 style={{marginBottom:'50px'}}>Digital Parking Permit Registration Scheduler</h1>


 <AddRegistration  setRegistrations={setRegistrations} /> 

<Divider style={{width:'70%', margin:'auto', marginBlock:'60px'}} />
<RegistrationsList registrations={registrations} setRegistrations={setRegistrations} />


    </div>
  )
}

export default HomePage
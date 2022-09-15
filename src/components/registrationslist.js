import React,{useEffect} from 'react'
import FetchRegistrations from '../utilities/fetchregistrations'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {FaDotCircle} from 'react-icons/fa'

function RegistrationsList({registrations, setRegistrations}) {

useEffect(()=>{
FetchRegistrations(setRegistrations)
},[])
console.log(registrations)
  return (
    <div>
        
       <h2> Scheduled Registrations</h2>



{registrations && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Apartment number</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Duration</TableCell>
            <TableCell align="center">Active Days</TableCell>
            <TableCell align="center">Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...registrations].reverse().map((registration) => (
            <TableRow
              key={registration.registration_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                
              <TableCell component="th" scope="row" align="center">{registration.registration_id}</TableCell>
              <TableCell align="center"> <FaDotCircle style={{color : registration.registration_status ? 'limegreen' : 'red', fontSize:'25px' }} /> </TableCell>
              <TableCell align="center">{registration.registration_apartment_number}</TableCell>
              <TableCell align="center">{registration.registration_start_date}</TableCell>
              <TableCell align="center">{registration.registration_hours_until_cancel} Hours</TableCell>
              <TableCell align="center">{registration?.registration_active_days?.map((day)=>{
                return (
                    <b style={{fontSize:'10px'}}> {day?.substring(0, 2)}. </b>
                )
              })}</TableCell>
              <TableCell align="center">{new Date(registration.registration_timestamp).toLocaleString()}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>
  )
}

export default RegistrationsList
import React, { useEffect } from 'react'
import FetchRegistrations from '../utilities/fetchregistrations'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FaDotCircle } from 'react-icons/fa'

import clsx from 'clsx';

function RegistrationsList({ registrations, setRegistrations }) {

  useEffect(() => {
    FetchRegistrations(setRegistrations)
  }, [])
  console.log(registrations)



  return (
    <div>

      <h2> Scheduled Registrations</h2>
      <div style={{ display: 'flex', alignregistrations: 'flex-start', flexDirection: 'column', margin: '0 auto', width: 'fit-content', alignItems: 'flex-start', marginBlock:'27px' }} >
        <div style={{ marginBlock:'7px' }}  ><FaDotCircle style={{ color: 'limegreen' }} /> : Registration is Active </div>
        <div style={{ marginBlock:'7px' }}  ><FaDotCircle style={{ color: 'cornflowerblue' }} /> : Registration is Ready for Submission</div>
        <div style={{ marginBlock:'7px' }}  > <FaDotCircle style={{ color: 'darkgrey' }} /> : Registration is Not Active  </div> 
         </div>



      {registrations && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Apartment number</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>

              <TableCell align="center">Duration</TableCell>
              <TableCell align="center">Active Days</TableCell>
              {/* <TableCell align="center">Created at</TableCell> */}
              <TableCell align="center">ERROR</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {[...registrations].reverse().map((registration) => {
              var sameHour = Number(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true }).substring(0, 2)) == Number(registration?.registration_start_time.split(':')[0]);
              var sameMinute = (Number(registration?.registration_start_time.split(':')[1].substring(0, 2)) >= Number(String(new Date().getMinutes()).padStart(2, '0')) - 10) && (Number(registration?.registration_start_time.split(':')[1].substring(0, 2)) <= Number(String(new Date().getMinutes()).padStart(2, '0')) + 10);
              var sameAMPM = registration?.registration_start_time.substring(registration?.registration_start_time?.length - 2, registration?.registration_start_time?.length) == (new Date().getHours() >= 12 ? 'PM' : 'AM');
              var isActiveDay = registration?.registration_active_days?.includes(new Date().toLocaleString('en-us', { weekday: 'long' }))
              var startingDayPassed = new Date(registration?.registration_start_date + ' ' + new Date().getFullYear()).toDateString() <= new Date().toDateString();

              var eligible = isActiveDay && sameHour && sameMinute && sameAMPM && startingDayPassed;
              if (eligible) {
                console.log('eligible for registration,  id :', registration?.registration_id);
              } else {
                console.log('not eligible for registration, because of : ', ((!isActiveDay) ? ' not same day ' : ''), ((!sameHour) ? ' not same hour ' : ''), ((!sameMinute) ? 'not same minute' : ''), ((!sameAMPM) ? 'not same AM or PM  ' : ''), ((!startingDayPassed) ? 'start date is not reached '+ new Date(registration?.registration_start_date + ' ' + new Date().getFullYear()).toLocaleString() : ''), ', id : ', registration?.registration_id);
              
              }
              //get start date and time in date format 
              var startDate = new Date(new Date().toDateString() + ' ' + new Date().getFullYear() + ' ' + registration?.registration_start_time);
              var endDate = new Date(startDate.getTime() + (Number(registration?.registration_hours_until_cancel) * 60 * 60 * 1000));
            
          console.log({endDate})
          console.log({startDate})

             
             
              return (
                <TableRow
                  key={registration.registration_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell component="th" scope="row" align="center">{registration.registration_id}</TableCell>
                  <TableCell align="center"> <FaDotCircle className={clsx(eligible && 'animate__animated animate__pulse')} style={{ color: registration.registration_status ? 'limegreen' : 'darkgrey', fontSize: '25px' }} /> </TableCell>
                  <TableCell align="center">{registration.registration_apartment_number}</TableCell>
                  <TableCell align="center">{registration.registration_start_date}</TableCell>
                  <TableCell align="center">{registration.registration_start_time}</TableCell>
                  <TableCell align="center">{endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</TableCell>

                  <TableCell align="center">{registration.registration_hours_until_cancel} Hours</TableCell>
                  <TableCell align="center">{registration?.registration_active_days?.map((day) => {
                    return (
                      <b style={{ fontSize: '10px' }}> {day?.substring(0, 2)}. </b>
                    )
                  })}</TableCell>
                  {/* <TableCell align="center">{new Date(registration.registration_timestamp).toLocaleString()}</TableCell> */}
                  <TableCell align="center" style={{maxWidth:'200px'}} >{registration.registration_error && <p style={{color:'red'}} >{'Registration : ' + registration.registration_error} </p>} {registration.registration_cancel_error && <p style={{color:'darkred'}}> {'Cancellation : ' + registration.registration_cancel_error}</p>}</TableCell>


                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  )
}

export default RegistrationsList
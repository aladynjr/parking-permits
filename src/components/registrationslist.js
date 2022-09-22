import React, { useEffect, useState } from 'react'
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

import ReactTimeAgo from 'react-time-ago'

import { FaRobot } from 'react-icons/fa'

import { AiFillDelete } from 'react-icons/ai'

import LoadingButton from '@mui/lab/LoadingButton';

function RegistrationsList({ registrations, setRegistrations }) {


  useEffect(() => {
    FetchRegistrations(setRegistrations)
  }, [])



  var botTimeAgo = registrations?.filter((registration) => { return registration?.registration_id == '1' })
  var botTimeAgoClean;
  if (registrations) {
    botTimeAgoClean = new Date((Number(botTimeAgo[0]?.registration_contact_phone)));
  }

  //turn activeTime to a date object without it showing invalid date



  const [deleteRegistrationLoading, setDeleteRegistrationLoading] = useState(false)

  const DeleteRegistration = async id => {
    setDeleteRegistrationLoading(true)
    try {
      const deleteRegistration = await fetch(process.env.REACT_APP_HOST + `/api/registration/${id}`, {
        method: "DELETE"
      });

      setRegistrations(registrations.filter(registration => registration.registration_id !== id));
      setDeleteRegistrationLoading(false)
    } catch (err) {
      console.error(err.message);
      setDeleteRegistrationLoading(false)
    }
  };


  return (
    <div>

      <h2> Scheduled Registrations</h2>
      <div style={{ display: 'flex', alignregistrations: 'flex-start', flexDirection: 'column', margin: '0 auto', width: 'fit-content', alignItems: 'flex-start', marginBlock: '27px' }} >
        <div style={{ marginBlock: '7px' }}  ><FaDotCircle style={{ color: 'limegreen' }} /> : Registration is Active </div>
        <div style={{ marginBlock: '7px' }}  ><FaDotCircle style={{ color: 'cornflowerblue' }} /> : Registration is Ready for Submission</div>
        <div style={{ marginBlock: '7px' }}  ><FaDotCircle style={{ color: 'red' }} /> : Registration is Ready for Cancellation</div>

        <div style={{ marginBlock: '7px' }}  > <FaDotCircle style={{ color: 'darkgrey' }} /> : Registration is Not Active  </div>
      </div>

      {registrations && <b style={{ opacity: '0.9' }}> PST time zone : {new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} <FaRobot className='colorchangeanimation' style={{ padding: '0px 6px' }} />   last bot activity : <ReactTimeAgo date={botTimeAgoClean} locale="en-US" /> </b>}

      {registrations && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Apartment number</TableCell>
              <TableCell align="center">Plate</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>

              <TableCell align="center">Duration</TableCell>
              <TableCell align="center">Active Days</TableCell>
              <TableCell align="center">RECORD</TableCell>

              {/* <TableCell align="center">Created at</TableCell> */}
              <TableCell align="center">ERROR</TableCell>
              <TableCell align="center">Delete</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {[...registrations].reverse().map((registration, i) => {
              var startDate = new Date(registration.registration_start_date + ' ' + registration.registration_start_time);
              startDate.setHours(0, 0, 0, 0)
              var startTime = new Date(registration.registration_start_date + ' ' + registration.registration_start_time)//.toLocaleTimeString('en-US', {timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false })

              var endTime = new Date(startTime.getTime() + (Number(registration.registration_hours_until_cancel) * 60 * 60 * 1000));

              var cancelTimePassed = new Date().setMonth(4, 4, 4) > endTime.setMonth(4, 4, 4)

              if (registration.registration_state == 'notregistered') {
                var minuteTolerance = 10;
                var isSameHour = Number(new Date().toLocaleString('en-US', { timeZone: "America/Los_Angeles", hour: 'numeric', hour12: false }).substring(0, 2)) == Number(registration?.registration_start_time.split(':')[0]);

                var isSameMinute =  (Number(registration.registration_start_time.split(':')[1].substring(0, 2)) <= Number(String(new Date().getMinutes()).padStart(2, '0')) + minuteTolerance) && (Number(registration.registration_start_time.split(':')[1].substring(0, 2)) >= Number(String(new Date().getMinutes()).padStart(2, '0')) - minuteTolerance);
                var isActiveDay = registration?.registration_active_days?.includes(new Date().toLocaleString('en-us', { timeZone: "America/Los_Angeles", weekday: 'long' }))

                var isStartingDayPassed = startDate <= new Date().setHours(0, 0, 0, 0);

                var eligible = isActiveDay && isSameHour && isSameMinute && isStartingDayPassed// && sameAMPM ;


                if (!eligible) {

                  console.log(`
                `)
                  console.log('---------- FALSE STATUS, ID : ', registration.registration_id, ' --------------')

                  console.log('not eligible for registration, because of : ',
                    ((!isActiveDay) ? '- not an active day -' : ''),
                    ((!isSameHour) ? ('- not same hour -') : ''),
                    ((!isSameMinute) ? '- not same minute -' : ''),
                    ((!isStartingDayPassed) ? '- start date is not reached -' : ''));
                } else {
                  console.log(`
                `)
                  console.log('---------- FALSE STATUS, ID : ', registration.registration_id, ' --------------')
                  console.log('eligible for registration')
                }
                //get start date and time in date format 

                console.log('♠ Registration Hour : ' + Number(registration.registration_start_time.split(':')[0]) + ' Current : ' + Number(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: "America/Los_Angeles" }).substring(0, 2)))
                console.log('♠ Registration Minute : ' + Number(registration.registration_start_time.split(':')[1].substring(0, 2)) + ' Current : ' + Number(String(new Date().getMinutes()).padStart(2, '0')))
                console.log('♠ Registration Start Date : ' + startDate.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" }) + ' Current ' + new Date().toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" }))
                console.log('♠ Registration Start Time : ' + startTime.toLocaleTimeString('en-US', { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false }))
                console.log('♠ Registration End Time : ' + endTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false }) + ' Current : ' + new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false }))

                console.log('♠ Registration Active Days : ' + registration.registration_active_days)

                console.log('♠ Cancel Time Passed : ' + cancelTimePassed)

                console.log(`
                                  `)

              } else {
                console.log(`
                `)

                console.log('---------- TRUE STATUS, ID : ', registration.registration_id, '  --------------')

                console.log('registration already done, id : ', registration.registration_id)
                console.log('♠ Cancel Time Passed : ' + cancelTimePassed)
                console.log('♠ Registration Start Time : ' + startTime.toLocaleTimeString('en-US', { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false }))
                console.log('♠ Registration End Time : ' + endTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false }) + ' Current : ' + new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false }))

              }
              return (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell component="th" scope="row" align="center">{registration.registration_id}</TableCell>
                  <TableCell align="center"> <FaDotCircle className={clsx((eligible && registration.registration_state == 'notregistered') && 'animate__animated animate__pulse', (registration.registration_state == 'registered') && 'greencolor', (registration.registration_state == 'notregistered') && 'greycolor', ((registration.registration_state == 'registered') && cancelTimePassed) && 'redcolor')} style={{ fontSize: '25px' }} /> </TableCell>
                  <TableCell align="center">{registration.registration_apartment_number}</TableCell>
                  <TableCell align="center">{registration.registration_licence_plate}</TableCell>

                  <TableCell align="center">{registration.registration_start_date}</TableCell>
                  <TableCell align="center">{registration.registration_start_time}</TableCell>
                  <TableCell align="center">{endTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric', hour12: false })}</TableCell>

                  <TableCell align="center">{registration.registration_hours_until_cancel} Hours</TableCell>
                  <TableCell align="center">{registration?.registration_active_days?.map((day, i) => {
                    return (
                      <b key={i} style={{ fontSize: '10px' }}> {day?.substring(0, 2)}. </b>
                    )
                  })}</TableCell>
                  {/* <TableCell align="center">{new Date(registration.registration_timestamp).toLocaleString()}</TableCell> */}
                  <TableCell align="center">{registration.registration_record}</TableCell>

                  <TableCell align="center" style={{ maxWidth: '200px', fontSize: '12px' }} >{registration.registration_error && <div style={{ color: 'red' }} >{'  • Registration •  ' + registration.registration_error} </div>} {registration.registration_cancel_error && <div style={{ color: 'darkred' }}> {'  • Cancellation •  ' + registration.registration_cancel_error}</div>}</TableCell>

                  <TableCell align="center">
                    <LoadingButton loading={deleteRegistrationLoading} disabled={registration.registration_id == '1'} style={{ fontSize: '13px' }} endIcon={<AiFillDelete />} variant="contained" color="error" onClick={() => { DeleteRegistration(registration?.registration_id) }} >DELETE</LoadingButton>
                  </TableCell>

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
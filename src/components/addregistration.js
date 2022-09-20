import React, { useState, useEffect } from 'react'

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
import { AiFillCar } from 'react-icons/ai'
import Snackbar from '@mui/material/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {BsFillPlayFill} from 'react-icons/bs'
import {AiFillLock} from 'react-icons/ai'

import {MdEmail} from 'react-icons/md'

import {AiFillPhone} from 'react-icons/ai'

import {MdAccessTimeFilled} from 'react-icons/md'

function AddRegistration({ setRegistrations }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [apartmentNumbersOptions, setApartmentNumbersOptions] = useState([]);
const [startingDateOptions, setStartingDateOptions] = useState([]);

  useEffect(() => {
    setApartmentNumbersOptions([])
    var arr = [{ label: 'OFFICE' }, { label: '100' }];
    for (var i = 0; i <= 1253; i++) {
      arr.push({ label: (i + 1001).toString() });
    }
    setApartmentNumbersOptions(arr);
  }, [])



function AddTheNextSevenDaysInArrayINThisFormatYearNumberDashMonthNumberTwoDigitsDashDayNumberTwoDigitsDash(){
  var arr = [];
  var d = new Date();
  for (var i = 0; i < 7; i++) {
    var day = d.getDate()-1;
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var dayName = d.toLocaleString('en-us', { weekday: 'long',timeZone: "America/Los_Angeles" });
    var monthName = d.toLocaleString('en-us', { month: 'long' ,timeZone: "America/Los_Angeles"});
    arr.push( year + '-' + (String(month).length== 1 ? '0'+String(month) : month ) + '-' + (String(day).length== 1 ? '0'+String(day) : day ));
    d.setDate(d.getDate() + 1);
  }
  setStartingDateOptions(arr)
}
useEffect(()=>{
  AddTheNextSevenDaysInArrayINThisFormatYearNumberDashMonthNumberTwoDigitsDashDayNumberTwoDigitsDash()
},[])

const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };



  const [registration_licence_plate, setLicencePlate] = useState('');
  const [registration_apartment_number, setApartmentNumber] = useState('');
  const [registration_passcode, setPasscode] = useState('');
  const [registration_start_date, setStartDate] = useState('');
  const [registration_start_time, setStartTime] = useState('');
  const [registration_parking_duration, setParkingDuration] = useState('');
  const [registration_contact_email, setContactEmail] = useState('');
  const [registration_contact_phone, setContactPhone] = useState('');
  const [registration_hours_until_cancel, setHoursUntilCancel] = useState('');
  const [registration_active_days, setActiveDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);


  //console.log({ registration_licence_plate, registration_apartment_number, registration_passcode, registration_start_date, registration_start_time, registration_parking_duration, registration_contact_email, registration_contact_phone });
  const [addRegistrationLoading, setAddRegistrationLoading] = useState(false);

  const AddRegistration = async () => {
    setAddRegistrationLoading(true)
    try {
      const body = {
        registration_licence_plate,
        registration_apartment_number,
        registration_passcode,
        registration_start_date,
        registration_start_time,
        registration_parking_duration,
        registration_contact_email,
        registration_contact_phone,
        registration_hours_until_cancel,
        registration_active_days
      };
      const response = await fetch(process.env.REACT_APP_HOST + "/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const jsonData = await response.json();

      setRegistrations(previousRegistrations => [...previousRegistrations, jsonData]);
      setAddRegistrationLoading(false);
      setSnackbarMessage('New Registration Schedule Added Successfully');
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err.message);
      setAddRegistrationLoading(false)
      setSnackbarMessage('Error: ' + err.message);
      setSnackbarOpen(true);
    }

    setAddRegistrationLoading(false)

  };
function Remove (day){
  var arr = registration_active_days;
  arr = arr.filter(e => e !== day)
  setActiveDays(arr);
}

const [startTimeOptions, setStartTimeOptions] = useState([]);

function AddTimeToArrayOFWholeDayWithoutAmOrPmEvery15minutesStartingFromMidnightAndRemoveTheLastThreeItemsFromArray(){
  var arr = [];
  var d = new Date();
  d.setHours(0,0,0,0)
  for (var i = 0; i < 96; i++) {
    var hour = d.getHours();
    var minute = d.getMinutes();
    arr.push( (String(hour).length== 1 ? '0'+String(hour) : hour ) + ':' + (String(minute).length== 1 ? '0'+String(minute) : minute ));
    d.setMinutes(d.getMinutes() + 15);
  }
  arr.pop()
  arr.pop()
  arr.pop()
  setStartTimeOptions(arr)



}
useEffect(()=>{
  AddTimeToArrayOFWholeDayWithoutAmOrPmEvery15minutesStartingFromMidnightAndRemoveTheLastThreeItemsFromArray()
},[])

console.log({startTimeOptions})

  return (
    <div>

      <h2>Schedule a Vehicle Registration</h2>
      <div className='registrationFields' >
        <Divider textAlign='center' style={{width:'70%', marginBlock:'30px'}} > <i >Registration Info</i></Divider> 

        <TextField InputProps={{
          startAdornment: (<InputAdornment position="start"><AiFillCar /></InputAdornment>),}} className='registrationField' label="Licence Plate" value={registration_licence_plate} onChange={(e) => { setLicencePlate(e.target.value) }} variant="outlined" />

        {(apartmentNumbersOptions?.length > 0) && <Autocomplete  className='registrationField' disablePortal id="combo-box-demo" options={apartmentNumbersOptions}
          style={{ width: '70vw', maxWidth: '500px' }}
          renderInput={(params) => <TextField {...params} label="Appartment" />}
          onChange={(e, value) => { setApartmentNumber(value?.label) }}
        />}
        <TextField InputProps={{
          startAdornment: (<InputAdornment position="start"><AiFillLock /></InputAdornment>),}} className='registrationField' value={registration_passcode} onChange={(e) => { setPasscode(e.target.value) }} label="Passcode" variant="outlined" />

        <FormControl className='registrationField'   >
          <InputLabel  id="demo-simple-select-label">Starting Date</InputLabel>
          <Select  label="Starting Date" value={registration_start_date} onChange={(e) => handleChange(e, setStartDate)} >
            {/* <MenuItem value="Right now" > Right now</MenuItem> */}
            {startingDateOptions.map((date)=>{return(
              <MenuItem value={date}>{date}</MenuItem>
            )})}
          </Select>
        </FormControl>


        <FormControl className='registrationField' >
          <InputLabel id="demo-simple-select-label">Starting Time</InputLabel>
          <Select value={registration_start_time} onChange={(e) => handleChange(e, setStartTime)} label="Starting Time" >
            {startTimeOptions.map((time)=>{return(
              <MenuItem value={time}>{time}</MenuItem>
            )})}

          </Select>
        </FormControl>


        <FormControl className='registrationField' >
          <InputLabel id="demo-simple-select-label">Parking Duration</InputLabel>
          <Select value={registration_parking_duration} onChange={(e) => handleChange(e, setParkingDuration)} label='Parking Duration' >
            <MenuItem value="PT24H">1 day</MenuItem>
            <MenuItem value="PT48H">2 days</MenuItem>
            <MenuItem value="PT72H">3 days</MenuItem>
            <MenuItem value="PT96H">4 days</MenuItem>
            <MenuItem value="PT120H">5 days</MenuItem>
            <MenuItem value="PT144H">6 days</MenuItem>
            <MenuItem value="PT168H">7 days</MenuItem>
            <MenuItem value="PT192H">8 days</MenuItem>
            <MenuItem value="PT216H">9 days</MenuItem>
            <MenuItem value="PT240H">10 days</MenuItem>
            <MenuItem value="PT264H">11 days</MenuItem>
            <MenuItem value="PT288H">12 days</MenuItem>
            <MenuItem value="PT312H">13 days</MenuItem>
            <MenuItem value="PT336H">14 days</MenuItem>
            <MenuItem value="PT360H">15 days</MenuItem>

          </Select>
          <FormHelperText>Choose any value. The Permit is gonna get cancelled anyway</FormHelperText>
        </FormControl>


        <TextField InputProps={{
          startAdornment: (<InputAdornment position="start"><MdEmail /></InputAdornment>),}} className='registrationField' value={registration_contact_email} onChange={(e) => setContactEmail(e.target.value)} label="Contact Email" variant="outlined" />


        <TextField InputProps={{
          startAdornment: (<InputAdornment position="start"><AiFillPhone /></InputAdornment>),}}  className='registrationField' value={registration_contact_phone} onChange={(e) => setContactPhone(e.target.value)} label="Contact Phone" variant="outlined" />
       <Divider textAlign='center' style={{width:'70%', marginBlock:'30px'}} > <i >Scheduling Info</i></Divider> 
        
       

        <TextField InputProps={{
          startAdornment: (<InputAdornment position="start"><MdAccessTimeFilled /></InputAdornment>),}} className='registrationField' value={registration_hours_until_cancel} onChange={(e) => { setHoursUntilCancel(e.target.value) }} type={"number"} label='Hours Until Cancelling' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />

        <div className='registrationField' style={{marginBottom:'50px', marginTop:'20px'}} >
          <FormLabel component="legend">Active Days</FormLabel>
         <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', margin:'auto',marginTop:'13px', width:'70%'}} >
            <FormControlLabel
              control={<Checkbox  checked={registration_active_days.includes('Monday')} onChange={()=>{if(registration_active_days.includes('Monday')){Remove('Monday')} else {setActiveDays(activeDays => [...activeDays, 'Monday'])}}} />}
              label="Mon"
              labelPlacement="top"
            />
             <FormControlLabel
              control={<Checkbox  checked={registration_active_days.includes('Tuesday')} onChange={()=>{if(registration_active_days.includes('Tuesday')){Remove('Tuesday')} else {setActiveDays(activeDays => [...activeDays, 'Tuesday'])}}} />}
              label="Tue"
              labelPlacement="top"
            />
              <FormControlLabel
              control={<Checkbox  checked={registration_active_days.includes('Wednesday')} onChange={()=>{if(registration_active_days.includes('Wednesday')){Remove('Wednesday')} else {setActiveDays(activeDays => [...activeDays, 'Wednesday'])}}} />}
              label="Wed"
              labelPlacement="top"
            />

            <FormControlLabel
              control={<Checkbox  checked={registration_active_days.includes('Thursday')} onChange={()=>{if(registration_active_days.includes('Thursday')){Remove('Thursday')} else {setActiveDays(activeDays => [...activeDays, 'Thursday'])}}} />}
              label="Thu"
              labelPlacement="top"
            />
            <FormControlLabel

              control={<Checkbox  checked={registration_active_days.includes('Friday')} onChange={()=>{if(registration_active_days.includes('Friday')){Remove('Friday')} else {setActiveDays(activeDays => [...activeDays, 'Friday'])}}} />}
              label="Fri"
              labelPlacement="top"
            />
            <FormControlLabel
              control={<Checkbox  checked={registration_active_days.includes('Saturday')} onChange={()=>{if(registration_active_days.includes('Saturday')){Remove('Saturday')} else {setActiveDays(activeDays => [...activeDays, 'Saturday'])}}} />}
              label="Sat"
              labelPlacement="top"
            />
            <FormControlLabel
              control={<Checkbox  checked={registration_active_days.includes('Sunday')} onChange={()=>{if(registration_active_days.includes('Sunday')){Remove('Sunday')} else {setActiveDays(activeDays => [...activeDays, 'Sunday'])}}} />}
              label="Sun"
              labelPlacement="top"
            />

            </div>

          
        </div>

        <LoadingButton variant="contained" color="success" style={{marginBlock:'30px'}} onClick={() => { AddRegistration(); }} loading={addRegistrationLoading} loadingPosition="end" endIcon={<BsFillPlayFill />} >
        Schedule Registration
      </LoadingButton>
      </div>



      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  )
}

export default AddRegistration
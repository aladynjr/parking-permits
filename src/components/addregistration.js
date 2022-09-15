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


function AddRegistration({ setRegistrations }) {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [apartmentNumbersOptions, setApartmentNumbersOptions] = useState([]);

  useEffect(() => {
    setApartmentNumbersOptions([])
    var arr = [{ label: 'OFFICE' }, { label: '100' }];
    for (var i = 0; i <= 1253; i++) {
      arr.push({ label: (i + 1001).toString() });
    }
    setApartmentNumbersOptions(arr);
  }, [])

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
console.log( {registration_hours_until_cancel,
  registration_active_days})
  return (
    <div>

      <h2>Schedule Registration</h2>
      <div className='registrationFields' >
        <TextField label="Licence Plate" value={registration_licence_plate} onChange={(e) => { setLicencePlate(e.target.value) }} variant="outlined" />

        {(apartmentNumbersOptions?.length > 0) && <Autocomplete disablePortal id="combo-box-demo" options={apartmentNumbersOptions}
          style={{ width: '70vw', maxWidth: '500px' }}
          renderInput={(params) => <TextField {...params} label="Appartment" />}
          onChange={(e, value) => { setApartmentNumber(value?.label) }}
        />}
        <TextField value={registration_passcode} onChange={(e) => { setPasscode(e.target.value) }} label="Passcode" variant="outlined" />

        <FormControl style={{ width: '300px' }} >
          <InputLabel id="demo-simple-select-label">Starting Date</InputLabel>
          <Select label="Starting Date" value={registration_start_date} onChange={(e) => handleChange(e, setStartDate)} >
            {/* <MenuItem value="Right now" > Right now</MenuItem> */}
            <MenuItem value="Thu Sep 15">Thu Sep 15</MenuItem>
            <MenuItem value="Fri Sep 16">Fri Sep 16</MenuItem>
            <MenuItem value="Sat Sep 17">Sat Sep 17</MenuItem>
            <MenuItem value="Sun Sep 18">Sun Sep 18</MenuItem>
            <MenuItem value="Mon Sep 19">Mon Sep 19</MenuItem>
            <MenuItem value="Tue Sep 20">Tue Sep 20</MenuItem>
          </Select>
        </FormControl>


        <FormControl style={{ width: '300px' }} >
          <InputLabel id="demo-simple-select-label">Starting Time</InputLabel>
          <Select value={registration_start_time} onChange={(e) => handleChange(e, setStartTime)} label="Starting Time" >
            <MenuItem value="12:00 AM">12:00 AM</MenuItem>
            <MenuItem value="12:15 AM">12:15 AM</MenuItem>
            <MenuItem value="12:30 AM">12:30 AM</MenuItem>
            <MenuItem value="12:45 AM">12:45 AM</MenuItem>
            <MenuItem value="1:00 AM">1:00 AM</MenuItem>
            <MenuItem value="1:15 AM">1:15 AM</MenuItem>
            <MenuItem value="1:30 AM">1:30 AM</MenuItem>
            <MenuItem value="1:45 AM">1:45 AM</MenuItem>
            <MenuItem value="2:00 AM">2:00 AM</MenuItem>
            <MenuItem value="2:15 AM">2:15 AM</MenuItem>
            <MenuItem value="2:30 AM">2:30 AM</MenuItem>
            <MenuItem value="2:45 AM">2:45 AM</MenuItem>
            <MenuItem value="3:00 AM">3:00 AM</MenuItem>
            <MenuItem value="3:15 AM">3:15 AM</MenuItem>
            <MenuItem value="3:30 AM">3:30 AM</MenuItem>
            <MenuItem value="3:45 AM">3:45 AM</MenuItem>
            <MenuItem value="4:00 AM">4:00 AM</MenuItem>
            <MenuItem value="4:15 AM">4:15 AM</MenuItem>
            <MenuItem value="4:30 AM">4:30 AM</MenuItem>
            <MenuItem value="4:45 AM">4:45 AM</MenuItem>
            <MenuItem value="5:00 AM">5:00 AM</MenuItem>
            <MenuItem value="5:15 AM">5:15 AM</MenuItem>
            <MenuItem value="5:30 AM">5:30 AM</MenuItem>
            <MenuItem value="5:45 AM">5:45 AM</MenuItem>
            <MenuItem value="6:00 AM">6:00 AM</MenuItem>
            <MenuItem value="6:15 AM">6:15 AM</MenuItem>
            <MenuItem value="6:30 AM">6:30 AM</MenuItem>
            <MenuItem value="6:45 AM">6:45 AM</MenuItem>
            <MenuItem value="7:00 AM">7:00 AM</MenuItem>
            <MenuItem value="7:15 AM">7:15 AM</MenuItem>
            <MenuItem value="7:30 AM">7:30 AM</MenuItem>
            <MenuItem value="7:45 AM">7:45 AM</MenuItem>
            <MenuItem value="8:00 AM">8:00 AM</MenuItem>
            <MenuItem value="8:15 AM">8:15 AM</MenuItem>
            <MenuItem value="8:30 AM">8:30 AM</MenuItem>
            <MenuItem value="8:45 AM">8:45 AM</MenuItem>
            <MenuItem value="9:00 AM">9:00 AM</MenuItem>
            <MenuItem value="9:15 AM">9:15 AM</MenuItem>
            <MenuItem value="9:30 AM">9:30 AM</MenuItem>
            <MenuItem value="9:45 AM">9:45 AM</MenuItem>
            <MenuItem value="10:00 AM">10:00 AM</MenuItem>
            <MenuItem value="10:15 AM">10:15 AM</MenuItem>
            <MenuItem value="10:30 AM">10:30 AM</MenuItem>
            <MenuItem value="10:45 AM">10:45 AM</MenuItem>
            <MenuItem value="11:00 AM">11:00 AM</MenuItem>
            <MenuItem value="11:15 AM">11:15 AM</MenuItem>
            <MenuItem value="11:30 AM">11:30 AM</MenuItem>
            <MenuItem value="11:45 AM">11:45 AM</MenuItem>
            <MenuItem value="12:00 PM">12:00 PM</MenuItem>
            <MenuItem value="12:15 PM">12:15 PM</MenuItem>
            <MenuItem value="12:30 PM">12:30 PM</MenuItem>
            <MenuItem value="12:45 PM">12:45 PM</MenuItem>
            <MenuItem value="1:00 PM">1:00 PM</MenuItem>
            <MenuItem value="1:15 PM">1:15 PM</MenuItem>
            <MenuItem value="1:30 PM">1:30 PM</MenuItem>
            <MenuItem value="1:45 PM">1:45 PM</MenuItem>
            <MenuItem value="2:00 PM">2:00 PM</MenuItem>
            <MenuItem value="2:15 PM">2:15 PM</MenuItem>
            <MenuItem value="2:30 PM">2:30 PM</MenuItem>
            <MenuItem value="2:45 PM">2:45 PM</MenuItem>
            <MenuItem value="3:00 PM">3:00 PM</MenuItem>
            <MenuItem value="3:15 PM">3:15 PM</MenuItem>
            <MenuItem value="3:30 PM">3:30 PM</MenuItem>
            <MenuItem value="3:45 PM">3:45 PM</MenuItem>
            <MenuItem value="4:00 PM">4:00 PM</MenuItem>
            <MenuItem value="4:15 PM">4:15 PM</MenuItem>
            <MenuItem value="4:30 PM">4:30 PM</MenuItem>
            <MenuItem value="4:45 PM">4:45 PM</MenuItem>
            <MenuItem value="5:00 PM">5:00 PM</MenuItem>
            <MenuItem value="5:15 PM">5:15 PM</MenuItem>
            <MenuItem value="5:30 PM">5:30 PM</MenuItem>
            <MenuItem value="5:45 PM">5:45 PM</MenuItem>
            <MenuItem value="6:00 PM">6:00 PM</MenuItem>
            <MenuItem value="6:15 PM">6:15 PM</MenuItem>
            <MenuItem value="6:30 PM">6:30 PM</MenuItem>
            <MenuItem value="6:45 PM">6:45 PM</MenuItem>
            <MenuItem value="7:00 PM">7:00 PM</MenuItem>
            <MenuItem value="7:15 PM">7:15 PM</MenuItem>
            <MenuItem value="7:30 PM">7:30 PM</MenuItem>
            <MenuItem value="7:45 PM">7:45 PM</MenuItem>
            <MenuItem value="8:00 PM">8:00 PM</MenuItem>
            <MenuItem value="8:15 PM">8:15 PM</MenuItem>
            <MenuItem value="8:30 PM">8:30 PM</MenuItem>
            <MenuItem value="8:45 PM">8:45 PM</MenuItem>
            <MenuItem value="9:00 PM">9:00 PM</MenuItem>
            <MenuItem value="9:15 PM">9:15 PM</MenuItem>
            <MenuItem value="9:30 PM">9:30 PM</MenuItem>
            <MenuItem value="9:45 PM">9:45 PM</MenuItem>
            <MenuItem value="10:00 PM">10:00 PM</MenuItem>
            <MenuItem value="10:15 PM">10:15 PM</MenuItem>
            <MenuItem value="10:30 PM">10:30 PM</MenuItem>
            <MenuItem value="10:45 PM">10:45 PM</MenuItem>
            <MenuItem value="11:00 PM">11:00 PM</MenuItem>
          </Select>
        </FormControl>


        <FormControl style={{ width: '300px' }} >
          <InputLabel id="demo-simple-select-label">Parking Duration</InputLabel>
          <Select value={registration_parking_duration} onChange={(e) => handleChange(e, setParkingDuration)} label='Parking Duration' >
            <MenuItem value="1 day">1 day</MenuItem>
            <MenuItem value="2 days">2 days</MenuItem>
            <MenuItem value="3 days">3 days</MenuItem>
            <MenuItem value="4 days">4 days</MenuItem>
            <MenuItem value="5 days">5 days</MenuItem>
            <MenuItem value="6 days">6 days</MenuItem>
            <MenuItem value="7 days">7 days</MenuItem>
            <MenuItem value="8 days">8 days</MenuItem>
            <MenuItem value="9 days">9 days</MenuItem>
            <MenuItem value="10 days">10 days</MenuItem>
            <MenuItem value="11 days">11 days</MenuItem>
            <MenuItem value="12 days">12 days</MenuItem>
            <MenuItem value="13 days">13 days</MenuItem>
            <MenuItem value="14 days">14 days</MenuItem>
            <MenuItem value="15 days">15 days</MenuItem>
          </Select>
          <FormHelperText>Choose any value. The Permit is gonna get cancelled anyway</FormHelperText>
        </FormControl>


        <TextField value={registration_contact_email} onChange={(e) => setContactEmail(e.target.value)} label="Contact Email" variant="outlined" />


        <TextField value={registration_contact_phone} onChange={(e) => setContactPhone(e.target.value)} label="Contact Phone" variant="outlined" />

        <TextField value={registration_hours_until_cancel} onChange={(e) => { setHoursUntilCancel(e.target.value) }} type={"number"} label='Hours Until Cancelling' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
        <div style={{marginBlock:'50px'}} >
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

        <LoadingButton variant="contained" color="success" onClick={() => { AddRegistration(); }} loading={addRegistrationLoading} loadingPosition="end" endIcon={<AiFillCar />} >
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
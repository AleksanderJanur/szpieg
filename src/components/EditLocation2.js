import React, { useState,useEffect, useContext} from 'react';
import trackerApi from '../api/tracker';
import EditEvent from "./EditEvent";
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import EditEvent2 from "./EditEvent2";
const EditLocation2 = (props) =>{
    const history = useHistory();
    const [locationName, setLocationName] = useState(props.location.state.event.name);
    const [locationStreet, setLocationStreet] = useState(props.location.state.event.street);
    const [locationPostalCode, setLocationPostalCode] = useState(props.location.state.event.postalCode);
    const [locationCity, setLocationCity] = useState(props.location.state.event.city);
    const [locationPicture, setLocationPicture] = useState(props.location.state.event.picture===undefined?null:props.location.state.event.picture);
    const [locationSEOType, setLocationSEOType] = useState(props.location.state.event.SEOType);
    const [locationLongitude, setLocationLongitude] = useState(props.location.state.event.longitude);
    const [locationLatitude, setLocationLatitude] = useState(props.location.state.event.latitude);
    const SEOTypeOptions = [
        { key: 'd', text: 'TouristDestination', value: 'destination' },
        { key: 'att', text: 'TouristAttraction', value: 'attraction' },
        { key: 'l', text: 'LandmarksOrHistoricalBuildings', value: 'landmarks' },
        { key: 'acc', text: 'Accommodation', value: 'accommodation' },
    ]
   const updateLocation = async (locationName,locationStreet,locationPostalCode,locationCity,locationPicture,locationSEOType,locationLongitude,locationLatitude)=>{
       const myJson = {
                "_id":props.location.state.event._id,
               "name": locationName,
               "street": locationStreet,
               "postalCode": locationPostalCode,
               "city": locationCity,
               "picture":locationPicture,
               "SEOType": locationSEOType,
               "longitude": locationLongitude,
               "latitude": locationLatitude
       }
       await trackerApi.post('/updateLocation',{myJson} ).then(res=>res.status===200?notify():alert("Coś poszło nie tak"))
   }
   const deleteLocation = async ()=>{
            const id = props.location.state.event._id;
        await trackerApi.post('/deleteLocation',{id} ).then(res=>res.status===200?deleteMessage():alert("Coś poszło nie tak"))
    }
    const notify = () => {
        alert("Edytowano Lokalizacje");
        history.push('');
    }
    const deleteMessage = ()=>{
        alert("Usunięto lokalizacje");
        history.push('');
    }

    return(
        <Form>
            <Form.Group widths='2'>
        <Form.Field
            id='form-input-control-locationName'
            control={Input}
            label='Nazwa lokalizacji'
            placeholder='Nazwa lokalizacji'
            onChange={e=>setLocationName(e.target.value)}
            value={locationName}
        />
    <Form.Field
        id='form-input-control-first-locationStreet'
        control={Input}
        label='ulica'
        placeholder='Ulica'
        onChange={e=>setLocationStreet(e.target.value)}
        value={locationStreet}
    />
    <Form.Field
        id='form-input-control-postalCode'
        control={Input}
        label='Kod pocztowy'
        placeholder='Kod pocztowy'
        onChange={e=>setLocationPostalCode(e.target.value)}
        value={locationPostalCode}
    />
    <Form.Field
        id='form-input-control-Locationcity'
        control={Input}
        label='Miasto'
        placeholder='Miasto'
        onChange={e=>setLocationCity(e.target.value)}
        value={locationCity}
    />
            </Form.Group>
            <Form.Group widths='2'>
    <Form.Field>
        <label>Zdjęcie lokalizacji {/*{props.location.state.event.location.picture}*/}</label>
        <input type="file" onChange={e=>setLocationPicture(e.target.files[0])}></input>
    </Form.Field>

    <Form.Field
    control={Select}
    options={SEOTypeOptions}
    label={{ children: 'Status SEO-Type', htmlFor: 'form-select-control-SEOType' }}
    placeholder='SEOType'
    search
    searchInput={{ id: 'form-select-control-SEOType' }}
    onChange={e=>{
    if(e.target.children.length != 0){
    setLocationSEOType(e.target.children[0].innerHTML);
    }
    }}
    />
    <Form.Field
    id='form-input-control-locationLongitude'
    control={Input}
    label='długość geograficzna'
    placeholder='długość geograficzna'
    onChange={e=>setLocationLongitude(e.target.value)}
    value={locationLongitude}
    />
    <Form.Field
    id='form-input-control-locationLatitude'
    control={Input}
    label='szerokość geograficzna'
    placeholder='szerokość geograficzna'
    onChange={e=>setLocationLatitude(e.target.value)}
    value={locationLatitude}
    />
        </Form.Group>
{/*            <Button type='submit' onClick={()=>updateLocation(locationName,locationStreet,locationPostalCode,locationCity,locationPicture,locationSEOType,locationLongitude,locationLatitude)}>Wyślij</Button>*/}
            <Button.Group>
                <Button negative onClick={()=>deleteLocation()}>delete</Button>
                <Button.Or />
                <Button positive onClick={()=>updateLocation(locationName,locationStreet,locationPostalCode,locationCity,locationPicture,locationSEOType,locationLongitude,locationLatitude)}>update</Button>
            </Button.Group>
        </Form>
    )
}
export default EditLocation2;

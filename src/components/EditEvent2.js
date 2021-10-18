import React, { useState,useEffect, useContext} from 'react';
import trackerApi from '../api/tracker';
import EditEvent from "./EditEvent";
import { Form, Input, TextArea, Button, Select,Grid } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
const EditEvent2 = (props)=>{
    const history = useHistory();
    const funkcja = async(eventID,locationID, link,title,subtitle,data, hour, price, kupBilecik,BILETINPL,BILETY24PL,EVENTIMPL,BILETOMATPL,EWEJSCIOWKIPL,TICKETMASTER,
                          status, locationName,locationStreet,locationPostalCode,locationCity,locationPicture,locationSEOType,locationLongitude,locationLatitude,
                          promoterName,promoterLink,promoterPicture, picture, promotion, color, category, tags) =>{
        addToTicketArr();
        const myJson = {
            "link": link,
            "title": title,
            "subtitle": subtitle,
            "data": data,
            "hour": hour,
            "price": price,
            "urls": addToTicketArr(),
            "status": status,
            "location": {
                "_id":(locationID),
                "locationName": locationName,
                "locationStreet": locationStreet,
                "locationPostalCode": locationPostalCode,
                "locationCity": locationCity,
                "locationPicture":locationPicture,
                "locationSEOType": locationSEOType,
                "locationLongitude": locationLongitude,
                "locationLatitude": locationLatitude
            },
            "promoter": {
                "_id":props.location.state.event.location._id,
                "name": promoterName,
                "link": promoterLink,
                "picture": promoterPicture
            },
            "picture": picture,
            "promotion": picture,
            "color": color,
            "category": category,
            "tags": tags.split('#')
        }
        await trackerApi.post('/updateEvent',{eventID,locationID, myJson} ).then(res=>res.status===200?notify():alert("Coś poszło nie tak"))
    }
    const deleteLocation = async ()=>{
        const id = props.location.state.event._id;
        await trackerApi.post('/deleteEvent',{id} ).then(res=>res.status===200?deleteMessage():alert("Coś poszło nie tak"))
    }
    const notify = () => {
        alert("Edytowano Event");
        history.push('panelAdmin');
    }
    const deleteMessage = ()=>{
        alert("Usunięto lokalizacje");
        history.push('');
    }
    const statusOptions = [
        { key: 'p', text: 'Planowane', value: 'plane' },
        { key: 'a', text: 'Anulowane', value: 'canceled' },
        { key: 'o', text: 'Online', value: 'online' },
    ]

    const promotionOptions = [
        { key: 'sg', text: 'Strona Główna', value: 'main' },
        { key: 'sm', text: 'Strona Miasta', value: 'city' },
        { key: 'n', text: 'Nigdzie', value: 'nothing' },
    ]
    const SEOTypeOptions = [
        { key: 'd', text: 'TouristDestination', value: 'destination' },
        { key: 'att', text: 'TouristAttraction', value: 'attraction' },
        { key: 'l', text: 'LandmarksOrHistoricalBuildings', value: 'landmarks' },
        { key: 'acc', text: 'Accommodation', value: 'accommodation' },
    ]
    const addToTicketArr = ()=>{
        let ticketArr = []
        if(kupBilecik.clicked==='on'){
            ticketArr.push({"url":kupBilecik.url,
                "name":"kupBilecik"})
        }
        if(BILETINPL.clicked==='on'){
            ticketArr.push({"url":BILETINPL.url,
                "name":"BILETINPL"})
        }
        if(BILETY24PL.clicked==='on'){
            ticketArr.push({"url":BILETY24PL.url,
                "name":"BILETY24PL"})
        }
        if(EVENTIMPL.clicked==='on'){
            ticketArr.push({"url":EVENTIMPL.url,
                "name":"EVENTIMPL"})
        }
        if(BILETOMATPL.clicked==='on'){
            ticketArr.push({"url":BILETOMATPL.url,
                "name":"BILETOMATPL"})
        }
        if(EWEJSCIOWKIPL.clicked==='on'){
            ticketArr.push({"url":EWEJSCIOWKIPL.url,
                "name":"EWEJSCIOWKIPL"})
        }
        if(TICKETMASTER.clicked==='on'){
            ticketArr.push({"url":TICKETMASTER.url,
                "name":"TICKETMASTER"})
        }
        return ticketArr;
    }
    //to powinny undefined leciec jako nulle ---
    const [link, setLink] = useState(props.location.state===undefined?'':props.location.state.event.link);
    const [title, setTitle] = useState(props.location.state===undefined?'':props.location.state.event.title);
    const [subtitle, setSubtitle] = useState(props.location.state===undefined?'':props.location.state.event.subtitle);
    const [startDate, setStartDate] = useState(props.location.state===undefined?new(Date):new Date(props.location.state.event.data));
    const [hour, setHour] = useState(props.location.state===undefined?new Date():props.location.state.event.hour.isValid?new Date(props.location.state.event.hour):new Date());
    const [price, setPrice] = useState(props.location.state===undefined?'':props.location.state.event.price)
    const [kupBilecik, setKupBilecik] = useState({clicked:'off',url:''});//Tutaj jeszcze dodac, ze to jest kupBilecik
    const [BILETINPL, setBILETINPL] = useState({clicked:'off',url:''});
    const [BILETY24PL, setBILETY24PL] = useState({clicked:'off',url:''});
    const [EVENTIMPL, setEVENTIMPL] = useState({clicked:'off',url:''});
    const [BILETOMATPL, setBILETOMATPL] = useState({clicked:'off',url:''});
    const [EWEJSCIOWKIPL, setEWEJSCIOWKIPL] = useState({clicked:'off',url:''});
    const [TICKETMASTER, setTICKETMASTER] = useState({clicked:'off',url:''});
    const [status, setStatus] = useState(props.location.state===undefined?'':props.location.state.event.status);
    const [locationName, setLocationName] = useState(props.location.state===undefined?'':props.location.state.event.location.locationName);
    const [locationStreet, setLocationStreet] = useState(props.location.state===undefined?'':props.location.state.event.location.locationStreet);
    const [locationPostalCode, setLocationPostalCode] = useState(props.location.state===undefined?'':props.location.state.event.location.locationPostalCode);
    const [locationCity, setLocationCity] = useState(props.location.state===undefined?'':props.location.state.event.location.locationCity);
    const [locationPicture, setLocationPicture] = useState(props.location.state===undefined?'':props.location.state.event.location.locationPicture===undefined?null:props.location.state.event.location.locationPicture);
    const [locationSEOType, setLocationSEOType] = useState(props.location.state===undefined?'':props.location.state.event.location.locationSEOType);
    const [locationLongitude, setLocationLongitude] = useState(props.location.state===undefined?'':props.location.state.event.location.locationLongitude);
    const [locationLatitude, setLocationLatitude] = useState(props.location.state===undefined?'':props.location.state.event.location.locationLatitude);
    const [promoterName, setPromoterName] = useState(props.location.state===undefined||props.location.state.event.promoter===undefined?'':props.location.state.event.promoter.name);
    const [promoterLink, setPromoterLink] = useState(props.location.state===undefined||props.location.state.event.promoter===undefined?'':props.location.state.event.promoter.link);
    const [promoterPicture, setPromoterPicture] = useState(props.location.state===undefined||props.location.state.event.promoter===undefined?'':props.location.state.event.promoter.picture===undefined?null:props.location.state.event.promoter.promoterPicture);
    const [picture, setPicture] = useState(props.location.state===undefined?null:props.location.state.event.picture);
    const [promotion, setPromotion] = useState(props.location.state===undefined?'':props.location.state.event.promotion);// co tu sie stalo?
    const [color, setColor] = useState(props.location.state===undefined?'':props.location.state.event.color);
    const [category, setCategory] = useState(''); //?
    const [tags, setTags] = useState('');
    const [check, setCheck]= useState(false);
    useEffect(() => {
        let word = ''
        if(props.location.state!==undefined) {
            for (let i = 0; i < props.location.state.event.tags.length; i++) {
                word += '#' + props.location.state.event.tags[i]
            }
            setTags(word)
            for (let j = 0; j < props.location.state.event.urls.length; j++) {
                console.log(props.location.state.event.urls[j].name)
                if (props.location.state.event.urls[j].name === 'kupBilecik') {
                    setKupBilecik({clicked: 'on', url: props.location.state.event.urls[j].url})
                    setCheck(true)
                }
                if (props.location.state.event.urls[j].name === 'BILETINPL') {
                    setBILETINPL({clicked: 'on', url: props.location.state.event.urls[j].url})
                }
                if (props.location.state.event.urls[j].name === 'BILETY24PL') {
                    setBILETY24PL({clicked: 'on', url: props.location.state.event.urls[j].url})
                }
                if (props.location.state.event.urls[j].name === 'EVENTIMPL') {
                    setEVENTIMPL({clicked: 'on', url: props.location.state.event.urls[j].url})
                }
                if (props.location.state.event.urls[j].name === 'BILETOMATPL') {
                    setBILETOMATPL({clicked: 'on', url: props.location.state.event.urls[j].url})
                }
                if (props.location.state.event.urls[j].name === 'EWEJSCIOWKIPL') {
                    setEWEJSCIOWKIPL({clicked: 'on', url: props.location.state.event.urls[j].url})
                }
                if (props.location.state.event.urls[j].name === 'TICKETMASTER') {
                    setTICKETMASTER({clicked: 'on', url: props.location.state.event.urls[j].url})
                }
            }
        }
    }, []);


    return(
        /*<div onClick={funkcja}>dupa</div>*/

        <Form>
            <Form.Group widths='equal'>
                <Form.Field
                    id='form-input-control-link'
                    control={Input}
                    label='Link'
                    placeholder='link'
                    onChange={e=>setLink(e.target.value)}
                    value={link}
                />
                <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    label='Tytuł'
                    placeholder='Tytuł'
                    onChange={e=>setTitle(e.target.value)}
                    value={title}
                />
                <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    label='Podtytuł'
                    placeholder='Podtytuł'
                    onChange={e=>setSubtitle(e.target.value)}
                    value={subtitle}
                />
                {/*            </Form.Group>
                <Form.Group widths='equal'>*/}
                <Form.Field>
                    <label>data</label>
                    <DatePicker style={{width:'100%'}} selected={startDate} onChange={(date) => setStartDate(date)}/>
                </Form.Field>
                <Form.Field>
                    <label>Godzina</label>
                    <DatePicker
                        selected={hour}
                        onChange={(date) => setHour(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                </Form.Field>
                <Form.Field
                    id='form-input-control-price'
                    control={Input}
                    label='Cena'
                    placeholder='cena'
                    onChange={e=>setPrice(e.target.value)}
                    value={price}
                />
                <Form.Field>
                    <label>Zdjęcie wyrózniające {props.location.state===undefined?'':props.location.state.event.picture}</label>
                    <input type="file" onChange={e=>setPicture(e.target.files[0])}></input>
                </Form.Field>
            </Form.Group>
            <Form.Group grouped>
                {kupBilecik.clicked==='on'?
                <Form.Field checked  onClick={(e)=>{
                    kupBilecik.clicked === 'off'?
                        setKupBilecik(prevState => ({
                            ...prevState,
                            clicked:'on'
                        }))
                        :
                        setKupBilecik(prevState => ({
                            ...prevState,
                            clicked: 'off'
                        }));
                    console.log(e.target.value)
                }
                } label='KUPBILECIK' control='input' type='checkbox' />:
                    <Form.Field   onClick={(e)=>{
                        kupBilecik.clicked === 'off'?
                            setKupBilecik(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setKupBilecik(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                        console.log(e.target.value)
                    }
                    } label='KUPBILECIK' control='input' type='checkbox' />}
                <Form.Field
                    id='form-input-control-kupBilecik-url'
                    control={Input}
                    placeholder='url'
                    onChange={(e)=>{if(kupBilecik.clicked === 'on'){
                        setKupBilecik(prevState => ({
                            ...prevState,
                            url:e.target.value
                        }));
                    };
                    }}
                    value={kupBilecik.url}
                />
                {/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
                {BILETINPL.clicked==='on'?
                    <Form.Field checked  onClick={(e)=>{
                        BILETINPL.clicked === 'off'?
                            setBILETINPL(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setBILETINPL(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                        console.log(e.target.value)
                    }
                    } label='BILETINPL' control='input' type='checkbox' />:
                    <Form.Field   onClick={(e)=>{
                        BILETINPL.clicked === 'off'?
                            setBILETINPL(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setBILETINPL(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                        console.log(e.target.value)
                    }
                    } label='BILETINPL' control='input' type='checkbox' />}
                <Form.Field
                    id='form-input-control-BILETIN.PL-url'
                    control={Input}
                    placeholder='url'
                    onChange={(e)=>{if(BILETINPL.clicked === 'on'){
                        setBILETINPL(prevState => ({
                            ...prevState,
                            url:e.target.value
                        }));
                    };
                    }}
                    value={BILETINPL.url}
                />
                {/*            </Form.Group>
            <Form.Group grouped >*/}
                {BILETY24PL.clicked==='on'?
                <Form.Field checked onClick={()=>{
                    BILETY24PL.clicked === 'off'?
                        setBILETY24PL(prevState => ({
                            ...prevState,
                            clicked:'on'
                        }))
                        :
                        setBILETY24PL(prevState => ({
                            ...prevState,
                            clicked: 'off'
                        }));
                }
                }  label='BILETY24.PL' control='input' type='checkbox' />:
                    <Form.Field onClick={()=>{
                        BILETY24PL.clicked === 'off'?
                            setBILETY24PL(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setBILETY24PL(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                    }
                    }  label='BILETY24.PL' control='input' type='checkbox' />}
                <Form.Field
                    id='form-input-control-BILETY24.PL-url'
                    control={Input}
                    placeholder='url'
                    onChange={(e)=>{if(BILETY24PL.clicked === 'on'){
                        setBILETY24PL(prevState => ({
                            ...prevState,
                            url:e.target.value
                        }));
                    };
                    }}
                    value={BILETY24PL.url}
                />
                {/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
                {EVENTIMPL.clicked==='on'?
                <Form.Field checked onClick={()=>{
                    EVENTIMPL.clicked === 'off'?
                        setEVENTIMPL(prevState => ({
                            ...prevState,
                            clicked:'on'
                        }))
                        :
                        setEVENTIMPL(prevState => ({
                            ...prevState,
                            clicked: 'off'
                        }));
                }
                }label='EVENTIM.PL' control='input' type='checkbox' />:
                    <Form.Field onClick={()=>{
                        EVENTIMPL.clicked === 'off'?
                            setEVENTIMPL(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setEVENTIMPL(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                    }
                    }label='EVENTIM.PL' control='input' type='checkbox' />}
                <Form.Field
                    id='form-input-control-EVENTIM.PL-url'
                    control={Input}
                    placeholder='url'
                    onChange={(e)=>{if(EVENTIMPL.clicked === 'on'){
                        setEVENTIMPL(prevState => ({
                            ...prevState,
                            url:e.target.value
                        }));
                    };
                    }}
                    value={EVENTIMPL.url}
                />
                {/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
                {BILETOMATPL.clicked === 'on'?
                <Form.Field checked onClick={()=>{
                    BILETOMATPL.clicked === 'off'?
                        setBILETOMATPL(prevState => ({
                            ...prevState,
                            clicked:'on'
                        }))
                        :
                        setBILETOMATPL(prevState => ({
                            ...prevState,
                            clicked: 'off'
                        }));
                }
                } label='BILETOMAT.PL' control='input' type='checkbox' />:
                    <Form.Field onClick={()=>{
                        BILETOMATPL.clicked === 'off'?
                            setBILETOMATPL(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setBILETOMATPL(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                    }
                    } label='BILETOMAT.PL' control='input' type='checkbox' />}
                <Form.Field
                    id='form-input-control-BILETOMAT.PL-url'
                    control={Input}
                    placeholder='url'
                    onChange={(e)=>{if(BILETOMATPL.clicked === 'on'){
                        setBILETOMATPL(prevState => ({
                            ...prevState,
                            url:e.target.value
                        }));
                    };
                    }}
                    value={BILETOMATPL.url}
                />
                {/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
                {EWEJSCIOWKIPL.clicked === 'on'?
                <Form.Field checked onClick={()=>{
                    EWEJSCIOWKIPL.clicked === 'off'?
                        setEWEJSCIOWKIPL(prevState => ({
                            ...prevState,
                            clicked:'on'
                        }))
                        :
                        setEWEJSCIOWKIPL(prevState => ({
                            ...prevState,
                            clicked: 'off'
                        }));
                }
                } label='EWEJSCIOWKI.PL' control='input' type='checkbox' />:
                    <Form.Field  onClick={()=>{
                        EWEJSCIOWKIPL.clicked === 'off'?
                            setEWEJSCIOWKIPL(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setEWEJSCIOWKIPL(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                    }
                    } label='EWEJSCIOWKI.PL' control='input' type='checkbox' />}
                <Form.Field
                    id='form-input-control-EWEJSCIOWKIPL-url'
                    control={Input}
                    placeholder='url'
                    onChange={(e)=>{if(EWEJSCIOWKIPL.clicked === 'on'){
                        setEWEJSCIOWKIPL(prevState => ({
                            ...prevState,
                            url:e.target.value
                        }));
                    };
                    }}
                    value={EWEJSCIOWKIPL.url}
                />
                {TICKETMASTER.clicked === 'on'?
                <Form.Field checked onClick={()=>{
                    TICKETMASTER.clicked === 'off'?
                        setTICKETMASTER(prevState => ({
                            ...prevState,
                            clicked:'on'
                        }))
                        :
                        setTICKETMASTER(prevState => ({
                            ...prevState,
                            clicked: 'off'
                        }));
                }
                }  label='TICKETMASTER' control='input' type='checkbox' />:
                    <Form.Field  onClick={()=>{
                        TICKETMASTER.clicked === 'off'?
                            setTICKETMASTER(prevState => ({
                                ...prevState,
                                clicked:'on'
                            }))
                            :
                            setTICKETMASTER(prevState => ({
                                ...prevState,
                                clicked: 'off'
                            }));
                    }
                    }  label='TICKETMASTER' control='input' type='checkbox' />}
                <Form.Field
                    id='form-input-control-TICKETMASTER-url'
                    control={Input}
                    placeholder='url'
                    onChange={(e)=>{if(TICKETMASTER.clicked === 'on'){
                        setTICKETMASTER(prevState => ({
                            ...prevState,
                            url:e.target.value
                        }));
                    };
                    }}
                    value={TICKETMASTER.url}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    options={statusOptions}
                    label={{ children: 'Status', htmlFor: 'form-select-control-status' }}
                    placeholder='Status'
                    search
                    searchInput={{ id: 'form-select-control-status' }}
                    onChange={e=>{
                        if(e.target.children.length != 0){
                            setStatus(e.target.children[0].innerHTML);
                        }
                    }}
                />
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
                <Form.Field>
                    <label>Zdjęcie lokalizacji {props.location.state===undefined?'':props.location.state.event.location.picture}</label>
                    <input type="file" onChange={e=>setLocationPicture(e.target.files[0])}></input>
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
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
                <Form.Field
                    id='form-input-control-PromoterName'
                    control={Input}
                    label='Nazwa organizatora'
                    placeholder='Nazwa organizatora'
                    onChange={e=>setPromoterName(e.target.value)}
                    value={promoterName}
                />
                <Form.Field
                    id='form-input-control-PromoterLink'
                    control={Input}
                    label='Link Organizatora'
                    placeholder='Link Organizatora'
                    onChange={e=>setPromoterLink(e.target.value)}
                    value={promoterLink}
                />
                <Form.Field>
                    <label>Zdjęcie organizatora {props.location.state===undefined||props.location.state.event.promoter===undefined?'':props.location.state.event.promoter.picture}</label>
                    <input type="file" onChange={e=>setPromoterPicture(e.target.files[0])}></input>
                </Form.Field>

                {/*            </Form.Group>
            <Form.Group widths='equal'>*/}
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    options={promotionOptions}
                    label={{ children: 'Status Promowania', htmlFor: 'form-select-control-promotion' }}
                    placeholder='Promowanie'
                    search
                    searchInput={{ id: 'form-select-control-promotion' }}
                    onChange={e=>{
                        if(e.target.children.length != 0){
                            setPromotion(e.target.children[0].innerHTML);
                        }
                    }}
                />
                <Form.Field
                    id='form-input-control-color'
                    control={Input}
                    label='Kolor'
                    placeholder='kolor'
                    onChange={e=>setColor(e.target.value)}
                    value={color}
                />
                <Form.Field
                    id='form-input-control-category'
                    control={Input}
                    label='kategoria'
                    placeholder='Kategoria'
                    onChange={e=>setCategory(e.target.value)}
                    value={category}
                />
            </Form.Group>
            <Form.Field
                id='form-textarea-control-tags'
                control={TextArea}
                label='Tagi (tagi podawać po #)'
                placeholder='Tagi'
                onChange={e=>setTags(e.target.value)}
                value={tags}
            />
    <Button.Group >
        <Button negative onClick={()=>deleteLocation()}>delete</Button>
        <Button.Or />
        <Button positive onClick={()=>{console.log(props.location.state.event._id);funkcja(props.location.state.event._id,
            props.location.state.event.location._id,link,title,subtitle,startDate, hour, price, kupBilecik,BILETINPL,BILETY24PL,EVENTIMPL,BILETOMATPL,EWEJSCIOWKIPL,TICKETMASTER,
            status, locationName,locationStreet,locationPostalCode,locationCity,locationPicture,locationSEOType,locationLongitude,locationLatitude,
            promoterName,promoterLink,promoterPicture, picture, promotion, color, category, tags)}}>Update</Button>
    </Button.Group>

        </Form>

    )
}

export default EditEvent2;

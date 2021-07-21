import React, { useState } from 'react';
import trackerApi from '../api/tracker';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';


const Alert = () =>{
    const history = useHistory();
    const funkcja = async(link,title,subtitle,data, hour, price, kupBilecik,BILETINPL,BILETY24PL,EVENTIMPL,BILETOMATPL,EWEJSCIOWKIPL,TICKETMASTER,
                          status, locationName,locationStreet,locationPostalCode,locationCity,locationPicture,locationSEOType,locationLongitude,locationLatitude,
                          promoterName,promoterLink,promoterPicture, picture, promotion, color, category, tags) =>{
        addToTicketArr();
        await trackerApi.post('/events', {
            "evenID":"Dodane ręcznie",
            "link": link,
            "title": title,
            "subtitle": subtitle,
            "data": new Date(data).toISOString().split('T')[0],
            "hour": new Date(hour).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
            "price": price,
            "urls": addToTicketArr(),
            "status": status,
            "locationName": locationName,
            "locationStreet": locationStreet,
            "locationPostalCode": locationPostalCode,
            "locationCity": locationCity,
            "locationPicture": locationPicture.name,
            "locationSEOType": locationSEOType,
            "locationLongitude": locationLongitude,
            "locationLatitude": locationLatitude,
            "promoterName": promoterName,
            "promoterLink": promoterLink,
            "promoterPicture": promoterPicture.name,
            "picture": picture.name,
            "promotion": promotion,
            "color": color,
            "category": category,
            "tags": tags.split('#').filter(item=>item!=='')  //do sprawdzenia
        }).then(res=>res.status===200?notify():alert("Coś poszło nie tak"))
    }
    const notify = () => {
        alert("Dodano Event");
        history.push('');
    }

    const sendTestPicture = async()=>{
        let arr = [];
        arr.push(picture);
        arr.push(promoterPicture);
        arr.push(locationPicture)
        for(let i=0;i<arr.length;i++) {
            if(arr[i]==='')
                continue
            let fd = new FormData();
            fd.append('name', arr[i].name);
            fd.append('file', arr[i])
            await axios.post('http://localhost:5000/file/upload', fd);
        }
    }

    const getXML = ()=>{
        // id + description dodac do bazy
        const file = xml
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = ()=>{
/*            EWEJSCIOWKIPL  tu wszystko jasne znow jest description czyli jakis opis wydarzenia */
/*            let json = JSON.parse(reader.result);
            setTitle(json[0].title)*/

            let parseString = require('xml2js').parseString;
            parseString(reader.result, function (err, result) {
                //id trzeba poddowac

                console.dir(result)

                //Biletomat.pl
/*                const res = result.response.events[0].resource[0]
                setTitle(res.name[0])
                setPicture(res.facebook_poster[0]) //? obrazek wyrozniajacy?
                //tutaj znowu te daty trzeba je dodac?
                setLocationName(res.place_name[0])
                setLocationStreet(res.place_address[0])
                setLocationCity(res.place_city[0])
                //opis wydarzenia
                setPrice(res.price[0])
                setLink(res.tickets_url[0]) //to samo, gdzie ten link
                setPromoterName(res.promotor_name[0])*/


                //to jest Biletin
/*                const res = result.export.events[0].event[0]
                setStartDate(new Date(res.dates[0].show_event_date[0])) // tutaj jest jakies end i start date
                setLink(res.url[0]) //tutaj trzeba pomyslec, zeby ddoac url ze to jest ten biletin i tak we wszystkcih, ale najpierw ogarnac co i jak z tymi urlami
                setLocationName(res.name[0])
                setLocationStreet(res.localization[0].street[0])
                setLocationPostalCode(res.localization[0].post_code[0])
                setPrice(parseInt(res.tickets[0].price_min[0],10)) //zmienic price na stringa ---*/

                /*To jest www.bilety24.pl desciption na pewno dodatkowo */
/*                const res = result.bilety24.events[0].event[0]
                setTitle(res.title[0])
                setSubtitle(res.pricevariants[0].pricevariant[0].name[0])
                setStartDate(new Date(res.date[0]));
                //setOpis(res.description[0]);
                setLocationCity(res.place[0].city[0])
                setLocationPostalCode(res.organizer[0].postcode[0])
                const geoArr = res.place[0].google_coordinates[0].split(',')
                setLocationLatitude(geoArr[0])
                setLocationLongitude(geoArr[1])
                setPicture(res.images[0].img[0])
                setLink(res.urls[0].buy[0])
                setPrice(parseInt(res.pricevariants[0].pricevariant[0].price[0],10))
                setPromoterName(res.organizer[0].company[0])*/





/*                To jest kupBilecik tu tez byl description i czym jest name2
                const res = result.events.event[0]
/!*                console.dir(res)*!/
                setSubtitle(res.Name[0]);
                console.log(res.Name[0])
                setStartDate(new Date(res.Date[0]));
                setTitle(res.Artist[0].Person)
                setLocationCity(res.City[0])
                setLocationName(res.Object[0].Name)
                setLocationPostalCode(res.Object[0].Code)
                setLocationLongitude(res.Object[0].Location[0].Long)
                setLocationLatitude(res.Object[0].Location[0].Lat)
                setPrice(parseInt(res.TicketsInfo[0].Price[0],10))
                setLink(res.Link[0])*/




            });


        }

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
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());
    const [price, setPrice] = useState('')
    const [kupBilecik, setKupBilecik] = useState({clicked:'off',url:''});//Tutaj jeszcze dodac, ze to jest kupBilecik
    const [BILETINPL, setBILETINPL] = useState({clicked:'off',url:''});
    const [BILETY24PL, setBILETY24PL] = useState({clicked:'off',url:''});
    const [EVENTIMPL, setEVENTIMPL] = useState({clicked:'off',url:''});
    const [BILETOMATPL, setBILETOMATPL] = useState({clicked:'off',url:''});
    const [EWEJSCIOWKIPL, setEWEJSCIOWKIPL] = useState({clicked:'off',url:''});
    const [TICKETMASTER, setTICKETMASTER] = useState({clicked:'off',url:''});
    const [status, setStatus] = useState('');
    const [locationName, setLocationName] = useState('');
    const [locationStreet, setLocationStreet] = useState('');
    const [locationPostalCode, setLocationPostalCode] = useState('');
    const [locationCity, setLocationCity] = useState('');
    const [locationPicture, setLocationPicture] = useState('');
    const [locationSEOType, setLocationSEOType] = useState('');
    const [locationLongitude, setLocationLongitude] = useState('');
    const [locationLatitude, setLocationLatitude] = useState('');
    const [promoterName, setPromoterName] = useState('');
    const [promoterLink, setPromoterLink] = useState('');
    const [promoterPicture, setPromoterPicture] = useState('');
    const [picture, setPicture] = useState('');
    const [promotion, setPromotion] = useState('');
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [xml, setXml] = useState('')

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
                    <label>Zdjęcie wyrózniające</label>
                    <input type="file" onChange={e=>setPicture(e.target.files[0])}></input>
                </Form.Field>
            </Form.Group>
            <Form.Group grouped>
                    <Form.Field onClick={()=>{
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
                        }
                    } label='KUPBILECIK' control='input' type='checkbox' />
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
            />
{/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
                <Form.Field onClick={()=>{
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
                }
                }   label='BILETIN.PL' control='input' type='checkbox' />
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
                />
{/*            </Form.Group>
            <Form.Group grouped >*/}
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
                }  label='BILETY24.PL' control='input' type='checkbox' />
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
                />
{/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
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
                }label='EVENTIM.PL' control='input' type='checkbox' />
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
                />
{/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
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
                } label='BILETOMAT.PL' control='input' type='checkbox' />
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
                />
{/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
                <Form.Field onClick={()=>{
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
                } label='EWEJSCIOWKI.PL' control='input' type='checkbox' />
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
                />
{/*            </Form.Group>
            <Form.Group grouped style={{display: 'flex'}}>*/}
                <Form.Field onClick={()=>{
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
                }  label='TICKETMASTER' control='input' type='checkbox' />
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
                    <label>Zdjęcie lokalizacji</label>
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
                    <label>Zdjęcie organizatora</label>
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
                    id='form-input-control-first-name'
                    control={Input}
                    label='Kolor'
                    placeholder='kolor'
                    onChange={e=>setColor(e.target.value)}
                    value={color}
                />
                <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    label='kategoria'
                    placeholder='Kategoria'
                    onChange={e=>setCategory(e.target.value)}
                    value={category}
                />
            </Form.Group>
            <Form.Field
                id='form-textarea-control-opinion'
                control={TextArea}
                label='Tagi (tagi podawać po #)'
                placeholder='Tagi'
                onChange={e=>setTags(e.target.value)}
                value={tags}
            />

            <Button type='submit' onClick={()=>{sendTestPicture();funkcja(link,title,subtitle,startDate, hour, price, kupBilecik,BILETINPL,BILETY24PL,EVENTIMPL,BILETOMATPL,EWEJSCIOWKIPL,TICKETMASTER,
                status, locationName,locationStreet,locationPostalCode,locationCity,locationPicture,locationSEOType,locationLongitude,locationLatitude,
                promoterName,promoterLink,promoterPicture, picture, promotion, color, category, tags)}}>Wyślij</Button>
        </Form>

    )
}

export default Alert

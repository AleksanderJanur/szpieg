import React, { useState,useEffect, useContext} from 'react';
import trackerApi from '../api/tracker';
import { Input, Label, Menu,Dropdown } from 'semantic-ui-react'
import {Context as EventContext} from '../context/EventContext';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const EditEvent = ()=>{
    const [activeItem, setActiveItem] = useState('inbox')
    const history = useHistory();
    const handleClick = (event) => history.push('/editEventSend',{event});
    const [event, setEvent] = useState(null)
    const [sortBy, setSortBy] = useState('')
    const {state, fetchEvents} = useContext(EventContext);
    const [searchQuery, setSearchQuery] = React.useState('');
    useEffect(() => {
        fetchEvents();
    }, []);



    return (
        <Menu vertical style={{width:'100%'}}>
            <Menu.Item>
                <Menu text>
                    <Menu.Item header>Sort By</Menu.Item>
                    <Menu.Item
                        name='Tytuł'
                        active={sortBy === 'title'}
                        onClick={(e, {name}) => setSortBy('title')} //pozmieniac tak jak tutaj
                    />
                    <Menu.Item
                        name='PodTytuł'
                        active={sortBy === 'subtitle'}
                        onClick={(e, {name}) => setSortBy('subtitle')}
                    />
                    <Menu.Item
                        name='Data'
                        active={sortBy === 'data'}
                        onClick={(e, {name}) => setSortBy('data')}
                    />
                    <Menu.Item
                        name='Godzina'
                        active={sortBy === 'hour'}
                        onClick={(e, {name}) => setSortBy('hour')}
                    />
                    <Menu.Item
                        name='Cena'
                        active={sortBy === 'price'}
                        onClick={(e, {name}) => setSortBy('price')}
                    />
                    <Menu.Item
                        name='Status'
                        active={sortBy === 'status'}
                        onClick={(e, {name}) => setSortBy('status')}
                    />
                    <Menu.Item
                        name='Nazwa lokalizacji'
                        active={sortBy === 'locationName'}
                        onClick={(e, {name}) => setSortBy('locationName')}
                    />
                    <Menu.Item
                        name='Ulica lokalizacji'
                        active={sortBy === 'locationCity'}
                        onClick={(e, {name}) => setSortBy('locationCity')}
                    />
                    <Menu.Item
                        name='Kod pocztowy lokalizacji'
                        active={sortBy === 'locationPostalCode'}
                        onClick={(e, {name}) => setSortBy('locationPostalCode')}
                    />
                    <Menu.Item
                        name='SEOType lokalizacji'
                        active={sortBy === 'locationSEOType'}
                        onClick={(e, {name}) => setSortBy('locationSEOType')}
                    />
                    <Menu.Item
                        name='Długość geograficzna'
                        active={sortBy === 'locationLongitude'}
                        onClick={(e, {name}) => setSortBy('locationLongitude')}
                    />
                    <Menu.Item
                        name='Szerokość geograficzna'
                        active={sortBy === 'locationLatitude'}
                        onClick={(e, {name}) => setSortBy('locationLatitude')}
                    />
                    <Menu.Item
                        name='Nazwa ogranizatora'
                        active={sortBy === 'promoterName'}
                        onClick={(e, {name}) => setSortBy('promoterName')}
                    />
                    <Menu.Item
                        name='Link organizatora'
                        active={sortBy === 'promoterLink'}
                        onClick={(e, {name}) => setSortBy('promoterLink')}
                    />
                    <Menu.Item
                        name='Kategoria'
                        active={sortBy === 'category'}
                        onClick={(e, {name}) => setSortBy('category')}
                    />
                </Menu>
                <Input icon='search' placeholder='Search mail...' onChange={e=>{setSearchQuery(e.target.value);console.log(e.target.value)}}/>
            </Menu.Item>
            {
                state
                    .filter(item => searchQuery == ''||item[sortBy]===searchQuery)
                    .map((item,i) => (

                <Menu.Item
                key={i}
                name={'updates'}
                active={activeItem === 'updates'}
                onClick={()=>handleClick(item)}  /*wysylamy iteam dalej*/
                >
                    <div>Link : <span style={{color:"blue",fontWeight: "bold"}}>{item.link}</span></div><div>Tytuł : <span style={{color:"blue",fontWeight: "bold"}}>{item.title}</span></div><div>
                    Podtytuł : <span style={{color:"blue",fontWeight: "bold"}}>{item.subtitle}</span></div><div>Data : <span style={{color:"blue",fontWeight: "bold"}}>{new Date(item.data).toISOString().split('T')[0]}</span></div><div>
                    Godzina : <span style={{color:"blue",fontWeight: "bold"}}>{new Date(item.hour).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span></div><div>
                    Cena :  <span style={{color:"blue",fontWeight: "bold"}}>{item.price}</span></div><div> Status : <span style={{color:"blue",fontWeight: "bold"}}>{item.status}</span></div><div> Nazwa Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.name}</span></div><div>
                    Ulica Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.street}</span></div><div> Kod pocztowy Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.postalCode}</span></div><div>
                    Miasto Lokalizacji :<span style={{color:"blue",fontWeight: "bold"}}>{item.location.city}</span></div><div> Zdjecie lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.picture}</span></div><div>
                    SEOType Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.SEOType}</span></div><div>  Długość geograficzna : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.longitude}</span></div><div>
                    Szerokość geograficzna : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.latitude}</span></div><div>
                    Zdjecie ogolne : <span style={{color:"blue",fontWeight: "bold"}}>{item.picture}</span></div><div> Kolor : <span>{item.color}</span></div><div>  Kategoria : <span style={{color:"blue",fontWeight: "bold"}}>{item.category}</span></div>
                </Menu.Item>
                ))
            }
        </Menu>

    )
}
export default EditEvent;

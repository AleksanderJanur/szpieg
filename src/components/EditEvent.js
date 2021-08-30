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
                  <div>Link : <span style={{color:"blue",fontWeight: "bold"}}>{item.link}</span> Tytuł : <span style={{color:"blue",fontWeight: "bold"}}>{item.title}</span>
                      Podtytuł : <span style={{color:"blue",fontWeight: "bold"}}>{item.subtitle}</span> Data : <span style={{color:"blue",fontWeight: "bold"}}>{new Date(item.data).toISOString().split('T')[0]}</span>
                      Godzina : <span style={{color:"blue",fontWeight: "bold"}}>{new Date(item.hour).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span>
                      Cena :  <span style={{color:"blue",fontWeight: "bold"}}>{item.price}</span> Status : <span style={{color:"blue",fontWeight: "bold"}}>{item.status}</span> Nazwa Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationName}</span>
                      Ulica Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationStreet}</span> Kod pocztowy Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationPostalCode}</span>
                      Miasto Lokalizacji :<span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationCity}</span> Zdjecie lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationPicture}</span>
                      SEOType Lokalizacji : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationSEOType}</span>  Długość geograficzna : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationLongitude}</span>
                      Szerokość geograficzna : <span style={{color:"blue",fontWeight: "bold"}}>{item.location.locationLatitude}</span> Nazwa organiztora : <span style={{color:"blue",fontWeight: "bold"}}>{item.promoter.promoterName}</span>
                      Link organizatora :<span style={{color:"blue",fontWeight: "bold"}}>{item.promoter.promoterLink}</span> Zdjecie organizatora :  <span style={{color:"blue",fontWeight: "bold"}}>{item.promoter.promoterPicture}</span>
                      Zdjecie ogolne : <span style={{color:"blue",fontWeight: "bold"}}>{item.picture}</span> Kolor : <span>{item.color}</span>  Kategoria : <span style={{color:"blue",fontWeight: "bold"}}>{item.category}</span></div>
                </Menu.Item>
                ))
            }
        </Menu>

    )
}
export default EditEvent;

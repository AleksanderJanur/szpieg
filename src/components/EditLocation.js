import React, { useState,useEffect, useContext} from 'react';
import trackerApi from '../api/tracker';
import { Input, Label, Menu,Dropdown } from 'semantic-ui-react'
import {Context as LocationContext} from '../context/LocationContext';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const EditLocation = ()=>{
    const [activeItem, setActiveItem] = useState('inbox')
    const history = useHistory();
    const handleClick = (event) => history.push('/editLocationSend',{event});
    const [sortBy, setSortBy] = useState('')
    const {state, fetchLocations} = useContext(LocationContext);
    const [searchQuery, setSearchQuery] = React.useState('');
    useEffect(() => {
        fetchLocations();
    }, []);



    return (
        <Menu vertical style={{width:'100%'}}>
            <Menu.Item>
                <Menu text>
                    <Menu.Item header>Sort By</Menu.Item>
                    <Menu.Item
                        name='Nazwa'
                        active={sortBy === 'name'}
                        onClick={(e, {name}) => setSortBy('name')} //pozmieniac tak jak tutaj
                    />
                    <Menu.Item
                        name='Ulica'
                        active={sortBy === 'street'}
                        onClick={(e, {name}) => setSortBy('street')}
                    />
                    <Menu.Item
                        name='Kod pocztowy'
                        active={sortBy === 'postalCode'}
                        onClick={(e, {name}) => setSortBy('postalCode')}
                    />
                    <Menu.Item
                        name='Miasto'
                        active={sortBy === 'city'}
                        onClick={(e, {name}) => setSortBy('city')}
                    />
                    <Menu.Item
                        name='Zdjęcie'
                        active={sortBy === 'picture'}
                        onClick={(e, {name}) => setSortBy('picture')}
                    />
                    <Menu.Item
                        name='SEOPType'
                        active={sortBy === 'SEOPType'}
                        onClick={(e, {name}) => setSortBy('SEOPType')}
                    />
                    <Menu.Item
                        name='longitude'
                        active={sortBy === 'longitude'}
                        onClick={(e, {name}) => setSortBy('longitude')}
                    />
                    <Menu.Item
                        name='latitude'
                        active={sortBy === 'latitude'}
                        onClick={(e, {name}) => setSortBy('latitude')}
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
                            name={'Lokalizacje'}
                            active={activeItem === 'Lokalizacje'}
                            onClick={()=>handleClick(item)}  /*wysylamy iteam dalej*/
                        >
                           <div>Nazwa : <span style={{color:"blue",fontWeight: "bold"}}>{item.name}</span>, Ulica : <span style={{color:"blue",fontWeight: "bold"}}>{item.city}</span>
                           , Kod pocztowy : <span style={{color:"blue",fontWeight: "bold"}}>{item.postalCode}</span>, Miasto : <span style={{color:"blue",fontWeight: "bold"}}>{item.city}</span>, SEOTYPE
                           : <span style={{color:"blue",fontWeight: "bold"}}>{item.SEOType}</span>, Długość geograficzna : <span style={{color:"blue",fontWeight: "bold"}}>{item.longitude}</span>
                           , Szerokość geograficzna : <span style={{color:"blue",fontWeight: "bold"}}>{item.latitude}</span></div>
                        </Menu.Item>
                    ))
            }
        </Menu>


    )
}
export default EditLocation;

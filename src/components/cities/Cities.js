import React, {useContext, useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Select } from 'semantic-ui-react'
import '../newEvents/NewEventsStyle.css'
import {Context as EventContext} from "../../context/EventContext";
import {
  Link, useParams
} from "react-router-dom";
const countryOptions = [
{ key: 'af', value: 'af', text: 'Afghanistan' },
{ key: 'ax', value: 'ax', text: 'Aland Islands' },
{ key: 'al', value: 'al', text: 'Albania' },
{ key: 'dz', value: 'dz', text: 'Algeria' },
{ key: 'as', value: 'as', text: 'American Samoa' },
{ key: 'ad', value: 'ad', text: 'Andorra' },
{ key: 'ao', value: 'ao', text: 'Angola' },
{ key: 'ai', value: 'ai', text: 'Anguilla' },
{ key: 'ag', value: 'ag', text: 'Antigua' },
{ key: 'ar', value: 'ar', text: 'Argentina' },
{ key: 'am', value: 'am', text: 'Armenia' },
{ key: 'aw', value: 'aw', text: 'Aruba' },
{ key: 'au', value: 'au', text: 'Australia' },
{ key: 'at', value: 'at', text: 'Austria' },
{ key: 'az', value: 'az', text: 'Azerbaijan' },
{ key: 'bs', value: 'bs', text: 'Bahamas' },
{ key: 'bh', value: 'bh', text: 'Bahrain' },
{ key: 'bd', value: 'bd', text: 'Bangladesh' },
{ key: 'bb', value: 'bb', text: 'Barbados' },
{ key: 'by', value: 'by', text: 'Belarus' },
{ key: 'be', value: 'be', text: 'Belgium' },
{ key: 'bz', value: 'bz', text: 'Belize' },
{ key: 'bj', value: 'bj', text: 'Benin' },
]

const Cities = (props) => {
  const [city] = useState(["Kraków", "Warszawa", "Poznań", "Gdańsk","Szczecin", "Gdynia"]);
    const { name } = useParams();
    const {state} = useContext(EventContext);
/*    useEffect(() => {
        fetchEventsByCity(name)
    },[name]);*/
  return(
    <div className="cities">
    <Container>
        <Grid>
            <div className="imageBackgroundText hideMe1000">
              <div className="desktopNewEvents">
              <span className="cityText firstElem">{props.header}</span>
              {
                city.map((item,key)=>
                <a className="linksHref" href={`/${item.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")}`}><span className="cityText singleElem"> - {item}</span></a>
                )
              }
              </div>
              {props.place==="footer" ?
              <div className="mobileNewEvents">
                 <Select className="newEventsSelect" placeholder='Wybierz miasto' options={countryOptions} />
              </div>
              :
              null
              }
            </div>

        </Grid>
    </Container>
    </div>
  )
}

export default Cities

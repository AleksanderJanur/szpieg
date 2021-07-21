import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Search, Grid, Header, Segment, Popup, Image } from 'semantic-ui-react'
import './ConcertStyle.css'
import {Link, useParams} from "react-router-dom";
import image from '../img/koncert1.jpg'


const Cities = (props) => {
  const [events] = useState(["Kraków", "Warszawa", "Poznań", "Gdańsk", "Gdynia", "Kraków"]);
  let { name } = useParams();
  return(
    <div className="">
    <Grid>
      <Grid.Column className="searchSidebar">
      <Header align="center" className="searchHeader" as='h3'>
        Wyszukiwarka
      </Header>
        <Search className="searchResults" noResultsMessage align="center" />
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column className="">
        <Header align="center" className="" as='h4'>
          Zobacz więcej wydarzeń
        </Header>


      {
        events.map((item,key)=> (
          <Popup className="popup" position="top left" content={item} trigger={<Image size="small"  className="sidebarImages" src={image} wrapped ui={false} />} />


      ))
      }
      </Grid.Column>
    </Grid>

    </div>
  )
}

export default Cities

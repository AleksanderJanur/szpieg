import React, {useContext, useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Search, Grid, Header, Segment, Popup, Image, Card} from 'semantic-ui-react'
import './ConcertStyle.css'
import {Link, useParams} from "react-router-dom";
import image from '../img/koncert1.jpg'
import {Context as EventContext} from "../../context/EventContext";
import Carousel from "react-multi-carousel";
import {Context as TitleContext} from "../../context/TitleContext";


const Cities = (props) => {
  const {state} = useContext(EventContext);
  const {state:stateT,fetchTitles} = useContext(TitleContext)
  const [events] = useState(["Kraków", "Warszawa", "Poznań", "Gdańsk", "Gdynia", "Kraków"]);
  let { name } = useParams();
  useEffect(() => {
    fetchTitles()
  }, []);
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
          stateT.slice(0,10)
              .map((item,i) => (
                  <a href={"/koncert/"+item.event[0].title}><Popup className="popup" position="top left" content={item.event[0].locationCity} trigger={<Image size="small"  className="sidebarImages" src={item.event[0].picture} wrapped ui={false} />} /> </a>
                  )
              )
        }
      </Grid.Column>
    </Grid>

    </div>
  )
}

export default Cities

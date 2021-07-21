import React, {useContext, useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Card, Image } from 'semantic-ui-react'
import './NewEventsStyle.css'
import {Link} from "react-router-dom";
import image from '../img/koncert1.jpg'
import {Context as BlogContext} from "../../context/EventContext";


const Events = (props) => {
  const {state, fetchEvents} = useContext(BlogContext);
  useEffect(() => {
    fetchEvents();
  }, []);
  const [events] = useState(["Kraków", "Warszawa", "Poznań", "Gdańsk", "Gdynia", "Kraków", "Warszawa", "Poznań", "Gdańsk", "Gdynia"]);
  return(
    <div className="Cities">
    <Container>


    <div className="imageBackgroundText">
        <Link className="linksHref" to={`/${props.header.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")}`}><span className="marginleft30 cityText firstElem">{props.header}</span></Link>
    </div>

    {props.seeMore!=false ?
    <Grid.Column  className="newEventsColumnRight seeMoreText">
    <div className="imageBackgroundText">
      <Link className="linksHref" to={`/${props.header.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")}`}><span className="marginleft30 cityText firstElem">{props.seeMore}</span></Link>
    </div>
    </Grid.Column>
    : null}


    <Grid columns={props.columns} doubling className="eventsGrid">
      <Grid.Row className={props.hideLast ? "rowNewEvents" : "" } >
      {
        events.map((item,key)=> key < props.items && (
        <Grid.Column>
        <Link to={"/koncert/"+item}>
          <Card className="newEventsCards">
          <Image size="tiny" bordered className="eventImage" src={image} wrapped ui={false} />
          <Card.Content>
          <Card.Meta>
            <span className='date'>09.07.2022</span>
          </Card.Meta>
            <Card.Header>{item}</Card.Header>

          </Card.Content>
            </Card>
            </Link>
        </Grid.Column>
      ))
      }

      </Grid.Row>
        {props.hr ? <hr/> : null }
    </Grid>
    </Container>
      <div onClick={()=>console.log(state)}>dupa</div>
    </div>
  )
}

export default Events

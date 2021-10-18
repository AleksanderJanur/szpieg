import React, {useContext, useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Card, Image } from 'semantic-ui-react'
import './NewEventsStyle.css'
import {Link} from "react-router-dom";
import image from '../img/koncert1.jpg'
import {Context as EventContext} from "../../context/EventContext";


const Events = (props) => {
  const {state} = useContext(EventContext);
  console.log(props.header)
/*  useEffect(() => {
    fetchEvents()
  }, []);*/
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
                state.filter(elem=>props.header===elem.location.city||props.header==="Wszystkie wydarzenia")
                    .map((item,i)=> (
                        <Grid.Column>
                          <Link to={"/koncert/"+item.title}>
                            <Card className="newEventsCards">
                              <Image size="tiny" bordered className="eventImage" src={item.picture} wrapped ui={false} />
                              <Card.Content>
                                <Card.Meta>
                                  <span className='date'>{new Date(item.data).toISOString().split('T')[0]}</span>
                                </Card.Meta>
                                  <Card.Header>{ item.title.length > 20 ? item.title.substr(0, 20-1) + '..' : item.title}</Card.Header>

                              </Card.Content>
                            </Card>
                          </Link>
                        </Grid.Column>
                    ))
              }
              {
                state.slice(0,10).filter(index=>props.header==='Najnowsze wydarzenia')
                    .map((item,i) => (
                        <Grid.Column>
                          <Link to={"/koncert/"+item.title}>
                            <Card className="newEventsCards">
                              <Image size="tiny" bordered className="eventImage" src={item.picture} wrapped ui={false} />
                              <Card.Content>
                                <Card.Meta>
                                  <span className='date'>{new Date(item.data).toISOString().split('T')[0]}</span>
                                </Card.Meta>
                                  <Card.Header>{ item.title.length > 20 ? item.title.substr(0, 20-1) + '..' : item.title}</Card.Header>

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
      </div>
  )
}

export default Events

import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Image, Header } from 'semantic-ui-react'
import './PlacesStyle.css'
import {Link, useParams} from "react-router-dom";
import PlacesContent from './PlacesContent'
import Sidebar from '../concert/Sidebar'


const Cities = (props) => {
  let { name, tag } = useParams();
  const [page, setPage] = useState("")
  console.log(props)
  return(
    <div className="cities">
    <Container>
      <Grid>
        <Grid.Column width={15} className="concertHeaderColumn">
          <Header className="ConcertHeader" as='h2'>
            <Link className="ConcertLinks" to="/">{props.link1}</Link>
            <Link className="ConcertLinks"  itemprop="name" to={"/"+props.link2}>{props.link2}</Link>
            {name}{tag}
          </Header>
        </Grid.Column>
    </Grid>

    <Grid>
      <Grid.Column computer={11} mobile={16} className="noMargins">
          <PlacesContent allPlaces={props.allPlaces} content={page} image={props.image}/>
      </Grid.Column>
      <Grid.Column  computer={4} mobile={0} floated="right" className="sidebar">
        <Sidebar/>
      </Grid.Column>
    </Grid>
    </Container>

    </div>
  )
}

export default Cities

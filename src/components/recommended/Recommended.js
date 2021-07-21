import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import 'semantic-ui-css/semantic.min.css'
import { Container, Card,  Image } from 'semantic-ui-react'
import "react-multi-carousel/lib/styles.css";
import './RecommendedStyle.css'
import {  useParams } from "react-router-dom";
import image from '../img/koncert1.jpg'
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1200, min: 1000 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 1000, min: 0 },
    items: 1
  }
};
const Events = (props) => {
  const [events] = useState(["Kraków", "Warszawa", "Poznań", "Gdańsk", "Gdynia", "Kraków", "Warszawa", "Poznań", "Gdańsk", "Gdynia"]);
  let { city } = useParams();
  {city ? city=city : city=""}
  return(
    <div className="Recommended">
    <Container>
    <div className="imageBackgroundText">
      <span className="cityText marginleft30 recommendedText">{props.header + city}</span>
    </div>
    <Carousel centerMode={true} responsive={responsive}>
    {
      events.map((item,key)=>
      <div className="marginright15">
      <a href="/#">
        <Card className="RecommendedCards">
        <Image size="tiny" bordered className="recommendedImage" src={image} wrapped ui={false} />
        <Card.Content>
        <Card.Meta>
        </Card.Meta>
          <Card.Header>{item}</Card.Header>

        </Card.Content>
          </Card>
          </a>
      </div>
      )
    }
    </Carousel>
    </Container>
    </div>
  )
}

export default Events

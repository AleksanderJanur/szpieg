import React, {useContext, useState} from 'react';
import Carousel from "react-multi-carousel";
import 'semantic-ui-css/semantic.min.css'
import { Container, Card,  Image } from 'semantic-ui-react'
import "react-multi-carousel/lib/styles.css";
import './RecommendedStyle.css'
import {  useParams, Link } from "react-router-dom";
import image from '../img/koncert1.jpg'
import {Context as EventContext} from "../../context/EventContext";
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
  const {state} = useContext(EventContext);
  {city ? city=city : city=""}
  return(
    <div className="Recommended">
    <Container>
    <div className="imageBackgroundText">
      <span className="cityText marginleft30 recommendedText">{props.header + city}</span>
    </div>
    <Carousel centerMode={true} responsive={responsive}>
    {
      state.slice(0,10)
          .map((item,i) => (
      <div className="marginright15">
      <Link to={"/koncert/"+item.title}>
        <Card className="RecommendedCards">
        <Image size="tiny" bordered className="recommendedImage" src={item.picture} wrapped ui={false} />
        <Card.Content>
          <Card.Meta>
            <span className='date'>{new Date(item.data).toISOString().split('T')[0]}</span>
          </Card.Meta>

          <Card.Header>{ item.title.length > 30 ? item.title.substr(0, 30-1) + '..' : item.title}</Card.Header>

        </Card.Content>
          </Card>
          </Link>
      </div>
      )
          )
    }
    </Carousel>
    </Container>
      {console.log(state,"lfdsafda")}
    </div>
  )
}

export default Events

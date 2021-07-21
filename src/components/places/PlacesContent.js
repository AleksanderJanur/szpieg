import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Image, Header, Step, Card, Pagination } from 'semantic-ui-react'
import './PlacesStyle.css'
import {Link, useParams} from "react-router-dom";
import concertImage from '../img/koncert1.jpg'
import NewEvents from '../newEvents/NewEvents'
import image from '../img/koncert1.jpg'

const Cities = (props) => {
  let Tags = ["Tag1", "Tag2", "Tag3", "Tag4"]
  let Tickets = [
    {
      date: "24/07/2022, 19:00",
      city: "Kraków",
      place: "Amfiteatr w Kołobrzegu – Kołobrzeg",
      price: "Bilety od 35PLN"
    },
    {
      date: "24/07/2022, 19:00",
      city: "Kraków",
      place: "Amfiteatr w Kołobrzegu – Kołobrzeg",
      price: "Bilety od 35PLN"
    },
    {
      date: "24/07/2022, 19:00",
      city: "Kraków",
      place: "Amfiteatr w Kołobrzegu – Kołobrzeg",
      price: "Bilety od 35PLN"
    },
  ]
  let { name } = useParams();
  const [events] = useState(["Port Lotniczy Poznań Ławica – Poznań", "Port Lotniczy Poznań Ławica – Poznań", "Port Lotniczy Poznań Ławica – Poznań", "Port Lotniczy Poznań Ławica – Poznań", "Port Lotniczy Poznań Ławica – Poznań", "Port Lotniczy Poznań Ławica – Poznań", "Port Lotniczy Poznań Ławica – Poznań",]);
  console.log(props);
  return(
      <div className="contentConcert">
      {
        props.allPlaces==false ?
        <Grid className="">
          <Grid.Column  className="placesContent concertHeaderColumn concert ">
        <Header className="" as='h1'>
            Bonnie Tyler | Koncert
        </Header>
        <Header className="" as='h4'>
        Jednym z ważnych obiektów architektonicznych w centrum miasta jest zespół budynków dawnej Elektrowni Łódzkiej, obecnie instytucja kultury działająca pod nazwą „EC1 Łódź – Miasto Kultury” w Łodzi.

  Zrewitalizowany i rozbudowany kompleks wschodni EC1 pełni funkcje kulturalno–artystyczne oraz społeczne. Jednocześnie stanowi ważny element Nowego Centrum Łodzi, łącząc tendencje architektoniczne z początku ubiegłego stulecia oraz nowoczesnego nurtu postindustrialnego.

  W założeniu EC1 to przestrzeń otwarta dla artystów różnych dziedzin i przystosowana do twórczości indywidualnej, warsztatów oraz imprez grupowych, z wymaganą do tego celu infrastrukturą. Przestrzeń, z której mogą korzystać instytucje organizujące imprezy kulturalno–edukacyjne dla mieszkańców Łodzi i nie tylko.
  Centrum Nauki i Techniki EC1
  Największe centrum nauki w Polsce! Na ponad 8 tys. m2 czeka 150 eksponatów, liczne gry zespołowe i niesamowite przestrzenie.
        </Header>
        <hr class="light"/>
        <Header className="" as='h2'>Miejsce:
        </Header>
        <p>EC1 – Łódź</p>
  <p>ul. Targowa 1/3</p>
  <p>90-022 Łódź</p>

  </Grid.Column>
  </Grid>
  :
  <div>
  <Grid columns={2} doubling className="placesGrid">
    <Grid.Row >
    {
      events.map((item,key)=> (
      <Grid.Column>
      <Link to={"/miejsca/"+item}>
        <Card className="placesCard">
        {
          props.allPlaces=="places"? null : <Image  className="tagImage" src={image} wrapped ui={false} />

        }
        <Card.Content>
          <Card.Header>{item}</Card.Header>
          <hr class="light"/>
          <Card.Meta>
            <span className='date'>Hala Parkowa w Katowicach usytuowana jest przy ul. T. Kościuszki 90 w sąsiedztwie wieży spadochronowej w parku im. T. Ko... <a className="blue" href="#">Czytaj więcej</a></span>
          </Card.Meta>
        </Card.Content>
          </Card>
          </Link>
      </Grid.Column>
    ))
    }
    </Grid.Row>
    <Grid.Row>
      <Pagination className="center"
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
      />

    </Grid.Row>
    </Grid>
</div>
      }
    {
      name ?
      <Grid  className="">
        <Grid.Column  className="concertHeaderColumn">
          <Header className="headerComing" as='h2'>
          Nachodzące w tym miejscu <span class="border"></span>
          </Header>
          <NewEvents header={name} columns={3} items={5} hr={true}  hideLast={false} seeMore="Zobacz więcej"/>
        </Grid.Column>
      </Grid>
      :
      null
    }
      </div>
  )
}

export default Cities

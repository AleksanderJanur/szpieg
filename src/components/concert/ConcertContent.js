import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Image, Header, Step } from 'semantic-ui-react'
import './ConcertStyle.css'
import {Link, useParams} from "react-router-dom";
import concertImage from '../img/koncert1.jpg'



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
  console.log(props);
  return(
    <div className="">
    {props.image ? <Image fluid src={props.image} /> : <Image fluid src={concertImage} />}
    {props.content ?
      <div className="content" dangerouslySetInnerHTML={{__html: props.content}}></div>
        :
      <div className="contentConcert">
      <Header className="" as='h1'>
          Bonnie Tyler | Koncert
      </Header>
      <Header className="" as='h3'>
          Bonnie Tyler powraca w wielkim stylu do Polski! Gwiazda muzyki pop lat 70. i 80. zagra koncert w Amfiteatrze w Opolu
      </Header>
      <hr/>
      <Header className="" as='h4'>
          Bonnie Tyler znana jest z takich hitów, jak „Holding out for a Hero”, „If You Were a Woman (And I Was a Man)” czy „Total Eclipse of the Heart”. Artystce urodzonej w Walii światową popularność przyniósł utwór „It’s a Heartache” z 1978 r.
      </Header>

      <Header className="contentComingEvents" as='h3'>
          Nachodzące wydarzenia:
      </Header>
      {
        Tickets.map((item,key)=>(
          <div className="ticketsDiv">
          <Step.Group >
            <Step>
              <Step.Title>{item.date}</Step.Title>
            </Step>
            <Step>
              <Step.Title>{item.city}</Step.Title>
              <Step.Description>{item.place}</Step.Description>
            </Step>
            <Step>
              <Step.Title>{item.price}</Step.Title>
            </Step>
          </Step.Group>
            <Link to="/"><span className="ticketsBuy">KUP BILET bilety24</span></Link>
            <Link to="/"><span className="ticketsBuy">KUP BILET eventim</span></Link>
            <Link to="/"><span className="ticketsBuy">KUP BILET biletin</span></Link>
        </div>
      ))
      }
      <div className="lastEvents">
        <hr/>
        <Header className="lastEventsHeader" as='h2'>
          Minione wydarzenia
        </Header>
        <hr/>
      </div>



        <Header as='h4'>
          Tagi
        </Header>
        {
          Tags.map((item,key)=>(
              <Link to={"/tag/"+item}><span className="tags">{item}</span></Link>
        ))
        }
      </div>
    }





    </div>
  )
}

export default Cities

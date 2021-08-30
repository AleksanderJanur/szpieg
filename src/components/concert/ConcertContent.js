import React, {useContext, useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Image, Header, Step } from 'semantic-ui-react'
import './ConcertStyle.css'
import {Link, useParams} from "react-router-dom";
import concertImage from '../img/koncert1.jpg'
import {Context as EventContext} from "../../context/EventContext";



const Cities = (props) => {
  const {state, fetchEventsByTitle} = useContext(EventContext);
  console.log(props.header)
  const { name } = useParams();
  useEffect(() => {
    fetchEventsByTitle(name)
  },[name]);
  let Tags = ["Tag1", "Tag2", "Tag3", "Tag4"]
  console.log(props)
  return(
    <div className="">
    {state===undefined ? null : <Image fluid src={state[0].picture} /> }
    {props.content ?
      <div className="content" dangerouslySetInnerHTML={{__html: props.content}}></div>
        :
      <div className="contentConcert">
      <Header className="" as='h1'>
        {state[0].title}
      </Header>
      <Header className="" as='h3'>
          Bonnie Tyler powraca w wielkim stylu do Polski! Gwiazda muzyki pop lat 70. i 80. zagra koncert w Amfiteatrze w Opolu
        Trzeba dodac ten desciption
      </Header>
      <hr/>
      <Header className="" as='h4'>
          Bonnie Tyler znana jest z takich hitów, jak „Holding out for a Hero”, „If You Were a Woman (And I Was a Man)” czy „Total Eclipse of the Heart”. Artystce urodzonej w Walii światową popularność przyniósł utwór „It’s a Heartache” z 1978 r.
          A tu to juz nie wiem co trza.
      </Header>

      <Header className="contentComingEvents" as='h3'>
          Nachodzące wydarzenia:
      </Header>
      {
        state.map((item,i)=>(
          <div className="ticketsDiv">
          <Step.Group >
            <Step>
              <Step.Title>{new Date(item.data).toISOString().split('T')[0]}</Step.Title>
            </Step>
            <Step>
              <Step.Title>{item.location.city}</Step.Title>
              <Step.Description>{item.location.name}</Step.Description>
            </Step>
            <Step>
              <Step.Title>{item.price}</Step.Title>
            </Step>
          </Step.Group>
            {
              item.urls.map((value,key)=>(
                  <Link to={value.url}><span className="ticketsBuy">KUP BILET {value.name}</span></Link>
              ))}
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




      <div onClick={()=>console.log(state)}>dupa</div>
    </div>
  )
}

export default Cities

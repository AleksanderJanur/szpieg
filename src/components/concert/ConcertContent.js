import React, {useContext, useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Image, Header, Step } from 'semantic-ui-react'
import './ConcertStyle.css'
import {Link, useParams} from "react-router-dom";
import concertImage from '../img/koncert1.jpg'
import {Context as EventContext} from "../../context/EventContext";



const ConcertContent = (props) => {
  const {state} = useContext(EventContext);
  console.log(props.header)
  const { name } = useParams();
  /*  useEffect(() => {
      fetchEventsByTitle(name)
    },[name]);*/
  let Tags = ["Tag1", "Tag2", "Tag3", "Tag4"]
  console.log(props)
  return(
      <div className="">
        {state[0]===undefined ? null : <Image fluid src={state[0].picture} /> }
        {props.content ?
            <div className="content" dangerouslySetInnerHTML={{__html: props.content}}></div>
            :
            <div className="contentConcert">
              <Header className="" as='h1'>
                {state[0]===undefined? null:state[0].title}
              </Header>
              <Header className="" as='h3'>
                {state[0]===undefined||state[0].subtitle===undefined?null:state[0].subtitle}
              </Header>
              <hr/>
              {state[0]===undefined||state[0].description===undefined?
              null
                  :
                <div className="" as='h4' dangerouslySetInnerHTML={{__html: state[0].description}}>

                </div>
              }


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
                          <Step.Title>{item.price} zł</Step.Title>
                        </Step>
                      </Step.Group>
                      {
                        item.urls.map((value,key)=>(
                            <a target="_blank" href={value.url}><span className="ticketsBuy">KUP BILET {value.name}</span></a>
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
              {console.log(state)}
            </div>
        }





      </div>
  )
}

export default ConcertContent

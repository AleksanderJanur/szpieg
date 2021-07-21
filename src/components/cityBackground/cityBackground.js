import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './cityBackgroundStyle.css'
import { Container, Grid,  Image } from 'semantic-ui-react'
import {
  Link, useParams
} from "react-router-dom";
import itemsBig from '../img/itemsBig.png'
import Background from '../img/szpieg-wroclaw.jpg'

const Cities = (props) => {
  let { city } = useParams();
  return(
    <div className="">
          <div className="divBackgroundImage">
          <div className="shadowBackground"></div>
          <div className="textBackground">
            <div className="imageBackgroundBig">
              <span className="cityTextBig marginleft30 recommendedText">{city}</span>
            </div>
          </div>
            <Image className="imgBackground" src={Background} wrapped ui={false} />
          </div>
    </div>
  )
}

export default Cities

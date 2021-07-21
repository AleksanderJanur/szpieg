import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Image } from 'semantic-ui-react'
import './NavbarStyle.css'
import logo from '../img/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faLinkedinIn, faInstagram  } from "@fortawesome/free-brands-svg-icons"
import {
  Link, useParams
} from "react-router-dom";


const Navbar = () => {
  //let { dupa } = useParams();
  return (
    <div className="navbar">
    <Container>
        <Grid >
          <Grid.Column  className="navbarGrid" floated='left' width={4}>
            <Link to="/"><Image src={logo} className="logo" /></Link>
          </Grid.Column>
          <Grid.Column floated='right' className="rightSide" width={8}>
          <div className="imageBackground">
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
          <div className="imageBackground">
            <FontAwesomeIcon className="in" icon={faLinkedinIn} />
          </div>
          <div className="imageBackground">
            <FontAwesomeIcon className="ig" icon={faInstagram} />
          </div>
          </Grid.Column>
        </Grid>
    </Container>
    </div>
  )
}


export default Navbar

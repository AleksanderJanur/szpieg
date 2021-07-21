import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Image } from 'semantic-ui-react'
import './FooterStyle.css'
import logo from '../img/logoBlack.png'
import Cities from '../cities/Cities'
import {Link} from "react-router-dom";
const Footer = () => (
  <div className="footer">
  <Container>
  <Grid className="footerRow margintop20" >
    <Grid.Row className="footerRow">
      <Grid.Column width={3}>
      <a href="/#"><Image src={logo} /></a>

      </Grid.Column>
      <Grid.Column width={13}>
      <Link className="footerLinks" to="/o-szpiegu">o szpiegu</Link>
      <Link className="footerLinks" to="/reklama">reklama </Link>
      <Link className="footerLinks" to="/polityka-prywatnosci">polityka prywatności</Link>
        <div className="footerCities">
          <Cities place="footer" header="Wydarzenia: " />
        </div>

      </Grid.Column>
    </Grid.Row>
    </Grid>
    <Grid className="footerRow">
    <Grid.Row>
      <Grid.Column>
© 2020 Szpieg Kulturalny | PIK.plus | Wszelkie prawa zastrzeżone. | Ta strona korzysta z ciasteczek. Korzystanie ze strony oznacza, że zgadzasz się na ich użycie.
      </Grid.Column>
    </Grid.Row>
    </Grid>
  </Container>
  </div>
)

export default Footer

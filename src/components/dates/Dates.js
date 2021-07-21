import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Select } from 'semantic-ui-react'
import '../newEvents/NewEventsStyle.css'
import {Link, useParams} from "react-router-dom";


const Cities = (props) => {
  const [city] = useState(["Lipiec 2021", "Sierpień 2021", "Wrzesień 2021", "Październik 2021"]);
  return(
    <div className="cities">
    <Container>
        <Grid>

              <div className="desktopNewEvents">
              {
                city.map((item,key)=>
                  <Link className="linksHref" to="/"><span className="cityText singleElem">{item} - </span></Link>
                )
              }
            </div>
        </Grid>
    </Container>
    </div>
  )
}

export default Cities

import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './components/alert';
import Panel from './components/panel';
import EditEvent from './components/EditEvent';
import EditEvent2 from './components/EditEvent2';
import Promotion from "./components/Promotion";
import XMLImporter from "./components/XMLImporter";
import TagManager from "./components/TagManager";
import 'semantic-ui-css/semantic.min.css'
import {Provider as EventProvider} from './context/EventContext';
import {Provider as LocationProvider} from './context/LocationContext';
import {Provider as TitleProvider} from './context/TitleContext';
import { BrowserRouter as Router,Switch, Route, Link,HashRouter } from 'react-router-dom';
import EditLocation from "./components/EditLocation";
import EditLocation2 from "./components/EditLocation2";
import './main.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Cities from './components/cities/Cities';
import NewEvents from './components/newEvents/NewEvents';
import Recommended from './components/recommended/Recommended';
import CityBackground from './components/cityBackground/cityBackground';
import Dates from './components/dates/Dates';
import Concert from './components/concert/Concert';
import Places from './components/places/Places';
import GetEvents from "./api/GetEvents";
import GetEventsByTitle from "./api/GetEventsByTitle";
import GetEventsByCity from "./api/GetEventsByCity";
import reportWebVitals from './reportWebVitals';
import o_szpieguImage from './components/img/czesc-jestem-szpiegiem.jpg'
import {useParams} from "react-router";
ReactDOM.render(
  <React.StrictMode>
      <EventProvider>
          <LocationProvider>
              <TitleProvider>
                  <HashRouter>
                <Router>

                    <Switch>
                        <Route exact path="/panelAdmin" component={Panel} />
                        <Route path="/editEvent" component={EditEvent} />
                        <Route path="/editEventSend" component={EditEvent2} />
                      <Route path="/manualImport" component={Alert} />
                      <Route path="/promotion" component={Promotion} />
                      <Route path="/XMLImporter" component={XMLImporter} />
                      <Route path="/tagManager" component={TagManager} />
                      <Route path="/editLocation" component={EditLocation} />
                      <Route path="/editLocationSend" component={EditLocation2} />

                      <Route exact path="/">
                          <Navbar />
                          <GetEvents />
                          <Cities place="footer" header="Wybierz miasto:"/>
                          <NewEvents header="Najnowsze wydarzenia" columns={5} items={10} hr={false} hideLast={true} seeMore={false} />
                          <Recommended header="Polecane"/>
                          <NewEvents header="Kraków" columns={5} items={5} hr={true}  hideLast={false}  seeMore="Zobacz więcej"/>
                          <NewEvents header="Warszawa" columns={5} items={5} hr={true}  hideLast={false} seeMore="Zobacz więcej"/>
                          <NewEvents header="Poznań" columns={5} items={5} hr={true}  hideLast={false} seeMore="Zobacz więcej"/>
                          <NewEvents header="Katowice" columns={5} items={5} hr={true}  hideLast={false} seeMore="Zobacz więcej"/>
                          <NewEvents header="Szczecin" columns={5} items={5} hr={true}  hideLast={false} seeMore="Zobacz więcej"/>
                          <NewEvents header="Gdańsk" columns={5} items={5} hr={true}  hideLast={false} seeMore="Zobacz więcej"/>
                          <Footer />
                      </Route>

                      <Route path="/miejsca/:name">
                          <Navbar/>
                          <Cities place="events" header="Wybierz miasto:"/>
                          <Places allPlaces={false} link1="Strona główna - " link2="Miejsca - " image=" "/>
                          <Footer />
                      </Route>
                      <Route path="/tag/:tag">
                          <Navbar/>
                          <Cities place="events" header="Wybierz miasto:"/>
                          <Places allPlaces="tag" link1="Strona główna - " link2="" image=" "/>
                          <Footer />
                      </Route>
                      <Route path="/miejsca">
                          <Navbar/>
                          <Cities place="events" header="Wybierz miasto:"/>
                          <Places allPlaces="places" link1="Strona główna - " link2="Miejsca" image=" "/>
                          <Footer />
                      </Route>
                      <Route path="/koncert/:name">
                          <Navbar/>
                          <GetEventsByTitle />
                          <Cities place="events" header="Wybierz miasto:"/>
                          <Concert link1="Strona główna - " link2="Koncert - "/>
                          <Footer />
                      </Route>
                      <Route  path="/reklama">
                          <Navbar/>
                          <Cities place="events" header="Wybierz miasto:"/>
                          <Concert page="reklama" link1="Strona główna - " link2="reklama " image=" "/>
                          <Footer />
                      </Route>
                      <Route path="/o-szpiegu">
                          <Navbar/>
                          <Cities place="events" header="Wybierz miasto:"/>
                          <Concert page="o-szpiegu" link1="Strona główna - " link2="o-szpiegu" image={o_szpieguImage}/>
                          <Footer />
                      </Route>
                      <Route path="/polityka-prywatnosci">
                          <Navbar/>
                          <Cities place="events" header="Wybierz miasto:"/>
                          <Concert page="polityka-prywatnosci" link1="Strona główna - " link2="polityka-prywatnosci" image=" "/>
                          <Footer />
                      </Route>

                      <Route path="/:city">
                          <Navbar/>
                          <GetEventsByCity />
                          <Cities place="events" header="Wybierz miasto:"/>
                          <CityBackground/>
                          <Recommended header="Wydarzenia polecane - " />
                          <Dates/>
                          <NewEvents header="Wszystkie wydarzenia" columns={5} items={5} hr={true}  hideLast={false} seeMore={false}/>
                          <Footer />
                      </Route>
                  </Switch>


              </Router>
                  </HashRouter>

{/*          <EditEvent/>
    <EditEvent />
      <img
          src="http://localhost:5000/file/1626048804494-any-name-pobrane.jpg"
          alt="new"
      />*/}
              </TitleProvider>
          </LocationProvider>
      </EventProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

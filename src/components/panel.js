import React, { useState,useEffect, useContext} from 'react';
import trackerApi from '../api/tracker';
import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Search,
    Segment,
} from 'semantic-ui-react'
import EditEvent from './EditEvent';
import { useHistory } from 'react-router-dom';
const Panel = ()=>{
    useEffect(() => {
        const getTags = async()=> {await trackerApi.get('/')}
        getTags().then(response=>console.log(response));

    }, []);
    const history = useHistory();
    const handleClick = (url) => history.push(url);
    return(
        <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='add' />
                            Import ręczny
                        </Header>
                        <Button onClick={()=>handleClick('/manualImport')} primary>Create</Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='add' />
                            Import xmla
                        </Header>
                        <Button onClick={()=>handleClick('/XMLImporter')} primary>Create</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='world' />
                            Promowanie
                        </Header>
                        <Button onClick={()=>handleClick('/promotion')}  primary>Create</Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='edit' />
                            Edycja eventów
                        </Header>
                        <Button onClick={()=>handleClick('/editEvent')} primary>Edit</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='tags' />
                            Dodanie tagów
                        </Header>
                        <Button onClick={()=>handleClick('/tagManager')} primary>Create</Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='edit' />
                            Edycja lokalizacji
                        </Header>
                        <Button onClick={()=>handleClick('/editLocation')} primary>Edit</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

    )
}
export default Panel

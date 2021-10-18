import React, {useContext, useEffect, useState} from 'react';
import {Context as EventContext} from "../context/EventContext";

const GetEvents = () => {
    const {fetchEvents} = useContext(EventContext);
    useEffect(() => {
        fetchEvents()
    }, []);
    return null
}

export default GetEvents

import React, {useContext, useEffect, useState} from 'react';
import {Context as EventContext} from "../context/EventContext";
import {useParams} from "react-router-dom";

const GetEventsByCity = () => {
    const { city } = useParams();
    const {fetchEventsByCity} = useContext(EventContext);
    useEffect(() => {
        fetchEventsByCity(city)
    }, []);
    return null
}

export default GetEventsByCity

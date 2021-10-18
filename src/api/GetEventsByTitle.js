import React, {useContext, useEffect, useState} from 'react';
import {Context as EventContext} from "../context/EventContext";
import {useParams} from "react-router-dom";

const GetEventsByTitle = () => {
    const { name } = useParams();
    const {fetchEventsByTitle} = useContext(EventContext);
    useEffect(() => {
        fetchEventsByTitle(name)
    }, []);
    return null
}

export default GetEventsByTitle

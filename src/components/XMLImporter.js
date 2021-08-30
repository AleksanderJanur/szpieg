import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, Header, Icon, Segment} from 'semantic-ui-react'
import trackerApi from "../api/tracker";
import { useHistory } from 'react-router-dom';
import {Context as TitleContext} from '../context/TitleContext';

const XMLImporter = () => {
    const [xml,setXml]= useState(null);
    const history = useHistory();
    const [eventArr, setEventArr] = useState(new Set());
    const [locationArr, setLocationArr] = useState(new Set());
    const {state, fetchTitles} = useContext(TitleContext);
    useEffect(() => {
        fetchTitles();
    }, [eventArr]);

    const helpFun = ()=>{
        /*        for (let item of mySetJson){
                    if(!(eweMap.has(item.title))) {
                        eweMap.set(item.title, new Set())
                        eweMap.get(item.title).add(item)
                        continue;
                    }
                    else{
                        eweMap.get(item.title).add(item)
                    }
                }*/
        let arr = [];
        let myMap123 = new Map();
        for(let i=0;i<state.length;i++) {
            for (let j = 0; j < state[i].event.length; j++) {
                arr.push(state[i].event[j].locationRegex)
                if(!(myMap123.has(state[i].event[j].locationRegex+state[i].event[j].data))){
                    myMap123.set(state[i].event[j].locationRegex+state[i].event[j].data, new Set())
                    myMap123.get(state[i].event[j].locationRegex+state[i].event[j].data).add(state[i].event[j])
                    continue;
                }
                else{
                    myMap123.get(state[i].event[j].locationRegex+state[i].event[j].data).add(state[i].event[j])
                }

                /*            let helpSet = new Set();
                            for(let j=0;j<state[i].event.length;j++){
                                helpSet.add(state[i].event[j].urls[0].name)
                /!*                let helpSet = new Set();
                                for(let k=0;k<state[i].event[j].urls.length;k++){
                                    helpSet.add(state[i].event[j].urls[k].name)
                                }
                                if(helpSet.size>1){
                                    console.log(i,j,helpSet)
                                }*!/
                            }
                            if(helpSet.size>1){
                                console.log(i,helpSet)
                            }*/
            }


        }
        let count = 0;
        arr.sort()
        /*        console.log(arr)*/
        for (const [key, value] of myMap123) {
            count+=value.size;
            if(value.size>1){
                /*                console.log(key + ' = ' + array[0])*/
                console.log(key)
                for (let item of value){
                    console.log(item)
                }
                console.log("Next elem\n")
            }
        }
        console.log(count)
    }


    const addXml = async(arr) => {
        for (let myXml of arr) {
            //tutaj mam jeszcze location array, ale na razie nie jest mi on potrzebny(moze sie przydac)
            await trackerApi.post('/events',
                {
                    "added": "byXml",
                    "link": myXml.url,
                    "title": myXml.title,
                    "data": myXml.data,
                    "price": myXml.price,
                    "urls": myXml.urls,
                    "locationName": myXml.locationName,
                    "locationStreet": myXml.locationStreet,
                    "locationPostalCode": myXml.locationPostalCode,
                    "locationCity": myXml.locationCity,
                    "picture": myXml.picture,
                    "category": myXml.category,
                    "description": myXml.description,
                    "promoterName": myXml.promoterName === undefined ? "" : myXml.promoterName,
                    "locationLongitude": myXml.locationLongitude === undefined ? "" : myXml.locationLongitude,
                    "locationLatitude": myXml.locationLatitude === undefined ? "" : myXml.locationLatitude,
                    "locationRegex": myXml.locationRegex,
                    "type": myXml.type,
                    "artist": myXml.artist === undefined ? "" : myXml.artist,
                    "addedDate":new Date()
                }
            ).then(res => res.status === 200 ? console.log("Event-Sukces") : alert("Coś poszło nie tak"))
        }
    }
    const addTitles = async(title, event)=>{
        await trackerApi.post('/titles',
            {
                "title":title,
                "event":event
            }
        ).then(res=>res.status===200?console.log("Suckes"):alert("Coś poszło nie tak"))
    }

    /*    const notify = () => {
            alert("Dodano Event");
            history.push('panelAdmin');
        }*/
    const getXML = ()=> {
        if (xml === null) {
            alert("Musisz wybrać xmla")
        }
        else {
            const file = xml
            const reader = new FileReader();
            reader.readAsText(file);
            console.log(file.name)
            reader.onload = () => {
                if (file.name.includes('.json')) {
                    /*EWEJSCIOWKIPL*/
                    let json = JSON.parse(reader.result);
                    console.log(json.filter(elem=>elem.genre==="Koncert"||elem.genre==="Opera"||elem.genre==="Muzyczny"))
                    let helpJson =''
                    let mySetJson = new Set();
                    let eweMap = new Map();
                    let eweLocationSet = new Set();
                    let checkArr5 =[];
                    for(let i =0; i < json.length;i++){
                        if(!(json[i].genre==="Koncert"||json[i].genre==="Opera"||json[i].genre==="Muzyczny")){
                            continue;
                        }
                        helpJson={
                            "link":json[i].reservationForm,
                            "title":json[i].title,
                            "data":json[i].date,
                            "price":json[i].price,
                            "locationName":json[i].venue.name,
                            "locationStreet": json[i].venue.name.address,
                            "locationCity": json[i].venue.city,
                            "locationLongitude": json[i].venue.longitude,
                            "locationLatitude": json[i].venue.latitude,
                            "picture": "https://ewejsciowki.pl"+json[i].posterUrl,
                            "description":json[i].description,
                            "urls":[{"url":json[i].reservationForm,"name":"EWEJSCIOWKIPL"}],
                            "locationRegex":json[i].venue.name.address===undefined?"":json[i].venue.name.address.replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ",""),
                            "type":json[i].specialEventType===undefined?json[i].genre:json[i].specialEventType,

                        }
                        if((!checkArr5.some(item=>item.data===helpJson.data && item.locarionRegex===helpJson.locationRegex && item.price===helpJson.price))){
                            checkArr5.push({"locationRegex":helpJson.locationRegex,"data":helpJson.data,"price":helpJson.price})
                        }
                        else{
                            continue;
                        }
                        mySetJson.add(helpJson)
                        eweLocationSet.add({"locationName":json[i].venue.name,
                            "locationStreet": json[i].venue.name.address,
                            "locationCity": json[i].venue.city,
                            "locationLongitude": json[i].venue.longitude,
                            "locationLatitude": json[i].venue.latitude,
                            "locationRegex":helpJson.locationRegex})
                    }
                    console.log(mySetJson)

                    addXml(mySetJson)
                    /*                    setLocationArr(eweLocationSet);*/
                    for (let item of mySetJson){
                        if(!(eweMap.has(item.title))) {
                            eweMap.set(item.title, new Set())
                            eweMap.get(item.title).add(item)
                            continue;
                        }
                        else{
                            eweMap.get(item.title).add(item)
                        }
                    }
                    console.log(eweMap)

                    for (const [key, value] of eweMap) {
                        let array = Array.from(value);
                        addTitles(key, array)
                    }

                }


                else {
                    let parseString = require('xml2js').parseString;
                    let res = ""
                    parseString(reader.result, function (err, result) {
                        let myJson = ''
                        switch (file.name) {
                            case "biletomat.xml":

                                //Biletomat.pl
                                res = result.response.events[0].resource
                                console.log(res.filter(elem=>!(elem.main_genre[0]==="Konferencje"||elem.main_genre[0]==="Dla dzieci"||elem.main_genre[0]==="Stand-up"
                                    ||elem.main_genre[0]===""||elem.main_genre[0]==="None"||elem.main_genre[0]==="Rekreacja"||elem.main_genre[0]==="Imprezy")))
                                let mySet2 = new Set();
                                let bileMap = new Map();
                                let bileLocationSet = new Set();
                                let count11 = 0;
                                let checkArr4 = [];
                                for (let i = 0; i < res.length; i++) {
                                    if(res[i].main_genre[0]==="Konferencje"||res[i].main_genre[0]==="Dla dzieci"||res[i].main_genre[0]==="Stand-up"
                                        ||res[i].main_genre[0]===""||res[i].main_genre[0]==="None"||res[i].main_genre[0]==="Rekreacja"||res[i].main_genre[0]==="Imprezy"){
                                        continue;
                                    }
                                    myJson = {
                                        "link": res[i].tickets_url[0],
                                        "title": res[i].name[0],
                                        "data": res[i].date_start[0],
                                        "hour": res[i].time_start[0],
                                        "price": res[i].price[0],
                                        "locationName": res[i].place_name[0],
                                        "locationStreet": res[i].place_address[0],
                                        "locationPostalCode": "",
                                        "locationCity": res[i].place_city[0],
                                        "picture": res[i].logo[0],
                                        "category": "",
                                        "description": res[i].description[0],
                                        "urls": [{"url": res[i].tickets_url[0], "name": "BILETOMATPL"}],
                                        "promoterName":res[i].promotor_name[0],
                                        "locationRegex":res[i].place_address[0].replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                            .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                            .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                            .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                            .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                            .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ",""),
                                        "type":res[i].main_genre[0],
                                        "artist":res[i].lineup[0],

                                    }
                                    if((!checkArr4.some(item=>item.data===myJson.data && item.locarionRegex===myJson.locationRegex && item.price===myJson.price))){
                                        checkArr4.push({"locationRegex":myJson.locationRegex,"data":myJson.data,"price":myJson.price})
                                    }
                                    else{
                                        continue;
                                    }
                                    mySet2.add(myJson)
                                    bileLocationSet.add({"locationName": res[i].place_name[0],
                                        "locationStreet": res[i].place_address[0],
                                        "locationPostalCode": "",
                                        "locationCity": res[i].place_city[0],
                                        "locationRegex":myJson.locationRegex
                                    })
                                    count11++

                                }
                                /*                                setLocationArr(bileLocationSet)
                                                                setEventArr(mySet2);*/
                                addXml(mySet2)
                                console.log(count11)
                                for (let item of mySet2){
                                    if(!(bileMap.has(item.title))) {
                                        bileMap.set(item.title, new Set())
                                        bileMap.get(item.title).add(item)
                                        continue;
                                    }
                                    else{
                                        bileMap.get(item.title).add(item)
                                    }
                                }
                                console.log(bileMap)

                                for (const [key, value] of bileMap) {
                                    let array = Array.from(value);
                                    addTitles(key, array)
                                }
                                console.log(mySet2);
                                //main_genre i name jest jako title a to po prostu artysta, ale chyba nie ma nic innego
                                break;
                            case "biletin.xml":
                                res = result.export.events[0].event
                                console.log(res)
                                let mySet3 = new Set();
                                let map3 = new Map();
                                let checkArr3 = [];
                                let biletinLocationSet = new Set();
                                for (let i = 0; i < res.length; i++){
                                    myJson = {
                                        "link": res[i].url,
                                        "title": res[i].name[0],
                                        "data": res[i].dates[0].show_event_date[0],
                                        "price": res[i].ticekts===undefined?0:res[i].tickets[0].price_max[0],
                                        "locationName": res[i].localization[0].name[0],
                                        "locationStreet": res[i].localization[0].street[0],
                                        "locationPostalCode": res[i].localization[0].post_code[0],
                                        "locationCity": res[i].localization[0].city[0],
                                        "picture": res[i].image_url[0],
                                        "category": res[i].category[0],
                                        "description":res[i].description[0],
                                        "urls":[{"url":res[i].url[0],"name":"BILETINPL"}],
                                        "locationRegex":res[i].localization[0].street[0].replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                            .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                            .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                            .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                            .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                            .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ",""),
                                        "type":res[i].type[0],

                                    }
                                    if((!checkArr3.some(item=>item.data===myJson.data && item.locarionRegex===myJson.locationRegex && item.price===myJson.price))){
                                        checkArr3.push({"locationRegex":myJson.locationRegex,"data":myJson.data,"price":myJson.price})
                                    }
                                    else{
                                        continue;
                                    }
                                    mySet3.add(myJson)
                                    biletinLocationSet.add({
                                        "locationName": res[i].localization[0].name[0],
                                        "locationStreet": res[i].localization[0].street[0],
                                        "locationPostalCode": res[i].localization[0].post_code[0],
                                        "locationCity": res[i].localization[0].city[0],
                                        "locationRegex":myJson.locationRegex})
                                    //type
                                    /*                                    if((!biletinHelpArr.some(item=>item.data===myJson.data && item.locationName===myJson.locationName))) {
                                                                            biletinHelpArr.push({"data":myJson.data,"locationName":myJson.locationName})
                                                                            addXml(myJson);
                                                                        }*/
                                    //jescze jest type
                                    /*                                    console.log(mySet3)*/
                                }

                                /*                                setEventArr(mySet3);
                                                                setLocationArr(biletinLocationSet)*/
                                addXml(mySet3)

                                for (let item of mySet3){
                                    if(!(map3.has(item.title))) {
                                        map3.set(item.title, new Set())
                                        map3.get(item.title).add(item)
                                        continue;
                                    }
                                    else{
                                        map3.get(item.title).add(item)
                                    }
                                }
                                /*                                console.log(map3)*/

                                for (const [key, value] of map3) {
                                    let array = Array.from(value);
                                    addTitles(key, array)
                                }



                                break;

                            case "bilety24.xml":
                                res = result.bilety24.events[0].event
                                myJson = ''
                                let mySet = new Set();
                                let map2 = new Map();
                                let locationCheckSet = new Set();
                                let tmp = 0;
                                let checkArr2 = [];
                                let biletyLocationSet = new Set();
                                let flag = true;
                                console.log(res.filter(item=>item.type_name[0]==="Koncert"||item.type_name[0]==="Opera"))
                                for (let i = 0; i < res.length; i++) {
                                    if(!(res[i].type_name[0]==="Koncert"||res[i].type_name[0]==="Opera")){
                                        continue
                                    }
                                    let geoArr = res[i].place[0].google_coordinates[0].split(',')
                                    locationCheckSet.add(res[i].place[0].street[0].replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                        .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                        .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                        .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                        .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                        .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ","")
                                    )

                                    tmp++
                                    if(tmp!==locationCheckSet.size){
                                        tmp=locationCheckSet.size;
                                        flag=false;
                                    }
                                    else{
                                        flag=true;
                                    }
                                    myJson = {
                                        "link": res[i].urls[0].buy[0],
                                        "title": res[i].title[0],
                                        "data": res[i].date[0],
                                        "price": res[i].pricevariants[0].pricevariants===undefined?null:res[i].pricevariants[0].pricevariant[0].name[0],
                                        "locationName": res[i].place[0].name[0],
                                        "locationStreet": res[i].place[0].street[0],
                                        "locationPostalCode": res[i].place[0].postcode[0],
                                        "locationCity": res[i].place[0].city[0],
                                        "picture": res[i].images[0].img[0],
                                        "category": res[i].type_name[0],
                                        "description": res[i].description[0],
                                        "urls": [{"url": res[i].urls[0].buy[0], "name": "BILETY24PL"}],
                                        "promoterName": res[i].organizer[0].company[0],
                                        "locationLongitude": geoArr[1],
                                        "locationLatitude": geoArr[0],
                                        "locationRegex":res[i].place[0].street[0].replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                            .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                            .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                            .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                            .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                            .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ",""),
                                        "type":res[i].type_name[0],

                                    }
                                    if((!checkArr2.some(item=>item.data===myJson.data && item.locarionRegex===myJson.locationRegex && item.price===myJson.price))){
                                        checkArr2.push({"locationRegex":myJson.locationRegex,"data":myJson.data,"price":myJson.price})
                                    }
                                    else{
                                        continue;
                                    }
                                    mySet.add(myJson)
                                    biletyLocationSet.add({
                                        "locationName": res[i].place[0].name[0],
                                        "locationStreet": res[i].place[0].street[0],
                                        "locationPostalCode": res[i].place[0].postcode[0],
                                        "locationCity": res[i].place[0].city[0],
                                        "locationLongitude": geoArr[1],
                                        "locationLatitude": geoArr[0],
                                        "locationRegex": myJson.locationRegex
                                    })
                                }
                                /*                                setEventArr(mySet);
                                                                setLocationArr(biletyLocationSet)*/
                                addXml(mySet)

                                for (let item of mySet){
                                    if(!(map2.has(item.title))) {
                                        map2.set(item.title, new Set())
                                        map2.get(item.title).add(item)
                                        continue;
                                    }
                                    else{
                                        map2.get(item.title).add(item)
                                    }
                                }
                                console.log(map2)

                                for (const [key, value] of map2) {
                                    let array = Array.from(value);
                                    addTitles(key,array)
                                }
                                //type_name
                                break;
                            case "17-06-2021kupbilecik.xml":
                                res = result.events.event
                                console.log(res.filter(item=>item.Category[0].Type[0]==="muzyka"))
                                myJson = ''

                                let mySet4 = new Set();
                                let map1 = new Map();
                                let checkArr = [];
                                let bilecikLocationSet = new Set();
                                for (let i = 0; i < res.length; i++) {
                                    if(res[i].Category[0].Type[0]!=='muzyka'){
                                        continue
                                    }
                                    /*                                    checkSet.add({"locationRegex":res[i].Object[0].Address[0].replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                                                                .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                                                                .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                                                                .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                                                                .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                                                                .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ",""),
                                                                            "data":res[i].Date[0],"price":res[i].TicketsInfo[0].Price[0]})
                                                                        count++
                                                                        if(checkSet.size!==count){
                                                                            count=checkSet.size;
                                                                            continue;
                                                                        }*/
                                    myJson={
                                        "link": res[i].Link[0],
                                        "title": res[i].Name[0],
                                        "subtitle":res[i].Category[0].SubCategory[0].Name[0],
                                        "data": res[i].Date[0],
                                        "price":res[i].TicketsInfo[0].Price[0],
                                        "locationName": res[i].Object[0].Name[0],
                                        "locationStreet": res[i].Object[0].Address[0],
                                        "locationPostalCode": res[i].Object[0].Code[0],
                                        "locationCity": res[i].City[0],
                                        "locationLongitude": res[i].Object[0].Location[0].Long[0],
                                        "locationLatitude": res[i].Object[0].Location[0].Lat[0],
                                        "category": res[i].Category[0].Type[0],
                                        "description": res[i].Description[0],
                                        "picture":res[i].Images[0].Image[0],//do dodania jak to sie stalo w ogole?
                                        "urls": [{"url": res[i].Link[0], "name": "kupBilecik"}],
                                        "locationRegex":res[i].Object[0].Address[0].replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                            .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                            .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                            .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                            .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                            .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ",""),
                                        "artist":res[i].Artist[0].Name[0],
                                        "type":res[i].Category[0].Type[0],
                                    }
                                    if((!checkArr.some(item=>item.data===myJson.data && item.locarionRegex===myJson.locationRegex && item.price===myJson.price))){
                                        checkArr.push({"locationRegex":res[i].Object[0].Address[0].replaceAll("ul.","").replaceAll("al.","").replaceAll("/","")
                                                .replaceAll(".","").replaceAll("-","").replaceAll("św.","")
                                                .replaceAll("marsz.","").replaceAll("ł","l").replaceAll()
                                                .replace(/[0-9]/g, '').toLowerCase().normalize("NFD")
                                                .replace(/\p{Diacritic}/gu, "").replace(/( a)$/,"").replace(/( b)$/,"").replace(/( c)$/,"")
                                                .replace(/( d)$/,"").replace(/( e)$/,"").replace(/( f)$/,"").replaceAll(" ",""),
                                            "data":res[i].Date[0],"price":res[i].TicketsInfo[0].Price[0]})
                                    }
                                    else{
                                        continue;
                                    }
                                    mySet4.add(myJson)
                                    bilecikLocationSet.add({
                                        "locationName": res[i].Object[0].Name[0],
                                        "locationStreet": res[i].Object[0].Address[0],
                                        "locationPostalCode": res[i].Object[0].Code[0],
                                        "locationCity": res[i].City[0],
                                        "locationLongitude": res[i].Object[0].Location[0].Long[0],
                                        "locationLatitude": res[i].Object[0].Location[0].Lat[0],
                                        "locationRegex":myJson.locationRegex})
                                }
                                /*                               setLocationArr(bilecikLocationSet);
                                                               setEventArr(mySet4);*/
                                addXml(mySet4)


                                for (let item of mySet4){
                                    if(!(map1.has(item.title))) {
                                        map1.set(item.title, new Set())
                                        map1.get(item.title).add(item)
                                        continue;
                                    }
                                    else{
                                        map1.get(item.title).add(item)
                                    }
                                }
                                /*                                console.log(map1)*/

                                for (const [key, value] of map1) {
                                    let array = Array.from(value);
                                    addTitles(key,array)
                                }

                                /*                                for (const value of map1.values()) {
                                                                    for (let item of value) {
                                /!*                                       addXml(item)*!/
                                                                    }
                                                                }*/

                                /*                                Tutaj mozna by bylo dodac event i reszte, ale czy to w sumie potrzebne???*/

                                //artist

                                break;
                        }
                    });


                }
            }

        }
    }
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='xml file outline'/>
                Dodaj xmla ze swojego komputera
            </Header>
            <Form.Group widths='equal'>
                <Form.Field>
                    <input type="file" onChange={e=>setXml(e.target.files[0])}></input>
                </Form.Field>
            </Form.Group>
            <Button type='submit' style={{marginTop:10}} onClick={()=>{getXML();}} primary>Dodaj xmla</Button>
            <div onClick={()=>{getXML()}}>dupa</div>
            <div onClick={()=>helpFun()}>dupa2</div>
            { state.map((item,i)=>(
                <div>{item.title}</div>
            ))

        }
        </Segment>
    )
}

export default XMLImporter;

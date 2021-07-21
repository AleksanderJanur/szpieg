import React, { useState,useEffect, useContext} from 'react';
import trackerApi from '../api/tracker';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'


const TagManager = ()=>{
    const [url, setUrl] = useState('');
    const [head, setHead] = useState('');
    const [body, setBody] = useState('')
    return(
        <Form>
                <Form.Field
                    id='form-input-control-first-name'
                    control={Input}
                    label='url'
                    placeholder='Url'
                />
                <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='head'
                    placeholder='head'
                />
                <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='body'
                    placeholder='body'
                />
            <Button type='submit' onClick={()=>console.log("ble")}>Wyślij</Button>
        </Form>
    )
}
export default TagManager;

import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const eventReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_events':
            return action.payload;

        case 'fetch_events_titles':
            return action.payload;

        case 'fetch_events_cities':
            return action.payload;

        default:
            return state;
    }
};
const fetchEvents = dispatch => async () => {
    const response = await trackerApi.get('/events');
    dispatch({ type: 'fetch_events', payload: response.data });
};
const fetchEventsByTitle = dispatch => async (title) => {
    const response = await trackerApi.get('/events/title/'+title);
    dispatch({ type: 'fetch_events_titles', payload: response.data });
};
const fetchEventsByCity = dispatch => async (city) => {
    const response = await trackerApi.get('/events/city/'+city);
    dispatch({ type: 'fetch_events_cities', payload: response.data });
};
const updateForm = dispatch => async ()=>{

}
export const { Provider, Context } = createDataContext(
    eventReducer,
    { fetchEvents, fetchEventsByTitle, fetchEventsByCity },
    []
);

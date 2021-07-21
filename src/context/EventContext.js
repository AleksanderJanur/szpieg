import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const eventReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_events':
            return action.payload;

        default:
            return state;
    }
};
const fetchEvents = dispatch => async () => {
    const response = await trackerApi.get('/events');
    dispatch({ type: 'fetch_events', payload: response.data });
};
const updateForm = dispatch => async ()=>{

}
export const { Provider, Context } = createDataContext(
    eventReducer,
    { fetchEvents },
    []
);

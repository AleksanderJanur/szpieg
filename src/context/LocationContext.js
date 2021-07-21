import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_locations':
            return action.payload;

        default:
            return state;
    }
};
const fetchLocations = dispatch => async () => {
    const response = await trackerApi.get('/locations');
    dispatch({ type: 'fetch_locations', payload: response.data });
};
const updateLocations= dispatch => async ()=>{

}
export const { Provider, Context } = createDataContext(
    locationReducer,
    { fetchLocations },
    []
);

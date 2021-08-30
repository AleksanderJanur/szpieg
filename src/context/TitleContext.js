import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const titleReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_titles':
            return action.payload;

        default:
            return state;
    }
};
const fetchTitles = dispatch => async () => {
    const response = await trackerApi.get('/titles');
    dispatch({ type: 'fetch_titles', payload: response.data });
};
const updateTitles= dispatch => async ()=>{

}
export const { Provider, Context } = createDataContext(
    titleReducer,
    { fetchTitles },
    []
);

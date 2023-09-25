import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/favoritesReducer'; 

const store = createStore(rootReducer);

export default store;

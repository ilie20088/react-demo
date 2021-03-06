import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Movie from './containers/movie';
import PopularMovies from './containers/popular_movies';
import App from './components/app';
import GenreMovies from './containers/genre_movies';
import reducers from './reducers';
import createLogger from 'redux-logger';
import DevTools from './containers/dev_tools'


const logger = createLogger();
// const storeWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);


const enhancer = compose(
  applyMiddleware(ReduxPromise, ReduxThunk, logger),
  DevTools.instrument()
);
const store = createStore(reducers, enhancer);




ReactDOM.render(
  <Provider store={store/*storeWithMiddleware(reducers)*/}>
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  			<IndexRoute component={PopularMovies} />
  			<Route path="/movie/:id" component={Movie} />
  			<Route path="/genre/:id" component={GenreMovies} />
  		</Route>
  	</Router>
    
  </Provider>
  , document.querySelector('.container'));

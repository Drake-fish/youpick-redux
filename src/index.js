import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import Header from './routes/Header';
//redux
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import Result from './components/Result';
import EditPreference from './components/EditPreference';
import PreferencePage from './components/PreferencePage';
import LoadingComponent from './components/LoadingComponent';
import FoodLoader from './components/FoodLoader';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// authenticated component must be below login
ReactDOM.render(<Provider store = { store }>
                  <BrowserRouter>
                    <LoadingComponent>
                      <div>
                        <Header/>
                        <Switch>
                          <Route path="/login" component={Login} exact={true}/>
                          <Redirect from="/logout" to="/"/>
                          <Route path="/loadingFood" component={FoodLoader} exact={true}/>
                          <Route path="/results" component={Result} exact={true}/>
                          <Route path="/" component={App} exact={true}/>
                            <AuthenticatedComponent>
                              <Route path="/preferences/:id/edit" component={EditPreference} exact={true} />
                              <Route path="/preferences" component={PreferencePage} exact={true} />
                            </AuthenticatedComponent>
                        </Switch>
                      </div>
                    </LoadingComponent>
                  </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListFountain';
import ListStuffAdmin from '../pages/ListFountainAdmin';
import AddFountain from '../pages/AddFountain';
import Directory from '../pages/Directory';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Account from '../pages/Account';
import Signout from '../pages/Signout';
<<<<<<< HEAD
import Post from '../buildings/Post';
import Kuykendall from '../buildings/Kuykendall';
import Art from '../buildings/Art';
import Moore from '../buildings/Moore';
import Sinclair from '../buildings/Sinclair';
import Qlc from '../buildings/Qlc';
import Center from '../buildings/Center';
import Bilger from '../buildings/Bilger';
import Hamilton from '../buildings/Hamilton';
import Busad from '../buildings/Busad';
import Hig from '../buildings/Hig';
import Keller from '../buildings/Keller';
=======
import Map from '../pages/Map';
>>>>>>> 814a84b4660c0da23aaa3c44431dedb8a80e1625

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/account" component={Account}/>
              <ProtectedRoute path="/list" component={ListStuff}/>
              <ProtectedRoute path="/add" component={AddFountain}/>
              <ProtectedRoute path="/directory" component={Directory}/>
              <ProtectedRoute path="/map" component={Map}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route path="/post" component={Post}/>
              <Route path="/kuykendall" component={Kuykendall}/>
              <Route path="/art" component={Art}/>
              <Route path="/moore" component={Moore}/>
              <Route path="/sinclair" component={Sinclair}/>
              <Route path="/qlc" component={Qlc}/>
              <Route path="/center" component={Center}/>
              <Route path="/bilger" component={Bilger}/>
              <Route path="/hamilton" component={Hamilton}/>
              <Route path="/busad" component={Busad}/>
              <Route path="/hig" component={Hig}/>
              <Route path="/keller" component={Keller}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;

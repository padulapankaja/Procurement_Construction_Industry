
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { connect} from 'react-redux'
import indexRoutes from './Components/Routes/index'
import managerRoutes from './Components/Routes/manager.route'
import accountantRoutes from './Components/Routes/accountant.route'
import suplierRoutes from './Components/Routes/suplier.route'


class App extends React.Component {

    router = () => {
    let routes = indexRoutes;

   
    let checkSignedIn =  this.props.auth.isAuthenticated;
    let role = (checkSignedIn) ? this.props.auth.user.role : "";

    if(checkSignedIn == true ){
      routes = [ ...routes ];
    }

    if(checkSignedIn == true && role == 3){
     routes = [ ...managerRoutes, ...routes ];
    }

    if(checkSignedIn == true && role == 2){
     routes = [ ...accountantRoutes, ...routes ];
    }

    if(checkSignedIn == true && role == 0){
     routes = [ ...suplierRoutes, ...routes ];
    }
    return routes;
  } 

    render(){
        return(
            <Router >
            <Switch>
            { this.router().map((prop, key) => {
                return (
                <Route
                    path={prop.path}
                    key={key}
                    component={(props) => <prop.component    {...props} />}
                    exact={prop.exact ? true : false}

                />
                );
            })}
            </Switch>
        </Router>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth || {} ,
  });

export default connect(mapStateToProps)(App);
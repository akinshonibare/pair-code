// imports

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";
import { firebaseAuth, GITHUB_AUTH_PROVIDER } from "../../utils/firebase";
import { setUser } from "../../actions/info";
import { LOGIN_ROUTE, HOME_ROUTE } from "../../utils/routes";

// pages
import LandingPage from "../Landing";
import Dashboard from "../Dashboard";
import NotFound from "../NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authLoading: true
    };
  }

  componentDidMount() {
    // authorization observer
    this.authObserver = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let visitor = {};
        if (user.isAnonymous) {
          visitor["name"] = `anonymous`;
          visitor["email"] = `${user["uid"]}@codepair.com`;
          visitor["id"] = user["uid"];
          visitor[
            "photo"
          ] = `https://api.adorable.io/avatars/285/${user["uid"]}.png`;
        } else {
          visitor["name"] = user.providerData[0]["displayName"];
          visitor["email"] = user.providerData[0]["email"];
          visitor["id"] = user.providerData[0]["uid"];
          visitor["photo"] = user.providerData[0]["photoURL"];
        }
        this.props.setUser(visitor);
      }

      user ? this.props.history.push("/") : this.props.history.push("/login");
      this.setState({ authLoading: false });
    });
  }

  // github login function
  onGithubLoginClick = async () => {
    this.setState({ authLoading: true });
    try {
      await firebaseAuth.signInWithPopup(GITHUB_AUTH_PROVIDER);
    } catch (e) {
      console.error(e.message || "error authenticating user.");
      this.setState({ authLoading: false });
    }
  };

  // anonymouslogin function
  onAnonLoginClick = async () => {
    this.setState({ authLoading: true });
    try {
      await firebaseAuth.signInAnonymously();
    } catch (e) {
      console.error(e.message || "error authenticating user.");
      this.setState({ authLoading: false });
    }
  };

  // logout function
  onLogoutClick = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (e) {
      console.error(e.message || "error signing user out.");
    }
  };

  componentWillUnmount() {
    this.authObserver();
  }

  render() {
    const { authLoading } = this.state;

    return (
      <Switch>
        <Route
          exact
          path={HOME_ROUTE}
          render={props => (
            <Dashboard onLogoutClick={this.onLogoutClick} {...props} />
          )}
        />
        <Route
          exact
          path={LOGIN_ROUTE}
          render={props => (
            <LandingPage
              loading={authLoading}
              onGithubLoginClick={this.onGithubLoginClick}
              onAnonLoginClick={this.onAnonLoginClick}
              {...props}
            />
          )}
        />
        <Route exact path="/" render={props => <NotFound {...props} />} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.data.user
  };
}

const actions = {
  setUser
};

export default withRouter(connect(mapStateToProps, actions)(App));

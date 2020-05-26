import React, { Component } from "react";
import { Helmet } from "react-helmet"
import './App.sass';
import './Meow.sass';

class App extends Component {

  componentDidMount() {
    console.log(process.env.DB_HOST)
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>My Title123123</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <h1>My React App!</h1>
      </div>
  );
  }
}

export default App;
import * as React from "react";
import { Helmet } from "react-helmet"
import './App.sass';
import './Meow.sass';

function App(props) {

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

export default App;
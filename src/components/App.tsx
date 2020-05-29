import * as React from "react";
import { Helmet } from "react-helmet"
import './App.sass';
import './Meow.sass';

export const App: React.FC = () => {

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


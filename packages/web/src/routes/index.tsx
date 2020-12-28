import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterConnector from '../modules/register';


export const Routes: React.FC = () => {
    return <BrowserRouter>
        <Switch>
            <Route exact={true} path="/register" component={RegisterConnector} />
        </Switch>
    </BrowserRouter>
}
import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.sass';
import Tasks from './pages/Tasks';
import Stats from './pages/Stats';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";

function App() {

  return (
    <>

        <ButtonGroup variant="text" aria-label="text primary button group">

            <NavLink to="/tasks" activeClassName="active-link">
                <Button color='inherit'>TASKS</Button>
            </NavLink>
            <NavLink to="/stats" activeClassName="active-link">
                <Button color='inherit'>STATS</Button>
            </NavLink>

        </ButtonGroup>

    <div className='content'>
        <Switch>
            <Route path="/stats">
                <Stats />
            </Route>
            <Route path="/tasks">
                <Tasks />
            </Route>
            <Route path="/">
                <Tasks />
            </Route>
        </Switch>
    </div>

        </>
  );
}

export default App;

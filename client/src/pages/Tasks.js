import React from 'react';
import TextField from '@material-ui/core/TextField';
import func from '../functions.js';
import axios from 'axios';
import {NavLink, Route, Switch} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Stats from "./Stats";


function Tasks() {
    const [value, setValue] = React.useState('');
    const [tasks, setTasks] = React.useState([]);


    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);

    };

    function submitInput(e){
        e.preventDefault();
        console.log('submitted',value);

        const tagMention = value.search('#');

        const task = {
                content: tagMention !== -1 ? value.slice(0, tagMention) : value,
                status: 'pending',
                tag: tagMention !== -1 ? value.slice(tagMention + 1, value.length) : ''
            };

        func.addTask(task);

        console.log('task', task)

    }

    // function newTask(value){
    //     let tag = '';
    //     const tagMention = value.search('#');
    //
    //     if(tagMention !== -1) {
    //         tag = value.slice(tagMention + 1, value.length);
    //         value = value.slice(0, tagMention);
    //
    //         console.log('tag',tag)
    //     }
    //
    //     const task = {
    //         id: tasks.length = 0 ? idCount : idCount++,
    //         date: new Date(),
    //         content: value,
    //         status: 'pending',
    //         tag: tag
    //     };
    //
    //     return setTasks(tasks.concat(task));
    //
    // }

    React.useEffect(() => {
        axios.get('http://localhost:5000/get-data').then(
            res => {
                const tasks = res.data;
                console.log(tasks);
                setTasks(tasks);
            }
        )
    },[]);
    return (
        <>
            <div className="input">
                <form noValidate autoComplete="off" onSubmit={submitInput}>
                    <TextField
                               fullWidth={true}
                               id="standard-basic"
                               label="Add new task"
                               value={value}
                               onChange={handleChange}/>
                    <submit type="submit"/>
                </form>
            </div>

            <div className="tab-bar">
                <NavLink to="/tasks/pending" className="link-tab" activeClassName="active-link-tab">
                    <Button color='inherit' >pending</Button>
                </NavLink>
                <NavLink to="/tasks/done" activeClassName="active-link-tab">
                    <Button color='inherit'>done</Button>
                </NavLink>

            </div>

            <div className='grid'>
                <Switch>
                    <Route path="/tasks/pending">
                        {
                            tasks.map(x => x.status === 'pending' ? func.createCard(x): null)
                        }
                    </Route>
                    <Route path="/tasks/done">
                        {
                            tasks.map(x => x.status === 'done' ? func.createCard(x): null)
                        }
                    </Route>
                </Switch>


            </div>
        </>
    );
}

export default Tasks;

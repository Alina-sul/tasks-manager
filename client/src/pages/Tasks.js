import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import Card from "@material-ui/core/Card";


function Tasks() {
    const [value, setValue] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    const getData = () => {
        axios.get('http://localhost:5000/get-data').then(
            res => {
                const tasks = res.data;
                console.log(res.data)
                setTasks(tasks);
            }
        )
    };
    const addTask = (input) => {
        return axios
            .post('http://localhost:5000/add-task', input)
            };
    const createCard = (task) => {
            return <Card className='card'>
                <CardActionArea>
                    <CardContent>
                        {task.content}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton name={task._id} className={task.status === 'done' ? 'done-icon-active' : 'done-icon'}
                                aria-label="check"
                                status={`${task.status}`}
                                onClick={updateStatus}>
                    <DoneIcon name={task._id} status={task.status}/>
                    </IconButton>
                    <IconButton name={task._id}
                                className="delete-icon"
                                aria-label="delete"
                                onClick={removeTask}>
                        <ClearIcon name={task._id} />
                    </IconButton>
                    <span className="tag">
                        <i>{task.tag}</i>
                    </span>
                </CardActions>
            </Card>
    };
    const handleChangeInput = (event) => {
        setValue(event.target.value);
    };
    const submitInput = (e) => {
        e.preventDefault();
        console.log('submitted',value);
        const tagMention = value.search('#');
        const task = {
                content: tagMention !== -1 ? value.slice(0, tagMention) : value,
                status: 'pending',
                tag: tagMention !== -1 ? value.slice(tagMention + 1, value.length) : ''
            };

        if(value !== '') {
            addTask(task).then((response) =>
            {
                setTasks(tasks.concat([response.data]));
            })
                .catch(err => {
                    console.error(err);
                });
            setValue('');
        }

    };
    const removeTask = (e) => {
        const task = {id: e.target.name};
        setTasks(tasks.filter(x => x._id !== task.id));
        return axios
            .post('http://localhost:5000/remove-task', task)
            .then((res) => {
                console.log(res.data)
            })
    };
    const updateStatus = (e) => {
        const task = {
            id: e.target.attributes.name.value,
            status: e.target.attributes.status.value === 'pending' ? 'done' : 'pending'
        };
        const updatedArray = tasks.map((v) => {
            if (v._id === task.id) {v.status = task.status}
            return v
        });

        setTasks(updatedArray);

        return axios
            .post('http://localhost:5000/update-status', task)
            .then((res) => {
                console.log(res.data)
            })
    };

    React.useEffect(() => {
        getData()
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
                               onChange={handleChangeInput}/>
                    <submit type="submit"/>
                </form>
            </div>

            <div className="tab-bar">
                <NavLink to="/tasks/pending" className="link-tab" activeClassName="active-link-tab">
                    <Button color='inherit'>pending</Button>
                </NavLink>
                <NavLink to="/tasks/done" activeClassName="active-link-tab">
                    <Button color='inherit'>done</Button>
                </NavLink>

            </div>

            <div className='grid'>
                <Switch>
                    <Route path="/tasks/pending">
                        {
                            tasks.map(x => x.status === 'pending' ? createCard(x): null)
                        }
                    </Route>
                    <Route path="/tasks/done">
                        {
                            tasks.map(x => x.status === 'done' ? createCard(x): null)
                        }
                    </Route>
                    <Route path="/tasks">
                        <Redirect to="/tasks/pending" />
                    </Route>
                </Switch>


            </div>
        </>
    );
}

export default Tasks;

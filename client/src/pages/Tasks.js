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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Tasks() {
    const [value, setValue] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    const [task,setTask] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [pending, setPending] = React.useState(0);
    const [done, setDone] = React.useState(0);

    const getData = () => {
        axios.get('http://localhost:5000/get-tasks').then(
            res => {
                setTasks(res.data.data);
                setPending(res.data.pendingCount);
                setDone(res.data.doneCount)
            }
        )
    };
    const addTask = (input) => {
        setPending(pending + 1);
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
                                onClick={dialogHandleOpen}>
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
    const removeTask = () => {
        setOpen(false);
        setTasks(tasks.filter(x => x._id !== task.id));
        console.log(task);
        return axios
            .post('http://localhost:5000/remove-task', task)
            .then((res) => {
                console.log(res.data)
            })
    };
    const updateStatus = (e) => {
        const task = {
            id: e.target.attributes.name.value,
            status: e.target.attributes.status.value === 'pending' ? 'done'
                : 'pending'
        };

        if(task.status === 'pending') {setPending(pending+1); setDone(done-1)}
        else {setDone(done+1); setPending(pending-1)}

        const updatedArray = tasks.map((v) => {
            if (v._id === task.id) {v.status = task.status}
            return v
        });

        setTasks(updatedArray);

        return axios
            .put('http://localhost:5000/update-status', task)
            .then((res) => {
                console.log(res.data)
            })
    };
    const dialogHandleOpen = (e) => {
        setTask({id: e.target.attributes.name.value});
        setOpen(true);
    };
    const dialogHandleClose = () => {
        setOpen(false);
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
                    <Button color='inherit'>pending({pending})</Button>
                </NavLink>
                <NavLink to="/tasks/done" activeClassName="active-link-tab">
                    <Button color='inherit'>done({done})</Button>
                </NavLink>

            </div>

            <div className='grid'>
                <Switch>
                    <Route path="/tasks/pending">
                        {
                            tasks.map(x => x.status === 'pending' ? createCard(x) : null)
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

            <Dialog
                open={open}
                onClose={dialogHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure? The task will be gone forever :(
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogHandleClose} color="">
                        Close
                    </Button>
                    <Button onClick={removeTask} className="active-link" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Tasks;

import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import React from "react";

const func = {
    addTask: (task) => {
        axios
        .post('http://localhost:5000/add-task', task)
        .then(() => console.log(task))
        .catch(err => {
            console.error(err);
        })},
    createCard: (task) => {
        return <Card className='card'>

            <CardActionArea>
                <CardContent>
                    {task.content}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton className={task.status === 'done' ? 'done-icon-active' : 'done-icon'}
                            aria-label="check">
                    <DoneIcon />
                </IconButton>
                <IconButton className="delete-icon" aria-label="delete">
                    <ClearIcon />
                </IconButton>
                <span className="tag">
                    <i>{task.tag}</i>
                </span>
            </CardActions>
        </Card>
    },
};

export default func;

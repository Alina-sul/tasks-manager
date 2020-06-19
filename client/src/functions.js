import request from 'axios';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from "react";

const func = {
    createData: (data) => {request.post(
        `http://localhost:5000/create-data`, data
    ).then(r => console.log(r))},
    createCard: (task) => {
        return <Card className='card'>

            <CardActionArea>
                <CardContent>
                    {task.content}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="check">
                    <CheckCircleIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    },
};

export default func;

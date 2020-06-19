import React from 'react';
import TextField from '@material-ui/core/TextField';
import func from '../functions.js';
import axios from 'axios';

import {useQuery} from 'react-query';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function Tasks() {
    const [value, setValue] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    const { status, data, error } = useQuery("data",func.getData, {
        initialData:[]
    });


    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);

    };
    const createCard = (task) => {
        return <Card className='card'>
            <CardActionArea>
                <CardContent>
                    {task.content}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="#1b1b1b">
                    <FormControlLabel
                        control={<Checkbox checked={false} onChange={(e)=>console.log(e)} name="task.id" />}
                        label="Done"
                        labelPlacement="end"
                    />
                </Button>
            </CardActions>
        </Card>
    };

    function submitInput(e){
        e.preventDefault();
        console.log('submitted',value);

        let tag = '';
        const tagMention = value.search('#');

        if(tagMention !== -1) {
            tag = value.slice(tagMention + 1, value.length);
            setValue(value.slice(0, tagMention));
        }

        const task = {
                content: value,
                status: 'pending',
                tag: tag
            };



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
                console.log(tasks)
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
            <div className='grid'>
                {
                    tasks.map(x => func.createCard(x))
                }
            </div>
        </>
    );
}

export default Tasks;

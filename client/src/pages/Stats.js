import React from 'react';
import axios from 'axios';
import {CountUp} from "countup.js";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from "@material-ui/core/IconButton";

function Tags() {

    return (
        <>

        </>
    )
}

function Stats() {
    const [pending, setPending] = React.useState(0);
    const [done, setDone] = React.useState(0);
    const [tasks, setTasks] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [enable, setEnable] = React.useState(false);

    let penCnt = new CountUp('pending', pending);
    let doneCnt = new CountUp('done', done);
    let tagCnt = new CountUp('tags', tags.length);


    const getDataStats = async () =>
        await axios.get('http://localhost:5000/get-tasks');
        const handleClick = () => {
            setEnable(true)
        };

    React.useEffect(() => {
        getDataStats().then(async (res,err) => {
            if(err) console.log(err);
            setPending(res.data.pendingCount);
            setDone(res.data.doneCount);
            setTasks(res.data.data);
            setTags(res.data.tags);
            console.log(res.data.tags)
        });

    },[]);

    penCnt.start();
    doneCnt.start();
    tagCnt.start();

    return (
        <>
            <div className="stats-titles">
                <div className="stat-title">PENDING <span id="pending"/></div>
                <div className="stat-title">DONE <span id="done"/></div>
                <div className="stat-title">TAGS <span id="tags"/>
                <IconButton aria-label="drop" className="drop-btn" onClick={handleClick}>
                    <ArrowDropDownIcon />
                </IconButton>
                </div>
            </div>

            <div>
                <Tags />
            </div>

        </>
    );
}

export default Stats;

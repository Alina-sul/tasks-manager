import React from 'react';
import axios from 'axios';

function Stats() {
    const [pending, setPending] = React.useState(0);
    const [done, setDone] = React.useState(0);

    const getDataStats = async () =>
        await axios.get('http://localhost:5000/get-tasks');

    React.useEffect(() => {
        getDataStats().then((res,err) => {
            if(err) console.log(err);

        });
    },[]);

    return (
        <div>
            Hi I am stats
        </div>
    );
}

export default Stats;

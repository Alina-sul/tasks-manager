import React from 'react';
import TextField from '@material-ui/core/TextField';

function Tasks() {
    const something=(event)=> {
        if (event.keyCode === 13) {
            console.log('enter')
        }
    }

    return (
        <>
            <div className="input">
                <form noValidate autoComplete="off">
                    <TextField onKeyDown={(e) => something(e) } fullWidth={true} id="standard-basic" label="Add new task" />
                </form>
            </div>
        </>
    );
}

export default Tasks;

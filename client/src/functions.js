import request from 'axios';

const func = {
    getData: async (route) => {
        const {data} = await request.get(
            `http://localhost:5000/${route}`
        );
        return data;
    },
    createData: async (route) => {
        const {data} = await request.get(
            `http://localhost:5000/${route}`
        );
        return data;
    },
};

export default func;

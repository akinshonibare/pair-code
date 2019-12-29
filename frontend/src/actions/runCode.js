import axios from 'axios';

const runPythonCode = (code) => {
    return axios.post('/api/code/python', {code})
}

 export { runPythonCode }
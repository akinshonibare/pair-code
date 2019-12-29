import axios from 'axios';

const postFile = (data) => {
    return axios.post('/api/codefile/', data)
}

 export { postFile }
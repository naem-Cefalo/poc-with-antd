import axios from 'axios';

const getCandidates = async () => {
  const data = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

export default getCandidates;

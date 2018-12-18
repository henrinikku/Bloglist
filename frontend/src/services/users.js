import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject);
  return res.data;
};

export default {
  getAll,
  create,
};

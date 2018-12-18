import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const createComment = async (id, newComment) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(`${baseUrl}/${id}/comments`, newComment, config);
  return res.data;
};

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject);
  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default {
  getAll,
  setToken,
  create,
  createComment,
  update,
  deleteBlog,
};

/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
let token = null;

const blogs = [
  {
    author: "Testi Ukkeli",
    id: "5bec415cc66f262e1ccb1d21",
    likes: 11,
    title: "Testiotsikko",
    url: "http://www.esimerkki.fi",
  },
  {
    author: "Martin Fowler",
    id: "5bfd8f09dbe70e09ecaf2547",
    likes: 21,
    title: "Continuous integration",
    url: "https://martinfowler.com",
  },
];

const getAll = () => Promise.resolve(blogs);

const setToken = (newToken) => {
  token = newToken;
};

export default {
  getAll,
  blogs,
  setToken,
};

export default (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.filter;
    default:
      return state;
  }
};

export const setFilter = filter => (dispatch) => {
  dispatch({
    type: 'SET_FILTER',
    data: { filter },
  });
};

export default (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { message, type } = action.data;
      return { message, type };
    case 'UNSET_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let lastTimeout;

export const notify = (message, type, displayTime) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: { message, type },
  });

  if (lastTimeout) clearTimeout(lastTimeout);

  lastTimeout = setTimeout(() => {
    dispatch({ type: 'UNSET_NOTIFICATION' });
  }, displayTime * 1000);
};

export const unsetNotification = () => (dispatch) => {
  dispatch({
    type: 'UNSET_NOTIFICATION',
  });
};

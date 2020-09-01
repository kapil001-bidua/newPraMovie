import axios from 'axios';
import {fetchData, fetchSuccess, fetchError} from '../store/action/Actions';

const actionCreator = (url) => (dispatch) => {
  return new Promise(() => {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'secret-key':
            '$2b$10$Lp7zj4F3Un4QTExnLKmi3uZuXmx5gx2hbtoj2nmR8iF75RyVkxQd6',
        },
      })
      .then((response) => {
        dispatch(fetchSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  });
};

export default actionCreator;

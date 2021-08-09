import { getContent, session } from './';
export const RESET_ERROR = 'RESET_ERROR';
export const PRELOADED = 'PRELOADED';
export const ERROR = 'ERROR';

export function resetError() {
  return dispatch =>
    dispatch({
      type: RESET_ERROR,
      payload: [],
    });
}

export function preLoaded() {
  return async dispatch => {
    try {
      const [classes, sessions, terms, { data }] = await Promise.all([
        getContent({ url: `/classes` }),
        getContent({ url: `/sessions/only` }),
        [
          { id: 1, name: 'First term' },
          { id: 2, name: 'Second term' },
          { id: 3, name: 'Third term' },
        ],
        getContent({ url: `/utilities/active` }),
      ]);

      console.log(data, '\n=============Now=================');

      session.set('classes', classes.data);
      session.set('sessions', sessions);
      session.set('terms', terms);
      session.set('active', data);
      session.set('sessionId', data.sessionId);
      session.set('termId', data.termId);

      dispatch({
        type: PRELOADED,
        payload: [classes, sessions, terms],
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        message: err.message,
      });
    }
  };
}

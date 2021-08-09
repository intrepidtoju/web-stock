import { PRELOADED, ERROR } from './globalAction';

const initClassState = {
  classes: [],
  sessions: [],
  terms: [],
  error: false,
  loading: true,
};

export default (state = initClassState, { type, payload }) => {
  switch (type) {
    case PRELOADED:
      return {
        ...initClassState,
        classes: payload.classes,
        sessions: payload.sessions,
        terms: payload.terms,
        loading: false,
      };
    case ERROR:
      return {
        ...initClassState,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

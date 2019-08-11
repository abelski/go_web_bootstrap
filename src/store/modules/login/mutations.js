import * as types from './mutationTypes';

const mutations = {
  [types.AUTHORIZATION_SUCCESS](state) {
    state.error = false;
    state.success = true;
  },

  [types.AUTHORIZATION_FAILURE](state) {
    state.error = true;
    state.success = false;
  },
};

export default mutations;

import * as types from './mutationTypes';

const mutations = {
  [types.GET_PROJECTS_SUCCESS](state, projects) {
    state.projects = projects;
  },

  [types.GET_PROJECTS_FAILURE](state) {
    state.error = true;
    state.success = false;
  },
};

export default mutations;

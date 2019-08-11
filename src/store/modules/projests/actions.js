import Vue from 'vue';
import * as types from './mutationTypes';

const PROJECTS_URL = 'http://localhost:8080/api/work/test_pr.xml';

const actions = {
  getProjects({ commit }) {
    return Vue.http.get(PROJECTS_URL)
      .then((res) => {
        console.log(res); //eslint-disable-line
        commit(types.GET_PROJECTS_SUCCESS, res);

        return Promise.resolve();
      })
      .catch((e) => {
        commit(types.GET_PROJECTS_FAILURE);

        return Promise.reject(e);
      });
  },
};

export default actions;

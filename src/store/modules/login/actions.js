import Vue from 'vue';
import * as types from './mutationTypes';

const AUTHORIZATION_URL = 'http://localhost:8081/web/login';

const actions = {
  authorization({ commit }) {
    return Vue.http.get(AUTHORIZATION_URL)
      .then(() => {
        commit(types.AUTHORIZATION_SUCCESS);

        return Promise.resolve();
      })
      .catch((e) => {
        commit(types.AUTHORIZATION_FAILURE);

        return Promise.reject(e);
      });
  },
};

export default actions;

<template>
  <div class="about">
    <button
      type="button"
      class="btn btn-outline-primary btn-lg"
      @click="loginIn"
    >
      Login In
    </button>
    <button
      type="button"
      :class="[
        'btn',
        'btn-outline-primary',
        'btn-lg',
        $style.btnProjects,
      ]"
      @click="fetchProjects"
    >
      Projects
    </button>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex';

  const AUTHORIZATION_URL = 'http://localhost:8080/web/login';

  export default {
    name: 'Login',

    methods: {
      ...mapActions('ProjectsModule', ['getProjects']),

      loginIn() {
        document.location = AUTHORIZATION_URL;
      },

      fetchProjects() {
        this.getProjects();
      },
    },
  };
</script>

<style lang="less" module>
  .about {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
  }

  .btnProjects {
    margin: 10px 0 0;
  }
</style>

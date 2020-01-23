<template>
  <div class="wrapper">
    <nav-bar />
    <div class="container">
      <router-view/>
    </div>

    <notifications group="notify" />
  </div>
</template>

<script>
import NavBar from './components/NavBar/index.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";

button {
  cursor: pointer;
}
</style>

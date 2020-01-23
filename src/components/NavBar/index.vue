<template>
  <nav class="blue darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Ticket Tracker</router-link>

      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link to="/" tag="li" exact active-class="active">
          <a href="#">Create</a>
        </router-link>
        <router-link to="/tickets" tag="li" exact active-class="active">
          <a href="#">Tickets</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}
</style>

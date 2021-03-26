<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}
body {
  height: 100%;
}

#app {
  @import url("https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@300&display=swap");
  font-family: "Zilla Slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

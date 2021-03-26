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
  padding: 0;
  margin: 0;
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

button {
  border: solid 2px darken(#2e503c, 10%);
  border-radius: 2px;
  background-color: #2e503c;
  font-family: "Zilla Slab", serif;
  color: white;
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background-color: lighten(#2e503c, 10%);
  }
  &:active {
    background-color: darken(#2e503c, 5%);
  }
}
</style>

<template>
  <div class="main">
    <router-view/>
  </div>
</template>


<style lang="scss">
#app {
  font-family: 'Noto Sans TC', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::-webkit-scrollbar {
width:8px;
height:8px;
background-color:#fff;
border-radius:10px;
}

::-webkit-scrollbar-thumb {
border-radius:10px;
background: rgba(30, 55, 63, 0.3);
}
</style>

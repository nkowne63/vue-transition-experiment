<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <!-- enter-active-class="animated zoomIn"
    leave-active-class="animated bounceOutRight"-->
    <transition name="router-transition">
      <router-view class="page" />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.page {
  position: fixed;
  right: 0;
  left: 0;
  width: inherit;
  padding: 0 50px;
}

$duration: 3s;

// カスタム定義部分
.router-transition-enter-active {
  animation: fadeIn $duration;
  // animation-delay: 0.5s;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.router-transition-leave-active {
  animation: fadeOut $duration;
}

@keyframes fadeOut {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>

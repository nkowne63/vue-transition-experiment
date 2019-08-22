<template>
  <div class="home">
    <h1>This is a home page</h1>
    <h2>{{message}}</h2>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  message: string = "initial";
  mounted() {
    setTimeout(() => {
      this.message = "changed";
    }, 1000);
  }
}

// import { Component, Vue } from 'vue-property-decorator'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

// @Component({
//   components: {
//     HelloWorld
//   }
// })
// export default class Home extends Vue {}
</script>

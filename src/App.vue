<template>
  <div id="app">
    <transition
      @before-enter="onBeforeEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      :css="false"
    >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("hammer", Hammer);

    this.hammer = new Hammer(this.$el);

    this.hammer.on("panstart", event => {
      console.log("hello!");
      event.preventDefault();
      this.panning = true;
      this.panningStartPosition = this.$el.getBoundingClientRect().left;
      this.$router.push({ path: "/bar" }); // initiate transition process
    });
  },
  data: () => ({
    panning: false,
    panningStartPosition: 0,
    abortedTransition: false
  }),
  methods: {
    onBeforeEnter(element) {
      element.style.zIndex = this.abortedTransition ? 1 : 0;
    },
    onBeforeLeave(element) {
      element.style.zIndex = this.abortedTransition ? 0 : 1;
    },
    onLeave(element, done) {
      if (this.abortedTransition) {
        this.abortedTransition = false;
        done();
      } else {
        element = $(element);
        if (this.panning) {
          // User is using touch gestures to go back
          this.hammer.on("pan", event => {
            event.preventDefault();
            // Make sure, the element follows the touch gesture
            element.css({
              transition: "transform 0ms linear",
              transform:
                "translate3d(" +
                (this.panningStartPosition + event.deltaX) +
                "px, 0, 0)"
            });
          });
          // When the swipe motion stops and the user lets go, we need to decide what happens
          this.hammer.on("panend", event => {
            event.preventDefault();
            let remainingDistance = Math.max(0, element.width() - event.deltaX);
            let remainingDistancePercent =
              ((100 / element.width()) * remainingDistance - 100) * -1;
            // If the swipe was short and at a low speed, we cancel it and revert to the original position
            if (remainingDistancePercent < 15 && event.velocityX < 0.1) {
              // Cancel routing and revert to original position
              element.css({
                transition: "transform 500ms ease-out",
                transform: "translate3d(0, 0, 0)"
              });
              this.abortedTransition = true; // when firing $router.back(), don't use transitions
              // When done, reset everything for the next round
              setTimeout(() => {
                this.panning = false;
                this.$router.back();
                this.hammer.off("pan panend");
                done();
              }, 500);
            } else {
              // If the swipe was longer and at a higher speed, animate the remaining distance at the same speed
              let transitionTime =
                remainingDistance / Math.max(0.9, event.velocityX);
              element.css({
                transition: "transform " + transitionTime + "ms ease-out",
                transform: "translate3d(" + element.width() + "px, 0, 0)"
              });
              // When done, reset everything for the next round
              setTimeout(() => {
                this.panning = false;
                this.hammer.off("pan panend");
                done(); // tell vue.js we're done animating
              }, transitionTime);
            }
          });
        } else {
          // Programmatic navigation / link clicked, but no touch gesture detected
          if (this.abortedTransition) {
            done(); // return to original route without transitions
          } else {
            element.css({
              transition: "transform 500ms ease-out",
              transform: "translate3d(" + element.width() + "px, 0, 0)"
            });
            setTimeout(() => done(), 500);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  -webkit-user-select: none;
  -webkit-user-drag: none;
  position: relative;
  height: 100vh;
  width: 100vw;

  div {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(#fff, 0.75);
    text-align: center;
    line-height: 100vh;
    font-size: 30vh;
  }
}
</style>

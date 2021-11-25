<template>
  <div class="route-map-dialog">
    <section class="map__container">
      <!-- google-map -->
      <slot name="map"></slot>
    </section>
    <section class="dialog-footer">
      <div class="gps-button">
        <img src="../../assets/share.png" alt="">
        前往導航
      </div>
      <div class="close-button">
        <img src="../../assets/close.png" alt="">
      </div>       
    </section>
   
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BusRouteMapDialog',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.route-map-dialog {
  position: absolute;
  width: 100%;
  height: calc(100vh - 158px);
  background: rgba(30, 55, 63, 0.5);
  backdrop-filter: blur(30px);
  top: 158px;
  z-index: 5;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -4px 10px rgba(19, 23, 20, 0.15);
  .map__container {
    width: 100%;
    height: 87%;
    background: red;
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
  }
  .dialog-footer {
    margin-top: 15px;
    display: flex;
    .close-button {
      // position: absolute;
      width: 44px;
      height: 44px;
      border-radius: 50px;
      background: #1E373F;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      // bottom: 15px;
      // left: 50%;
      // transform: translate(-50%);
      // z-index: 4;
      img {
        width: 21px;
        height: 21px;
      }
    }
    .gps-button {
      width: 83%;
      height: 44px;
      background: #fff;
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #2FC3B1;
      font-size: 16px;
      img {
        width: 20px;
        margin-right: 15.5px;
      }
    }
  }
  // .close-button {
  //   position: absolute;
  //   width: 44px;
  //   height: 44px;
  //   border-radius: 50px;
  //   background: #1E373F;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   bottom: 15px;
  //   left: 50%;
  //   transform: translate(-50%);
  //   z-index: 4;
  //   img {
  //     width: 21px;
  //     height: 21px;
  //   }
  // }
  
}
</style>

<template>
  <div class="stop-map-dialog">
    <section class="map__container">
      <div id="map">
      </div>
    </section>
    <section class="dialog-footer">
      <div class="gps-button" @click="goUseGps">
        <img src="../../assets/share.png" alt="">
        前往導航
      </div>
      <div class="close-button" @click="$emit('close')">
        <img src="../../assets/close.png" alt="">
      </div>       
    </section>
   
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch } from 'vue';
import { ILatLngLiteral } from '@/types';

export default defineComponent({
    name: "BusStopMapDialog",
    props: {
      currentBusStopPostion: {
        type: Object as PropType<ILatLngLiteral>,
        default: () => ({})
      }
    },
    setup(props) {
      const map = ref<any>(null);
      const center = ref<ILatLngLiteral>({
        lat: 25.0325917,
        lng: 121.5624999
      });
      const initMap = () => {
        center.value = {
          lat: Number(props.currentBusStopPostion.lat),
          lng: Number(props.currentBusStopPostion.lng)
        };
        map.value = new (window as any).google.maps.Map(document.getElementById("map") as Element, {
          center: center.value,
          zoom: 15,
          maxZoom: 20,
          minZoom: 3,
          streetViewControl: false,
          mapTypeControl: false,
          disableDefaultUI: true,
        });
        const marker = new (window as any).google.maps.Marker({
          position: center.value,
          map: map.value,
        });
      };

      const goUseGps = () => {
        window.open(`https://www.google.com/maps/dir/${props.currentBusStopPostion.lat},${props.currentBusStopPostion.lng}`);
      };

      watch(() => props.currentBusStopPostion, (v) => {
        center.value = {
          lat: Number(v.lat),
          lng: Number(v.lng)
        };
        initMap();
      });

      onMounted(async() => {
        initMap();
      });
      return {
        goUseGps
      };
    },
})
</script>

<style lang="scss">
.stop-map-dialog {
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
  #map {
    height: 100%;
  }
  .map__container {
    width: 100%;
    height: calc(100vh - 270px);
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
  }
  .dialog-footer {
    margin-top: 15px;
    display: flex;
    .close-button {
      width: 44px;
      height: 44px;
      border-radius: 50px;
      background: #1E373F;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
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
}
</style>

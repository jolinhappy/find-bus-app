<template>
  <div class="route-map-dialog">
    <section class="map__container">
      <div id="map">
      </div>
    </section>
    <section class="dialog-footer">
      <div class="gps-button">
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
import createHTMLMapMarker from '@/utils/custom-map-helper';

interface IPosionAndName extends ILatLngLiteral {
  name: string;
}


export default defineComponent({
    name: "BusRouteMapDialog",
    props: {
      geometryArray: {
        type: Array as PropType<IPosionAndName[]>,
        default: () => []
      }
    },
    setup(props) {
      const map = ref<any>(null);
      const center = ref<ILatLngLiteral>({
        lat: 0,
        lng: 0
      });
      const initMap = () => {
        center.value = {
          lat: Number(props.geometryArray[0].lat),
          lng: Number(props.geometryArray[0].lng)
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
        const line = new (window as any).google.maps.Polyline({
          path: props.geometryArray,
          strokeColor: "#09536B",
          strokeOpacity: 1.0,
          strokeWeight: 6,
          map: map.value
        });
        setPointMakers();
      };
      const setPointMakers = () => {
        props.geometryArray.forEach(async(positionInfo, index) => {
          if (!positionInfo) return;
          let latling = await new (window as any).google.maps.LatLng({lat: positionInfo.lat, lng: positionInfo.lng});
            const markers = await createHTMLMapMarker({
              latlng: latling,
              map: map.value,
              html: `<div class="info-marker">
                <div class="info">${index + 1}. ${positionInfo.name}</div>
                <div class="marker"></div>
              </div>`,
            });
        });
      };

      onMounted(() => {
        center.value = props.geometryArray[0];
        initMap();
      });
      return {};
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
  #map {
    height: 100%;
  }
  .map__container {
    width: 100%;
    height: 87%;
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
  .info-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    left: -15px;
    top: -13px;
    .info {
      width: auto;
      background: black;
      color: #fff;
      padding: 3px;
      font-size: 14px;
      line-height: 150%;
      background: rgba(26, 46, 53, 0.7);
      border-radius: 6px;
      margin-bottom: 6px;
    }
    .marker {
      width: 10px;
      height: 10px;
      border-radius: 50px;
      background: #2FC3B1;
      border: 2px solid #FFFFFF;
    }
  }
}
</style>

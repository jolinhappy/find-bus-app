<template>
  <div id="route-map">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { ILatLngLiteral } from '@/types';
import createHTMLMapMarker from '@/utils/custom-map-helper';

interface IPosionAndName extends ILatLngLiteral {
  name: string;
}

export default defineComponent({
  name: 'RouteMap',
  props: {
    geometryArray: {
      type: Array as PropType<IPosionAndName[]>,
      default: () => []
    },
    wholeBusStops: {
      type: Array,
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
      map.value = new (window as any).google.maps.Map(document.getElementById("route-map") as Element, {
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

    watch(() => props.geometryArray, () => {
      if (props.geometryArray.length > 0) {
        initMap();  
      }
    });

    onMounted(() => {
      center.value = props.geometryArray[0];
    });
    return {
      map
    }
  },
})
</script>


<style lang="scss">
#route-map {
  height: 100%;
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
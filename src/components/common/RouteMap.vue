<template>
  <div id="route-map">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { ILatLngLiteral } from '@/types';
import createHTMLMapMarker from '@/utils/custom-map-helper';

export default defineComponent({
  name: 'RouteMap',
  props: {
    geometryArray: {
      type: Array as PropType<ILatLngLiteral[]>,
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
      props.geometryArray.map(async(lane) => {
        if (!lane) return;
        const { lat, lng } = lane;
        let latling = await new (window as any).google.maps.LatLng({lat: lat, lng: lng});
          const markers = await createHTMLMapMarker({
            latlng: latling,
            map: map.value,
            html: `<div class="circle-marker">
              </div`,
            anchor: new (window as any).google.maps.Point(0, 0),
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
  .circle-marker {
    position: relative;
    width: 12px;
    height: 12px;
    border: 2px solid #FFFFFF;
    background: #2FC3B1;
    border-radius: 50px;
    left: 16px;
    top: 18px
  }
}
</style>
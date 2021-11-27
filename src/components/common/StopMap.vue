<template>
  <div id="stop-map">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { ILatLngLiteral } from '@/types';

export default defineComponent({
  name: 'StopMap',
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
      map.value = new (window as any).google.maps.Map(document.getElementById("stop-map") as Element, {
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

    watch(() => props.currentBusStopPostion, (v) => {
      initMap();
    })

    onMounted(async() => {
      initMap();
    });
    return {
      map,
    }
  },
})
</script>


<style lang="scss">
#stop-map {
  height: 100%;
}
</style>
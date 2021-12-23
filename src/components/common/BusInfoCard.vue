<template>
  <div class="bus-info-card list-item">
    <div class="bus-name">{{ routeInfo?.RouteName?.Zh_tw }}</div>
    <div class="bus-way-time">
      <div class="way">{{ routeInfo.DepartureStopNameZh }} - {{ routeInfo.DestinationStopNameZh }}</div>
      <div class="time">{{ routeInfo.SubRoutes[0]?.FirstBusTime }} - {{ routeInfo.SubRoutes[0]?.LastBusTime }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IBusRoute } from '@/types/api/bus';

export default defineComponent({
  name: 'BusInfoCard',
  props: {
    routeInfo: {
      type: Object as PropType<IBusRoute>,
      default: () => ({})
    }
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.list-item {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.15);
  border-radius: 14px;
  display: flex;
  padding: 10.5px 15px;
  align-items: center;
  cursor: pointer;
  .bus-name {
    font-size: 23px;
    font-weight: 500;
    color: #1E373F;
  }
  .bus-way-time {
    display: flex;
    flex-direction: column;
    line-height: 150%;
    align-items: flex-end;
    width: 60%;
    margin-left: auto;
    .way {
      width: 100%;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: right;
    }
  }
}
</style>

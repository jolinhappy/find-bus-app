<template>
  <div class="bus-info-card list-item">
    <div class="bus-name">0東</div>
    <div class="bus-way-time">
      <div class="way">萬華 - 松仁路</div>
      <div class="time">06:00 - 22:00</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BusInfoCard',
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
  .bus-name {
    font-size: 23px;
    font-weight: 500;
    margin-right: auto;
    color: #1E373F;
  }
  .bus-way-time {
    display: flex;
    flex-direction: column;
  }
}
</style>

<template>
  <div class="route-info-dialog">
    <div class="route-info-dialog__header">
      <h4>路線資訊</h4>
    </div>
    <div class="route-info-dialog__body">
      <h5>發車資訊</h5>
      <section>
        <h6>頭末班車：</h6>
        <p>平日：{{ busRouteInfo[0]?.SubRoutes[0].FirstBusTime}}-{{ busRouteInfo[0]?.SubRoutes[0].LastBusTime}}</p>
        <p>假日：{{ busRouteInfo[0]?.SubRoutes[0].HolidayFirstBusTime}}-{{ busRouteInfo[0]?.SubRoutes[0].HolidayLastBusTime}}</p>
        <h6>營運日期：</h6>
        <div class="operation-time-list">
          <div class="day">
            <div class="day__text">
              一
            </div>
            <div class="day__check">
              <img src="../../assets/check.png" alt="">
            </div>
          </div>
          <div class="day">
            <div class="day__text">
              二
            </div>
            <div class="day__check">
              <img src="../../assets/check.png" alt="">
            </div>
          </div>
          <div class="day">
            <div class="day__text">
              三
            </div>
            <div class="day__check">
              <img src="../../assets/check.png" alt="">
            </div>
          </div>
          <div class="day">
            <div class="day__text">
              四
            </div>
            <div class="day__check">
              <img src="../../assets/check.png" alt="">
            </div>
          </div>
          <div class="day">
            <div class="day__text">
              五
            </div>
            <div class="day__check">
              <img src="../../assets/check.png" alt="">
            </div>
          </div>
          <div class="day">
            <div class="day__text">
              六
            </div>
            <div class="day__check">
              <img src="../../assets/check.png" alt="">
            </div>
          </div>
          <div class="day">
            <div class="day__text">
              日
            </div>
            <div class="day__check">
              <img src="../../assets/check.png" alt="">
            </div>
          </div>
        </div>
      </section>
      <h5>票價資訊</h5>
      <section>
        <h6>收費方式：</h6>
        <p>{{ busRouteInfo[0]?.TicketPriceDescriptionZh || '-' }}</p>
      </section>
      <h5>服務客運</h5>
      <section>
        <h6>客運業者：</h6>
        <p>{{ busOperatorInfo?.OperatorName.Zh_tw }}</p>
        <h6>聯繫電話：</h6>
        <p>{{ busOperatorInfo?.OperatorPhone }}</p>
      </section>
      <div class="close-button" @click="$emit('close')">
        <img src="../../assets/close.png" alt="close" @click="$emit('close')">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IBusRoute, IBusStopOfRoute, IStop, IBusN1EstimateTime, IOperator } from '@/types/api/bus';

export default defineComponent({
  name: 'BusRouteInfoDialog',
  props: {
    busOperatorInfo: {
      type: Object as PropType<IOperator>,
      default: () => ({}),
    },
    busRouteInfo: {
      type: Array as PropType<IBusRoute[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.route-info-dialog {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgba(30, 55, 63, 0.5);
  backdrop-filter: blur(30px);
  top: 0px;
  z-index: 5;
  padding: 30px 20px;
  box-sizing: border-box;
  &__header {
    color: #fff;
    font-weight: 500;
    font-size: 27px;
    margin-bottom: 20px;
  }
  &__body {
    width: 100%;
    border-radius: 20px;
    background: #fff;
    position: relative;
    h5 {
      background: #AFECE4;
      padding: 10px 17px;
      color: #09536B;
      font-size: 16px;
      &:first-child {
        border-radius: 8px 8px 0 0;
      }
    }
    section {
      padding: 20px 17px;
      color: #4D514F;
      h6 {
        font-size: 15px;
        line-height: 150%;
        margin-bottom: 5px;
      }
      p {
        font-size: 12px;
        color: #6e7370;
        line-height: 150%;
      }
      .operation-time-list {
        display: flex;
        justify-content: space-between;
        .day {
          width: 30px;
          border-radius: 6px;
          border: 1px solid #AFECE4;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          &__text {
            background: #E8F9F7;
            padding: 5px;
            border-bottom: 1px solid #AFECE4;
          }
          &__check {
            img {
              width: 12px;
              padding: 5px;
            }
          }
        }
      }
    }
    .close-button {
      position: absolute;
      width: 44px;
      height: 44px;
      border-radius: 50px;
      background: #1E373F;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: -22px;
      left: 50%;
      transform: translate(-50%);
      z-index: 4;
      img {
        width: 21px;
        height: 21px;
      }
    }
  }
}
</style>

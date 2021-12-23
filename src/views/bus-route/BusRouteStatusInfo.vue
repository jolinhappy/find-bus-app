<template>
  <teleport to="body">
    <LoadingPage v-if="isLoading"/>
  </teleport>
  <BaseLayout>
    <template #header>
      <HeaderBar/>
    </template>
    <template #body>
      <div class="bus-route-status">
        <section class="action-section">
          <img src="../../assets/arrow.svg" alt="" @click="$router.back()">
          <div class="action-section__bus-number">{{ currentCity }}｜{{ busName }} 公車</div>
          <div class="update-hint">{{currentSecond}}秒後更新</div>
        </section>
        <section class="info-section">
          <div class="info-section__name">{{ busName }}</div>
          <div class="info-section__way">{{busRouteInfo[0]?.DepartureStopNameZh}} - {{busRouteInfo[0]?.DestinationStopNameZh}}</div>
          <div class="info-section__more-info" @click="openRouteInfo">
            <div class="circle"></div>
          </div>
          <div class="info-section__share-button button pc" @click="sharePageInfo">
            <img src="../../assets/share-blue.png" alt="Share">
            分享頁面
          </div>
          <div class="info-section__update" @click="updateRouteStatus">
            <img src="../../assets/update.png" alt="">
          </div>
        </section>
        <section class="main-info">
          <h3>公車動態</h3>
          <article class="bus-status">
            <div class="button-tabs">
              <div class="bus-status__way-button" :class="{inactive: selectedBusDirection !== 0}" @click="changeBusDirection('Outbound')">
                <img src="../../assets/bus-gray-icon.png" alt="">
                往 {{busRouteInfo[0]?.DestinationStopNameZh}}
              </div>
              <div class="bus-status__way-button" :class="{inactive: selectedBusDirection !== 1}"  @click="changeBusDirection('Return')">
                <img src="../../assets/bus-gray-icon.png" alt="">
                往 {{busRouteInfo[0]?.DepartureStopNameZh}}
              </div>
            </div>
            <div class="bus-status__list-container">
              <div class="bus-status__status-list">
                <div class="bus-status__item" v-for="stop in wholeBusStops" :key="stop.StopID" @click="goStopInfo(stop)">
                  <template v-if="stop.StopStatus === 0">
                    <div class="status" :class="getStopStatusClass(stop.EstimateTime)">{{ estimatedArriveTimeFilter(stop.EstimateTime) }}</div>
                  </template>
                  <template v-else>
                    <div class="status no-departure">{{ statusFilter(stop.StopStatus) }}</div>
                  </template>
                  <div class="current-station">{{ stop.StopName?.Zh_tw }}</div>
                </div>
              </div>
              <div class="bus-status__map">
                <RouteMap :geometryArray="geometryArray" :wholeBusStops="wholeBusStops"/>
              </div>
            </div>
          </article>
        </section>
        <section class="bus-map">
          <div class="bus-map__button" @click="isShowRouteMap = true">
            <img src="../../assets/map2.png" alt="">
            站牌地圖
          </div>
          <div class="bus-map__refresh-button" @click="updateRouteStatus">
            <img src="../../assets/update.png" alt="">
          </div>
        </section>
        <section class="route-info">
          <h3>路線資訊</h3>
          <div class="route-info__box-container">
            <div class="route-info__box">
              <h4>發車資訊</h4>
              <div class="route-info__box-detail">
                <h5>頭末班車：</h5>
                <p>平日：{{ busRouteInfo[0]?.SubRoutes[0].FirstBusTime}}-{{ busRouteInfo[0]?.SubRoutes[0].LastBusTime}}</p>
                <p>假日：{{ busRouteInfo[0]?.SubRoutes[0].HolidayFirstBusTime}}-{{ busRouteInfo[0]?.SubRoutes[0].HolidayLastBusTime}}</p>
                <h5>營運日期：</h5>
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
              </div>          
            </div>
            <div class="route-info__box">
              <h4>票價資訊</h4>
              <div class="route-info__box-detail">
                <h5>收費方式：</h5>
                <p>{{ busRouteInfo[0]?.TicketPriceDescriptionZh || '-' }}</p>
              </div>
            </div>
            <div class="route-info__box">
              <h4>服務客運</h4>
              <div class="route-info__box-detail">
                <h5>客運業者：</h5>
                <p>{{ busOperatorInfo?.OperatorName.Zh_tw }}</p>
                <h5>聯繫電話：</h5>
                <p>{{ busOperatorInfo?.OperatorPhone }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
  </BaseLayout>
<teleport to="body">
  <BusRouteInfoDialog
    v-if="isShowRouteInfo"
    :busOperatorInfo="busOperatorInfo"
    :busRouteInfo="busRouteInfo"
    @close="isShowRouteInfo = false"
  />
</teleport>
<teleport to="body">
  <BusRouteMapDialog v-if="isShowRouteMap" @close="isShowRouteMap = false" :geometryArray="geometryArray" />
</teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, onUnmounted } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import HeaderBar from '@/components/common/HeaderBar.vue';
import { useRoute } from 'vue-router';
import busHandler from '@/api-handler/bus';
import { IBusRoute, IBusStopOfRoute, IStop, IBusN1EstimateTime, IOperator } from '@/types/api/bus';
import { taiwanCity } from '@/utils/cities';
import { City, DirectionType, ILatLngLiteral, StopStatusType } from '@/types';
import { Toast } from "@/utils/toast-helper";
import RouteMap from '@/components/common/RouteMap.vue';
import BusRouteInfoDialog from '@/components/common/BusRouteInfoDialog.vue';
import BusRouteMapDialog from '@/components/common/BusRouteMapDialog.vue';
import LoadingPage from '@/components/common/LoadingPage.vue';
import router from '@/router';

interface IwholeInfoType extends IStop {
  StopStatus: StopStatusType;
  EstimateTime: number | null;
}

interface IPosionAndName extends ILatLngLiteral {
  name: string;
}

export default defineComponent({
  name: 'BusRouteStausInfo',
  components: {
    BaseLayout,
    HeaderBar,
    BusRouteInfoDialog,
    BusRouteMapDialog,
    RouteMap,
    LoadingPage,
  },
  setup() {
    const cityList = taiwanCity;
    const route = useRoute();
    const { city, busName } = route.params;
    const currentCity = ref<string>('');
    const busRouteInfo = ref<IBusRoute[]>([]);
    const busStopOfRoute = ref<IBusStopOfRoute[]>([]);
    const busEstimatedTimeOfArrival = ref<IBusN1EstimateTime[]>([]);
    const selectedBusDirection = ref<DirectionType>(DirectionType.Outbound);
    const wholeBusStops = ref<IwholeInfoType[]>([]);
    const isShowRouteInfo = ref<boolean>(false);
    const isShowRouteMap = ref<boolean>(false);
    const busOperatorName = ref<string>('');
    const busOperatorInfo = ref<IOperator | null>(null);
    const geometryArray = ref<IPosionAndName[]>([]);
    const currentRoute = ref<IStop[]>([]);
    const currentSecond = ref<number>(30);
    const isLoading = ref<boolean>(true);
    let intervalTimer: ReturnType<typeof setInterval> | undefined;


    const getCurrentCity = (cityEnglishName: string) => {
      cityList.forEach((city: City) => {
        if (cityEnglishName === city.value) {
          currentCity.value = city.name;
        }
      });
    };
    const getBusStopOfRoute = async() => {
      try {
        const res = await busHandler.getBusStopOfRoute(city as string, busName as string);
        if (res) {
          busStopOfRoute.value = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getBusRouteInfo = async() => {
      try {
        const res = await busHandler.getRouteInfo(city as string, busName as string);
        if (res) {
          busRouteInfo.value = await res.data;
          busOperatorName.value = busRouteInfo.value[0].Operators[0].OperatorName.Zh_tw
          getOperaterInfo();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getBusEstimatedTimeOfArrival = async() => {
      try {
        const res = await busHandler.getBusEstimatedTimeOfArrival(city as string, busName as string);
        if (res) {
          busEstimatedTimeOfArrival.value = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const changeBusDirection = (type: string) => {
      selectedBusDirection.value = (DirectionType as { [key: string]: any })[type];
    };

    const getWholeBusStops = async() => {
      try {
        isLoading.value = true;
        await getBusEstimatedTimeOfArrival();
        // 預設為去程路線
        currentRoute.value = selectedBusDirection.value === DirectionType.Outbound ? busStopOfRoute.value[DirectionType.Outbound].Stops : busStopOfRoute.value[DirectionType.Return].Stops;
        const currentDirectionArriveTimeInfo = busEstimatedTimeOfArrival.value.filter((info) => info.Direction === selectedBusDirection.value);
        wholeBusStops.value = currentRoute.value.reduce((result: IwholeInfoType[], route: IStop) => {
          for(let arriveTimeInfo of currentDirectionArriveTimeInfo) {
            if (arriveTimeInfo.StopID === route.StopID) {
              const wholeInfo: IwholeInfoType = {
                ...route,
                StopStatus: arriveTimeInfo.StopStatus as StopStatusType,
                EstimateTime: arriveTimeInfo.EstimateTime ? arriveTimeInfo.EstimateTime : null
              }
              result.push(wholeInfo);
            }
          }
          return result;
        }, []);
        formatGeometry(currentRoute.value);
        isLoading.value = false;
        secondCountDown();
      } catch (error) {
        console.log(error);
        isLoading.value = false;
      }
    };

    const statusFilter = (status: StopStatusType) => {
      switch(status) {
        case StopStatusType.NoDeparture:
          return '尚未發車';
        case StopStatusType.NonStop:
          return '交管不停靠';
        case StopStatusType.LastBusPassed:
          return '末班車已過';
        case StopStatusType.NonOperation:
          return '今日未營運';
      }
    };

    const estimatedArriveTimeFilter = (time: number) => {
      if (time < 60) {
        return '進站中';
      } else if (time < 120) {
        return '即將進站';
      } else {
        const minute = Math.ceil(time / 60);
        return `${minute} 分鐘`;
      }
    };

    const getStopStatusClass = (time: number) => {
      if (time < 60) {
        return 'pulling';
      } else if (time < 120) {
        return 'about-arrive';
      } else if (time >= 120) {
        return '';
      }
    };

    const getOperaterInfo = async() => {
      try {
        const res = await busHandler.getBusOperatorInfo(city as string, busOperatorName.value);
        if (res) {
          busOperatorInfo.value = res.data[0];
        }
      } catch (error) {
        console.log(error);
      }
    };

    const updateRouteStatus = async() => {
      await getWholeBusStops();
      Toast.fire({
        icon: 'success',
        title: '已更新成功！'
      });
    };

    const secondCountDown = () => {
      // 每30秒fetch一次資料
      clearInterval(intervalTimer);
      currentSecond.value = 30;
      intervalTimer = setInterval(() => {
        if (currentSecond.value == 0) {
          currentSecond.value = 30;
        }
        currentSecond.value -= 1;
      }, 1000);
    };

    const openRouteInfo = () => {
      isShowRouteInfo.value = true;
    };

    const formatGeometry = (stops: IStop[]) => {
      geometryArray.value = stops.map((stop) => ({
        lat: stop.StopPosition.PositionLat as number,
        lng: stop.StopPosition.PositionLon as number,
        name: stop.StopName.Zh_tw
      }))
    };

    const goStopInfo = (stopInfo: IStop) => {
      router.push(`/stop-info/${city}/${stopInfo.StopName.Zh_tw}`);
    };

    const sharePageInfo = () => {
      const string = `查看等等公車的${currentCity.value} ${busName}公車 即時資訊： https://jolinhappy.github.io/find-bus-app/#${route.fullPath}`
      navigator.clipboard.writeText(string)
      Toast.fire({
        icon: 'success',
        title: '太棒了！ 複製成功！'
      });
    };

    watch(() => selectedBusDirection.value, async() => {
      getWholeBusStops();
    });

    onMounted(async() => {
      getBusRouteInfo();
      getBusStopOfRoute();
      getWholeBusStops();
    });
    onUnmounted(() => {
      clearInterval(intervalTimer);
    });
    return{
      busRouteInfo,
      busStopOfRoute,
      currentCity,
      city,
      busName,
      selectedBusDirection,
      wholeBusStops,
      isShowRouteInfo,
      isShowRouteMap,
      busOperatorInfo,
      geometryArray,
      currentRoute,
      currentSecond,
      isLoading,
      getCurrentCity,
      changeBusDirection,
      statusFilter,
      estimatedArriveTimeFilter,
      getStopStatusClass,
      getWholeBusStops,
      updateRouteStatus,
      openRouteInfo,
      getBusRouteInfo,
      getBusStopOfRoute,
      formatGeometry,
      goStopInfo,
      sharePageInfo,
    }
  },
});
</script>

<style lang="scss">
// mobile
.bus-route-status {
  height: calc(100vh - 66px);
  background: linear-gradient(143.04deg, #70EBB0 13.42%, #40CACA 84.3%);
  display: flex;
  flex-direction: column;
  .action-section {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 12px;
    padding: 0 24px 0 10px;
    .update-hint {
      margin-left: auto;
    }
  }
  .info-section {
    padding: 0 24px 0 19px;
    color: #1E373F;
    display: flex;
    align-items: center;
    margin-bottom: 11px;
    &__name {
      font-weight: 600;
      font-size: 24px;
      border-right: 1px solid #0B6987;
      padding-right: 12px;
    }
    &__way {
      font-size: 14px;
      padding-left: 12px;
    }
    &__more-info {
      width: 44px;
      height: 44px;
      background: #fff;
      border-radius: 50px;
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .circle {
        width: 5px;
        height: 5px;
        border-radius: 50px;  
        background: #2FC3B1;
        position: relative;
        &::after {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50px;
          background: #2FC3B1;
          position: absolute;
          left: 10px;
        }
        &::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50px;
          background: #2FC3B1;
          position: absolute;
          right: 10px;
        }
      }
    }
    &__update {
      display: none;
    }
    &__share-button {
      display: none;
    }
  }
  .main-info {
    h3 {
      display: none;
    }
    .button-tabs {
      display: flex;
      cursor: pointer;
    }
    .bus-status {
      &__map {
        display: none;
      }
      &__way-button {
        height: 43px;
        width: 50%;
        padding: 10px;
        display: flex;
        font-size: 14px;
        font-weight: 500;
        color: #1E373F;
        border-radius: 20px 20px 0px 0px;
        background: #F2F3F1;
        justify-content: center;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        filter: drop-shadow(4px 0px 10px rgba(49, 54, 50, 0.1));
        img {
          width: 18px;
          margin-right: 20px;
        }
        &.inactive {
          &::after {
            content: '';
            width: 100%;
            height: 100%;
            background: #2FC3B1;
            position: absolute;
            border-radius: 20px 20px 0px 0px;
            opacity: 0.4;
          }
        }
      }
      &__list-container {
        background: #F2F3F1;
        height: calc(100vh - 245px);
        padding: 20px 20px 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-sizing: border-box;
        overflow: auto;
      }
      &__status-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-sizing: border-box;
      }
      .bus-status__item {
        display: flex;
        width: 100%;
        height: 50px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.6);
        color: #3D403E;
        font-size: 16px;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        .status {
          width: 30%;
          border-radius: 6px 30px 30px 6px;
          font-size: 14px;
          height: 100%;
          width: 104px;
          background: #3CC4EF;
          color: #fff;
          margin-right: 16px;
          line-height: 30px;
          &.no-departure {
            background: #AEB2B0;
          }
          &.pulling {
            background: #FF7A50;
          }
          &.about-arrive {
            background: #FFD952;
            color: #1E373F;
          }
        }
      }
    }
  }
  .bus-map {
    background: rgba(38, 147, 133, 0.5);
    position: absolute;
    bottom: 0;
    box-shadow: 0px -4px 10px rgba(19, 23, 20, 0.15);
    backdrop-filter: blur(50px);
    border-radius: 20px 20px 0px 0px;
    width: 100%;
    padding: 8px  0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 72%;
      padding: 4px;
      background: #fff;
      border-radius: 40px;
      color: #2FC3B1;
      img {
        width: 21px;
        margin-right: 12px;
      }
    }
    &__refresh-button {
      width: 44px;
      height: 44px;
      background: #fff;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
  .route-info {
    display: none;
  }
}


@media screen and (min-width: 768px) {
  .bus-route-status {
    height: auto;
    width: 100%;
    background: #E5E5E5;
    box-sizing: border-box;
    h3 {
      display: block;
      color: #1E373F;
      font-size: 27.5px;
      font-weight: bold;
      text-align: left;
      margin-bottom: 20px;
    }
    .action-section {
      display: flex;
      align-items: center;
      color: #0B6987;
      font-size: 16px;
      padding: 0 80px 0 70px;
      margin-top: 66px;
      margin-bottom: 41px;
      box-sizing: border-box;
      width: 100%;
      .update-hint {
        margin-left: auto;
      }
    }
    .info-section {
      padding: 0 80px;
      display: flex;
      align-items: center;
      margin-bottom: 41px;
      box-sizing: border-box;
      &__name {
        font-size: 64px;
        border-right: 2px solid #AEB2B0;
        padding-right: 30px;
        color: #2FC3B1;
      }
      &__way {
        font-size: 14px;
        padding-left: 30px;
        font-size: 26px;
        color: #1E373F;
        font-weight: bold;
      }
      &__more-info {
        display: none;
      }
      &__share-button {
        display: flex;
        background: #fff;
        box-sizing: border-box;
        border-radius: 40px;
        width: 180px;
        height: 44px;
        font-size: 14px;
        justify-content: center;
        align-items: center;
        color: #2FC3B1;
        box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.1);
        cursor: pointer;
        margin-left: auto;
        img {
          width: 20px;
          height: 20px;
          margin-right: 12px;
        }
        &:hover {
          box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.6);
        }
      }
      &__update {
        display: block;
        height: 44px;
        width: 44px;
        background: #fff;
        border-radius: 50px;
        display: flex;
        cursor: pointer;
        margin-left: 30px;
        &:hover {
          box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.6);
        }
        img {
          width: 22px;
          height: 22px;
          margin: auto;
        }
      }
    }
    .main-info {
      width: 100%;
      padding: 0 80px;
      box-sizing: border-box;
      .button-tabs {
        display: flex;
      }
      .bus-status {
        &__way-button {
          font-size: 19px;
          font-weight: bold;
          height: 50px;
          width: auto;
          padding: 0px 10px;
          img {
            width: 18px;
            margin-right: 30px;
          }
          &.inactive {
            &::after {
              background: #CEE1DF;
            }
          }
        }
        &__list-container {
          background: #fff;
          height: 550px;
          padding: 20px;
          display: flex;
          border-radius: 0px 30px 30px 30px;
          flex-direction: row;
        }
        &__status-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-sizing: border-box;
          width: 32%;
          height: 100%;
          overflow: auto;
        }
        &__map {
          flex: 1;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          display: block;
          overflow: hidden;
        }
        .bus-status__item {
          display: flex;
          width: 100%;
          height: 50px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.6);
          color: #3D403E;
          font-size: 16px;
          align-items: center;
          padding: 10px;
          box-sizing: border-box;
          &:hover {
            background: #E8F9F7;
          }
        }
      }
    }
    .bus-map {
      display: none;
    }
    .route-info {
      display: block;
      margin-top: 50px;
      padding: 0 80px;
      margin-bottom: 117px;
      &__box-container {
        display: flex;
        gap: 20px;
      }
      &__box {
        width: 33%;
        border-radius: 16px;
        overflow: hidden;
        background: #fff;
        h4 {
          background: #AFECE4;
          color: #09536B;
          font-size: 16px;
          line-height: 150%;
          padding: 10px 20px;
          font-weight: bold;
        }
      }
      &__box-detail {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        h5 {
          font-size: 19px;
          color: #4d514f;
          line-height: 150%;
        }
        p {
          color: #6E7370;
          font-size: 16px;
          line-height: 150%;
          & + h5 {
            margin-top: 20px;
          }
        }
        .operation-time-list {
          display: flex;
          .day {
            border: 1px solid #AFECE4;
            border-radius: 6px;
            &__text {
              font-size: 14px;
              color: #1E373F;
              line-height: 150%;
              font-weight: bold;
              padding: 5px;
              border-bottom: 1px solid #AFECE4;
              background: #E8F9F7;

            }
            &__check {
              padding: 5px;
              img {
                width: 12px;
              }
            }
            & + .day {
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <teleport to="body">
    <LoadingPage v-if="isLoading"/>
  </teleport>
  <BaseLayout>
    <template #header>
      <HeaderBar/>
    </template>
    <template #body>
      <div class="bus-stop-info">
        <section class="action-section"  @click="$router.back()">
          <img src="../../assets/arrow.svg" alt="">
          <div class="action-section__bus-number">{{ currentCityZhtw }}｜{{ stopName }}</div>
        </section>
        <section class="info-section">
          <div class="info-section__name">{{ stopName }}</div>
          <div class="info-section__share-button button mobile" @click="sharePageInfo">
            <img src="../../assets/share-white.png" alt="Share">
            分享頁面
          </div>
          <div class="info-section__share-button button pc" @click="sharePageInfo">
            <img src="../../assets/share-blue.png" alt="Share">
            分享頁面
          </div>
          <div class="info-section__gps button pc" @click="goUseGps">
            <img src="../../assets/gps.png" alt="gps">
            前往導航
          </div>
        </section>
        <section class="stop-map-section">
          <h3>站牌位置</h3>
          <div class="map__container">
            <div class="map">
              <StopMap :currentBusStopPostion="currentBusStopPostion" />
            </div>
          </div>
        </section>
        <section class="route-list">
          <h3>站牌公車</h3>
          <article class="route-list__container">
            <template v-if="busRoutes.length > 0">
              <template v-for="routeInfo in currentBusStopAllRoutesInfo" :key="routeInfo.RouteUID">
                <BusInfoCard :routeInfo="routeInfo" @click="findBusRoute(routeInfo.RouteName?.Zh_tw)"/>
              </template>
            </template>
            <template v-else>
              <p>未查詢到相關公車路線！</p>
            </template>
          </article>
        </section>
        <section class="bus-map-gps">
          <div class="bus-map-gps__map-button" @click="isShowStopMap = true">
            <img src="../../assets/map2.png" alt="">
            站牌地圖
          </div>
          <div class="bus-map-gps__gps-button" @click="goUseGps">
            <img src="../../assets/gps.png" alt="" >
            前往導航
          </div>
        </section>
      </div>
    </template>
  </BaseLayout>
  <teleport to="body">
    <BusStopMapDialog v-if="isShowStopMap" @close="isShowStopMap = false" :currentBusStopPostion="currentBusStopPostion" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import HeaderBar from '@/components/common/HeaderBar.vue';
import BusInfoCard from '@/components/common/BusInfoCard.vue';
import busHandler from '@/api-handler/bus';
import { useRoute, useRouter } from 'vue-router';
import { IBusRoute,IBusStopOfRoute } from '@/types/api/bus';
import { taiwanCity } from '@/utils/cities';
import { City, ILatLngLiteral } from '@/types/common';
import StopMap from '@/components/common/StopMap.vue';
import BusStopMapDialog from '@/components/common/BusStopMapDialog.vue';
import LoadingPage from '@/components/common/LoadingPage.vue';
import { Toast } from "@/utils/toast-helper";

export default defineComponent({
  name: 'BusStopInfo',
  components: {
    BaseLayout,
    HeaderBar,
    BusInfoCard,
    StopMap,
    BusStopMapDialog,
    LoadingPage,
  },
  setup() {
    const cityList = taiwanCity;
    const route = useRoute();
    const router = useRouter();
    const currentCityZhtw = ref<string>('');
    const busRoutes = ref<IBusStopOfRoute[]>([]);
    const allBusRoutesInfo = ref<IBusRoute[]>([]);
    const currentBusStopAllRoutesInfo = ref<IBusRoute[]>([]);
    const currentBusStopPostion = ref<ILatLngLiteral>({
      lat: 0,
      lng: 0
    });
    const isShowStopMap = ref<boolean>(false);
    const { city, stopName } = route.params;
    const isLoading = ref<boolean>(true);

    const getOneCityAllBusRoute = async(city: string) => {
      try {
        const res = await busHandler.getOneCityAllBusRouteInfo(city);
        if (res) {
          allBusRoutesInfo.value = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getCurrentCity = (cityEnglishName: string) => {
      cityList.forEach((cityObj: City) => {
        if (cityEnglishName === cityObj.value) {
          currentCityZhtw.value = cityObj.name;
        }
      });
    };

    const getBusRouteByBusStop = async() => {
      try {
        const res = await busHandler.getBusStopOfRoutesByBusStop(city as string, stopName as string);
        if (res) {
          busRoutes.value = res.data;
        }
      } catch (error) {
        console.log(error)
      }
    };

    const getCurrentBusStopRouteInfo = async() => {
      currentBusStopAllRoutesInfo.value = busRoutes.value.reduce((result: any[], route: any) => {
        for (let info of allBusRoutesInfo.value) {
          if (route.RouteUID === info.RouteUID) {
            result.push(info);
          }
        }
        return result;
      }, [])
    };

    const findBusRoute = (routeName: string) => {
      router.push(`/find-bus-route/${city}/${routeName}`);
    };

    const getBusStopPosition = async() => {
      try {
        isLoading.value = true;
        const res = await busHandler.getOneBusStopInfo(city as string, stopName as string);
        if (res) {
          const {PositionLon, PositionLat} = res.data[1].StopPosition;
          currentBusStopPostion.value = {
            lat: PositionLat as number,
            lng: PositionLon as number,
          };
        }
        isLoading.value = false;
      } catch (error) {
        console.log(error);
        isLoading.value = false;
      }
    };

    const sharePageInfo = () => {
      const string = `查看等等公車的${currentCityZhtw.value} ${stopName}站牌 即時資訊： https://jolinhappy.github.io/find-bus-app/#${route.fullPath}`
      navigator.clipboard.writeText(string)
      Toast.fire({
        icon: 'success',
        title: '太棒了！ 複製成功！'
      });
    };

    const goUseGps = () => {
      window.open(`https://www.google.com/maps/dir/${currentBusStopPostion.value.lat},${currentBusStopPostion.value.lng}`);
    };

    onMounted(async() => {
      await getOneCityAllBusRoute(city as string);
      await getBusRouteByBusStop();
      getCurrentBusStopRouteInfo();
      getBusStopPosition();
    });
    return {
      getOneCityAllBusRoute,
      getCurrentCity,
      findBusRoute,
      sharePageInfo,
      goUseGps,
      busRoutes,
      currentCityZhtw,
      stopName,
      currentBusStopAllRoutesInfo,
      currentBusStopPostion,
      isShowStopMap,
      city,
      isLoading,
    }
  },
  created() {
    this.getCurrentCity(this.city as string);
  }
});
</script>

<style lang="scss">
// mobile
.bus-stop-info {
  height: calc(100vh - 66px);
  box-sizing: border-box;
  background-color: #2FC3B1;
  position: relative;
  padding-top: 10px;
  .action-section {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 12px;
    padding: 0 24px 0 10px;
  }
  .info-section {
    padding: 0 24px 0 19px;
    color: #1E373F;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .pc {
      display: none;
    }
    &__name {
      font-weight: 600;
      font-size: 24px;
      padding-right: 12px;
    }
    &__share-button {
      width: 140px;
      height: 44px;
      font-size: 14px;
      border: 1px solid #FFFFFF;
      box-sizing: border-box;
      margin-left: auto;
      border-radius: 40px;
      display: flex;
      color: #fff;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 12px;
      }
    }
  }
  .route-list {
    h3 {
      display: none;
    }
    .route-list__container {
      padding: 30px 35px;
      overflow: auto;
      height: calc(100vh - 300px);
      .list-item {
        & +.list-item {
          margin-top: 12px;
        }
      }
      p {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
  .bus-map-gps  {
    background: rgba(38, 147, 133, 0.5);
    position: absolute;
    bottom: 0;
    box-shadow: 0px -4px 10px rgba(19, 23, 20, 0.15);
    backdrop-filter: blur(50px);
    border-radius: 20px 20px 0px 0px;
    width: 100%;
    height: 74px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #2FC3B1;
    padding: 15px 20px;
    box-sizing: border-box;
    &__map-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 47%;
      height: 44px;
      background: #fff;
      border-radius: 40px;
      img {
        width: 21px;
        margin-right: 12.5px;
      }
    }
    &__gps-button {
      width: 47%;
      height: 44px;
      background: #fff;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        margin-right: 12.5px;
      }
    }
  }
  .stop-map-section {
    display: none;
  }
}


@media screen and (min-width: 768px) {
  .bus-stop-info {
    min-height: calc(100vh - 146px);
    height: auto;
    box-sizing: border-box;
    background: #E5E5E5;
    position: relative;
    padding-top: 10px;
    .action-section {
      display: flex;
      align-items: center;
      color: #0B6987;
      font-size: 12px;
      padding: 0 80px;
    }
    .info-section {
      padding: 0 80px;
      color: #1E373F;
      display: flex;
      align-items: center;
      margin: 48px 0 38px 0;
      .pc {
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
        & + .pc {
          margin-left: 20px;
        }
        &:hover {
          box-shadow: 0 0;
        }
        img {
          width: 20px;
          height: 20px;
          margin-right: 12px;
        }
      }
      .mobile {
        display: none;
      }
      &__name {
        font-weight: 600;
        font-size: 40px;
        padding-right: 12px;
        color: #2FC3B1;
      }
      &__share-button {

        font-size: 14px;
        margin-left: auto;

        display: flex;
        color: #2FC3B1;
        border: 0;
        box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.25);

      }

    }
    .route-list {
      padding: 0 80px;
      h3 {
        display: block;
      }
      .route-list__container {
        min-height: 300px;
        padding: 0px;
        overflow: auto;
        padding-bottom: 150px;
        height: auto;
        .list-item {
          & +.list-item {
            margin-top: 12px;
          }
          &:hover {
            background: #E8F9F7;
          }
        }
        p {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }
      }
    }
    .bus-map-gps  {
      display: none;
    }
    .stop-map-section {
      display: block;
      padding: 0 80px;
      margin-bottom: 50px;
      .map__container {
        width: 100%;
        height: 450px;
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        .map {
          height: 100%;
        }
      }
    }
    h3 {
      text-align: left;
      color: #1E373F;
      font-size: 27px;
      font-weight: 600;
      margin-bottom: 20px;
      line-height: 150%;
    }
  }
}

</style>

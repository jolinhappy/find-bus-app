<template>
  <div class="home">
    <BaseLayout>
      <template #header>
        <HeaderBar/>
      </template>
      <template #body>
        <section class="body-section"> 
          <h2>全台公車一次找</h2>
          <article class="bus">
            <div class="article-title">
              <h3>找公車</h3>
              <div class="decoration-line"></div>
            </div>
            <div class="article-content">
              <div class="button-row">
                <div class="button" @click="selectCity('Taipei')">
                  <img src="../assets/bus-icon.png" alt="">
                  <h4>台北</h4>
                </div>
                <div class="button" @click="selectCity('Taichung')">
                  <img src="../assets/bus-icon.png" alt="">
                  <h4>台中</h4>
                </div>
              </div>
              <div class="button-row">
                <div class="button" @click="selectCity('Kaohsiung')">
                  <img src="../assets/bus-icon.png" alt="">
                  <h4>高雄</h4>
                </div>
                <div class="button" @click="selectCity('Tainan')">
                  <img src="../assets/bus-icon.png" alt="">
                  <h4>台南</h4>
                </div>
              </div>
              <div class="button-row">
                <div class="button" @click="selectCity('Hsinchu')">
                  <img src="../assets/bus-icon.png" alt="">
                  <h4>新竹</h4>
                </div>
                <div class="button" @click="$router.push('/other-city')">
                  <img src="../assets/bus-icon.png" alt="">
                  <div class="other">
                    <h4>其他</h4>
                    <img src="../assets/down.png" alt="">
                  </div> 
                </div>
              </div>
            </div>
          </article>
          <article class="highway-bus">
            <div class="article-title">
              <h3>找客運</h3>
              <div class="decoration-line"></div>
            </div>
          </article>
        </section>
      </template>
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import HeaderBar from '@/components/common/HeaderBar.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    BaseLayout,
    HeaderBar,
  },
  setup() {
    const router = useRouter();
    const mainCitiesArray = [
      {
        name: '臺北市',
        value: 'Taipei'
      },
      {
        name: '臺中市',
        value: 'Taichung'
      },
      {
        name: '高雄市',
        value: 'Kaohsiung'
      },
      {
        name: '臺南市',
        value: 'Tainan'
      },
      {
        name: '新竹市',
        value: 'Hsinchu'
      },
    ]
    const selectCity = (city: string) => {
      router.push(`/find-bus/${city}`);
    };
    const selectOther = () => {
      router.push('/other-city')
    }
    return {
      selectCity,
    }
  }
});
</script>

<style lang="scss">
// mobile
.home {
  .body-section {
    height: 100%;
    background: linear-gradient(143.04deg, #70EBB0 13.42%, #40CACA 84.3%);
    h2 {
      padding: 25px 0;
      font-size: 28px;
      font-weight: 700;
      color: #fff;
      line-height: 150%;
    }
  }
  .article-title {
    display: flex;
    position: relative;
    h3 {
      text-align: left;
      margin-bottom: 35px;
      font-size: 20px;
      margin-right: auto;
    }
    .decoration-line {
      width: 80px;
      height: 20px;
      border-bottom: 2px solid #81E1D5;
      position: absolute;
      right: 0;
      top: -25%;
      &:after {
        content: '';
        height: 9px;
        border-right: 2px solid #81E1D5;
        position: absolute;
        bottom: 0;
        right: 2px;
        transform: rotate(-20deg);
      }
    }
  }
  article {
    height: 100%;
    border-start-end-radius: 40px;
    &.bus {
      background-color: #fff;
      box-shadow: 0px -8px 10px rgba(75, 77, 78, 0.1);
      padding: 24px 26px 35px 26px;
    }
    &.highway-bus {
      width: 100%;
      height: 100px;
      background-color: #E8F9F7;
      position: absolute;
      padding: 35px 30px;
      box-sizing: border-box; 
      bottom: 0;
    }
  }
  .article-content {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    margin-bottom: 40px;
    gap: 35px;
    .button-row {
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      gap: 40px;
      width: 100%;
    }
    .button {
      min-width: 120px;
      background-color: #2FC3B1;
      border-radius: 26px;
      padding: 20px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: 500;
      font-size: 22px;
      color: #fff;
      cursor: pointer;
      img {
        width: 26px;
        margin-bottom: 21px;
      }
      .other {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          display: block;
          width: 12px;
          line-height: 22px;
          margin: 0;
        }
      }
      &:hover {
        box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.6);
      }
    }
  }
}


@media screen and (min-width: 768px) {
  .home {
    article.highway-bus {
      all: unset;
      position: absolute;
      left: 50%;
      bottom: 13%;
      transform: translate(-50%);
      .article-title {
        width: 290px;
        background-color: #E8F9F7;
        height: 80px;
        border-radius: 26px;
        box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.2);
        color: #2FC3B1;
        cursor: pointer;
        h3 {
          font-size: 22px;
          font-weight: 500;
          margin: auto;
        }
      }
      .decoration-line {
        display: none;
        
      }
    }
  }
}

</style>

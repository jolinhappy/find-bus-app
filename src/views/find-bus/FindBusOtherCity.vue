<template>
  <BaseLayout>
    <template #header>
      <HeaderBar/>
    </template>
    <template #body>
      <section class="body-section other"> 
        <article class="city-list__container">
          <div class="article-title">
            <img src="../../assets/arrow.png" alt="">
            <h3>找公車</h3>
            <div class="decoration-line"></div>
          </div>
          <div class="article-content">
            <div class="city-list">
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台北</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台中</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台北</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台中</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台北</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台中</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台北</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台中</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台北</h4>
              </div>
              <div class="city-list__button">
                <img src="../../assets/bus-icon.png" alt="">
                <h4>台中</h4>
              </div>
            </div>
          </div>
        </article>
      </section>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import HeaderBar from '@/components/common/HeaderBar.vue';

export default defineComponent({
  name: 'FindBusOtherCity',
  components: {
    BaseLayout,
    HeaderBar,
  },
});
</script>

<style lang="scss">
// mobile
.other {
  height: calc(100vh - 66px);
  background: linear-gradient(143.04deg, #70EBB0 13.42%, #40CACA 84.3%);
  padding-top: 20px;
  box-sizing: border-box;
  .city-list__container {
    background: #fff;
    border-radius: 0px 40px 0px 0px;
    height: calc(100vh - 86px);
    padding: 24px 25px 0 25px;
    box-sizing: border-box;
  }
  .article-title {
    display: flex;
    position: relative;
    height: 36px;
    margin-bottom: 26px;
    img {
      width: 36px;
      height: 36px;
    }
    h3 {
      text-align: left;
      margin-bottom: 35px;
      font-size: 20px;
      margin-right: auto;
      line-height: 36px;
    }
    .decoration-line {
      width: 80px;
      height: 20px;
      border-bottom: 2px solid #81E1D5;
      position: absolute;
      right: 0;
      top: -8%;
      &:after {
        content: '';
        height: 9px;
        border-right: 2px solid #81E1D5;
        position: absolute;
        bottom: -1px;
        right: 1.5px;
        transform: rotate(-20deg);
      }
    }
  }
  .article-content {
    .city-list {
      &__button {
        height: 50px;
        width: 100%;
        border-radius: 16px;
        background: #2FC3B1;
        display: flex;
        padding: 13px 17px;
        box-sizing: border-box;
        & + .city-list__button {
          margin-top: 12px;
        }
        img {
          width: 22px;
          height: 24px;
        }
        h4 {
          color: #fff;
          font-weight: 500;
          font-size: 22px;
          margin-left: 12px;
        }
      }
    }
  }
}


@media screen and (min-width: 768px) {
  .other {
    .article-content {
      display: flex;
      justify-content: center;
    }
    .city-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 15px;
      &__button {
        min-width: 235px;
      }
      .city-list__button {
        + .city-list__button {
          margin-top: 0px;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .other {
    .city-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 15px;
      &__button {
        min-width: 245px;
        max-width: 350px;
      }
      .city-list__button {
        + .city-list__button {
          margin-top: 0px;
        }
      }
    }
  }
}



</style>

<template>
  <div class="find-bus">
    <BaseLayout>
      <template #header>
        <HeaderBar/>
        <div class="search-bar">
          <img src="../assets/arrow.png" alt="">
          <div class="city">台北</div>
          <input type="text" placeholder="搜尋公車號">
        </div>
      </template>
      <template #body>
        <section class="bus-info">
          <article class="bus-list">
            <BusInfoCard />
            <BusInfoCard />
            <BusInfoCard />
            <BusInfoCard />
            <BusInfoCard />
            <BusInfoCard />
          </article>
          <article class="search-keyboard">
            <div class="keyboard">
              <div class="keyboard__item red">紅</div>
              <div class="keyboard__item blue">藍</div>
              <div class="keyboard__item">1</div>
              <div class="keyboard__item">2</div>
              <div class="keyboard__item">3</div>
              <!--  -->
              <div class="keyboard__item green">綠</div>
              <div class="keyboard__item brown">棕</div>
              <div class="keyboard__item middle-row-item">4</div>
              <div class="keyboard__item middle-row-item">5</div>
              <div class="keyboard__item middle-row-item">6</div>
              <!--  -->
              <div class="keyboard__item orange">橘</div>
              <div class="keyboard__item small">小</div>
              <div class="keyboard__item">7</div>
              <div class="keyboard__item">8</div>
              <div class="keyboard__item">9</div>
              <!--  -->
              <div class="keyboard__item">其他</div>
              <div class="keyboard__item">幹線</div>
              <div class="keyboard__item zero">0</div>
              <div class="keyboard__item clear">清除</div>
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
import BusInfoCard from '@/components/common/BusInfoCard.vue';

export default defineComponent({
  name: 'FindBus',
  components: {
    BaseLayout,
    HeaderBar,
    BusInfoCard,
  },
});
</script>

<style lang="scss">
// mobile
.find-bus {
  .search-bar {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    background-color: #fff;
    position: fixed;
    border-radius: 0px 0px 30px 30px;
    box-shadow: 0px 8px 10px rgba(75, 77, 78, 0.1);
    top: 66px;
    img {
      width: 36px;
      line-height: 44px;
      display: block;
      margin-top: 2px;
      margin-left: 10px;
    }
    .city {
      line-height: 44px;
      color: #0B6987;
      font-size: 16px;
    }
    input {
      margin: 0 auto;
      height: 44px;
      width: 60%;
      border-radius: 12px;
      box-shadow: 0px 4px 10px rgba(19, 23, 20, 0.15);
      box-sizing: border-box;
      border: 1px solid #81E1D5;
      padding: 10px 20px;
    }
  }
  .bus-info {
    height: calc(100vh - 66px);
    box-sizing: border-box;
    padding-top: 64px;
    background-color: #2FC3B1;
    .bus-list {
      height: calc(65% - 105px);
      padding: 30px 35px;
      overflow: auto;
      .list-item {
        & +.list-item {
          margin-top: 12px;
        }
      }
    }
  }
  .search-keyboard {
    height: calc(35% - 40px);
    width: calc(100% - 40px);
    background: rgba(38, 147, 133, 0.5);
    box-shadow: 0px -2px 6px rgba(23, 96, 87, 0.1);
    border-radius: 20px 20px 0px 0px;
    position: absolute;
    bottom: 0;
    padding: 20px;
    .keyboard {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      // grid-template-columns: 1fr 1fr minmax(1fr, 1.5fr) minmax(1fr, 1.5fr) 1fr;
      height: 100%;
      grid-gap: 8px;
      box-sizing: border-box;
      .keyboard__item {
        width: 100%;
        height: 100%;
        background: #F2F3F1;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 19px;
        font-family: 'Rubik';
        &.red {
          color: #E93800;
        }
        &.blue {
          color: #0D7FA3;
        }
        &.green {
          color: #249C8D;
        }
        &.brown {
          color: #945E1F;
        }
        &.orange {
          color: #FF7A50;
        }
        &.small {
          color: #EBB700;
        }
        &.middle-row-item {
          color: #249C8D;;
        }
        &.zero, &.clear {
          width: 160%;
        }
        &.clear{
          margin-left: 57%;
        }
      }
    }
  }
}


</style>

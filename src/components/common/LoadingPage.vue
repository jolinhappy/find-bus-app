<template>
  <div class="loading">
    <div class="loading-img-box">
      <img src="../../assets/loading-icon.png" alt="loading-logo">
      <p>載入中... 請稍等</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingPage',
  setup() {
    return {}
  },
})
</script>


<style lang="scss">
.loading {
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  display: flex;
  top: 0;
  .loading-img-box {
    width: 120px;
    height: 120px;
    background: rgba(30, 55, 63, 0.8);
    border-radius: 30px;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: #fff;
    justify-content: center;
    align-items: center;
    img {
      width: 36px;
      height: 40px;
      margin-bottom: 20px;
      animation: spinner 0.65s infinite;
    }
    p {
      animation: text 1s infinite;
    }
  }
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes text {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.3;
    }
  }
}

@media screen and (min-width: 768px) {
  .loading {
    .loading-img-box {
      width: 180px;
      height: 180px;
      border-radius: 40px;
      img {
        width: 46px;
        height: 50px;
      }
    }
  }
}

</style>
<template>
  <section class="header-bar">
    <div class="header-bar__logo">
      <img src="../../assets/logo.png" alt="">
    </div>
    <h1>
      全台公車整合資訊網
    </h1>
  </section>
</template>

<style lang="scss">
.header-bar {
  height: inherit;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  background-color: #fff ;
  z-index: 1;
  &__logo {
    img {
      width: 109px;
      display: block;
    }
  }
  h1 {
    font-weight: normal;
    line-height: 18px;
    color: #3d403e;
  }
}

@media screen and (min-width: 768px) {
  .header-bar {
    padding: 0 120px;
    box-sizing: border-box;
    &__logo {
      img {
        width: 133px;
      }
    }
    h1 {
      font-size: 16pz;
    }
  }
}
</style>
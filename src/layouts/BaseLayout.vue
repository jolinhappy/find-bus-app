<template>
  <div class="baseLayout">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
      
    </div>
    <div class="footer">
      <slot name="footer"></slot>
      <p>全台公車動態時刻查詢應用服務本網站 The F2E所有 Copyright©2021</p>
    </div>

  </div>
</template>

<style lang="scss">
/// mobile
.baseLayout {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 66px;
  }
  .body {
    flex: 1;
  }
  .footer {
    display: none;
  }
}

@media screen and (min-width: 768px) {
 .baseLayout{
   height: auto;
  .footer {
    display: flex;
    height: 80px;
    background: #4D514F;
    color: #CED0CE;
    font-size: 14px;
    line-height: 21px;
    justify-content: center;
    align-items: center;
  }   
 }

}


</style>
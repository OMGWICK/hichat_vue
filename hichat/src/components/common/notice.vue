<template>
  <div class="pl_notice">
      <div class="pl_f_notice"><slot name="title"></slot></div>
      <p><slot name="content"></slot></p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.pl_notice {
  background: #ffffff;
  margin-bottom: 16px;
  .pl_f_notice {
    padding-left: 14px;
    border-bottom: 1px solid #d9d9d9;
    text-align: left;
    line-height: 46px;
    font-size: 14px;
    font-weight: 800;
    font-family: Arial, Helvetica, sans-serif;
  }
  p {
    margin: 0px;
    padding: 14px;
    font-size: 12px;
    color: #333333;
    letter-spacing: 2px;
    line-height: 16px;
  }
}
</style>

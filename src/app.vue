<template>
  <div
    id="app"
    :class="langCss"
  >
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
      />
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
    />
  </div>
</template>

<script>  
export default {
    data() {
        return{
            langCss:''
        }
    },
    mounted() {
        if(this.$i18n.locale == 'zh') {
            this.langCss = ''
        }else{
            this.langCss = this.$i18n.locale
        }
    },
};
</script>

<style scoped lang="less">
 
</style>

<style lang="less">
#app{
  font-size:14px;
  font-family:MicrosoftYaHei;
  position: absolute;
  width:100%;
  height:100%;
}
</style>

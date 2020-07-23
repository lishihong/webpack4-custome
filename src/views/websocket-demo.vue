<template>
  <div class="m-contianer">
    websocket连接demo 
  </div>
</template>

<script>
 
export default {
  
    data() {
        return{
            token:"",
            wsTimer:null,
            wsEle:null,
        }
    },
  
    created() {
        
    },
    mounted() {
        
    },
    methods: {
        wsInit(url) {
            if (!url) {
                return;  
            }
            this.closeWs();
            const ws = new WebSocket(url,this.token)
            this.wsEle = ws;
            ws.onopen = () => {
                this.clearTimer()
            };
            ws.onmessage = (res = {}) => {
                this.dealData(res)
            }
            ws.onerror = () => {
                this.reconnectWs()
            }
            ws.onclose = () => {
                this.reconnectWs()
            }
        },
        dealData(res) {
            console.log(res)  
        },
        clearTimer() {
            if (this.wsTimer) {
                clearInterval(this.wsTimer)
                this.wsTimer = null
            }
        },
        reconnectWs() {
            if (!this.wsEle) {
                return
            }
            if (!this.wsTimer) {//每5s重连一次
                this.wsTimer = setInterval(() => {
                    this.getSubscribeInfosFun()
                }, 5000)
            }
        },
        getSubscribeInfosFun() {
            const parmas = {
                networkProtocol: 'websocket',
                subscribeInfos: [{
                    subscribeType: 'realtime_datahub',
                    pushRate: Number(this.wsInter) * 1000,
                    paramIds: [this.deviceParamId],
                }],
            };
            this.requstUtil.get(this.urls.ws.url,parmas).then(url => {
                this.wsInit(url)
            })
        },
    }
};
</script>

<style scoped lang="less">
.m-contianer{
    height:100%;
    position: relative;
}
</style>

<style lang="less">
 
</style>

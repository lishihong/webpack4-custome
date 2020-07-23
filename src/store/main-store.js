const state = {
    cancelTokenArr:[]
}

const mutations = {
    pushToken(state, payload) {
        state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken(state) {
        state.cancelTokenArr.forEach(item => {
            item('取消请求')
        })
        state.cancelTokenArr = []
    }
}

const actions = {
     
}

export default {
    state,
    mutations,
    actions
}

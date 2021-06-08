/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-14
 * @description: 指令
 */
import Vue from 'vue'

/**
 * 防连击
 *  v-throttle or v-throttle="1000"
 */
Vue.directive('throttle', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            el.style.pointerEvents = 'none'
            if (!el.disabled) {
                setTimeout(() => {
                    el.style.pointerEvents = 'auto'
                }, binding.value || 1000)
            }
        })
    }
})

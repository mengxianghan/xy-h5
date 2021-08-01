/**
 * @name throttle
 * @description 节流，防连点
 * @example v-throttle 或 v-throttle=“500”
 * @type {{inserted(*, *): void}}
 */
const throttleDirective = {
    mounted(el, binding) {
        el.addEventListener('click', () => {
            el.style.pointerEvents = 'none'
            if (!el.disabled) {
                setTimeout(() => {
                    el.style.pointerEvents = 'auto'
                }, binding.value || 1000)
            }
        })
    }
}

export function setupThrottleDirective(app) {
    app.directive('throttle', throttleDirective)
}

export default throttleDirective

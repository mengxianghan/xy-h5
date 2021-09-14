<template>
    <div class="x-pdf-viewer">
        <div class="x-pdf-viewer__main"
             ref="pdfViewerContainer">
            <div></div>
        </div>
    </div>
</template>

<script>
/**
 * @name pdf 查看器
 *
 * @property {string} url 文件地址
 */
export default {
    name: 'PdfViewer',
    props: {
        url: {
            type: String,
            default: '',
            required: true
        }
    },
    data() {
        return {
            container: null
        }
    },
    watch: {
        url() {
            this.open()
        }
    },
    mounted() {
        this.open()
    },
    methods: {
        open() {
            if (window.pdfLoadingTask) {
                return this.close().then(() => {
                    return this.open()
                })
            }
            const {url} = this
            this.container = this.$refs.pdfViewerContainer
            this.container.style.position = 'absolute'
            pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.8.335/build/pdf.worker.min.js'
            const eventBus = new pdfjsViewer.EventBus()
            const linkService = new pdfjsViewer.PDFLinkService({
                eventBus
            })
            const l10n = pdfjsViewer.NullL10n
            const pdfViewer = new pdfjsViewer.PDFViewer({
                container: this.$refs.pdfViewerContainer,
                eventBus,
                linkService,
                l10n,
                useOnlyCssZoom: true,
                textLayerMode: 0,
                removePageBorders: true // 移除左右白边
            })
            linkService.setViewer(pdfViewer)
            const pdfHistory = new pdfjsViewer.PDFHistory({
                eventBus,
                linkService
            })
            linkService.setHistory(pdfHistory)

            eventBus.on('pagesinit', function () {
                pdfViewer.currentScaleValue = 'auto'
            })

            const loadingTask = pdfjsLib.getDocument({
                url,
                maxImageSize: 1024 * 1024 * 1024,
                cMapPacked: true
            })
            // 加载进度
            loadingTask.onProgress = ({loaded, total}) => {
                this.$emit('progress', {loaded, total})
            }
            // 加载完成
            loadingTask.promise.then((pdfDocument) => {
                pdfViewer.setDocument(pdfDocument)
                linkService.setDocument(pdfDocument)
                pdfHistory.initialize({fingerprint: pdfDocument.fingerprint})

                this.container.style.position = ''
                window.pdfLinkService = linkService
                window.pdfLoadingTask = loadingTask
                window.pdfDocument = pdfDocument
                window.pdfViewer = pdfViewer
                window.pdfHistory = pdfHistory
                //window.pdfEventBus = eventBus
                //window.pdfL10n = l10n

                this.$emit('success')
            }, (err) => {
                this.$emit('error', err)
            })
        },
        close() {
            if (this.container) {
                this.container.style.position = 'absolute'
            }
            if (!window.pdfLoadingTask) {
                return Promise.resolve()
            }
            const promise = window.pdfLoadingTask.destroy()
            window.pdfLoadingTask = null
            if (window.pdfDocument) {
                window.pdfDocument = null
                window.pdfViewer.setDocument(null)
                window.pdfLinkService.setDocument(null, null)
                if (window.pdfHistory) {
                    window.pdfHistory.reset()
                }
            }
            return promise
        }
    }
}
</script>

<style lang="scss"
       scoped>
.x-pdf-viewer {
    &__main {
        //position: absolute;
        //left: 0;
        //right: 0;
        //top: 0;
        //bottom: 0;
        height: 100vh;
        overflow: hidden;
        overflow-y: auto;

        ::v-deep {
            .page {
                box-sizing: content-box;
                margin: 0 auto;

                &:not(:last-child) {
                    margin-bottom: 12px;
                }
            }
        }
    }
}
</style>

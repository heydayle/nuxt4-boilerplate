import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

const SuccessIcon = new URL(`./../assets/icons/color/success.svg`, import.meta.url).href
export const SweetAlertOptions = {
  reverseButtons: true,
  confirmButtonColor: '#00C16A',
  cancelButtonColor: 'transparent',
  width: '400px',
  height: '260px',
  title: 'Alert',
  text: 'Content message',
  customClass: 'ec-alert',
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  showCancelButton: true,
  imageUrl: SuccessIcon,
}
export const ToastOptions = {
  toast: true,
  position: 'top-end',
  reverseButtons: true,
  timer: 5000,
  width: '360px',
  height: '64px',
  title: 'Toast',
  text: 'Content message',
  customClass: 'ec-toast',
  imageUrl: SuccessIcon,
}
const $swal = {
  install: (Vue: any, options: any) => {
    Vue.provide('Swal', Swal.mixin(options))
  },
}
const $toast = {
  install: (Vue: any, options: any) => {
    Vue.provide('Toast', Swal.mixin(options))
  },
}
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use($swal, SweetAlertOptions)
  nuxtApp.vueApp.use($toast, ToastOptions)
})
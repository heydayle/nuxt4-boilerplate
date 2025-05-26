// Documents: packages/web-base/contents/alert.md
import type { SweetAlertOptions } from 'sweetalert2'

const SuccessIcon = new URL(`./../assets/icons/color/success.svg`, import.meta.url).href
const ErrorIcon = new URL(`./../assets/icons/color/error.svg`, import.meta.url).href
const WarningIcon = new URL(`./../assets/icons/color/warning.svg`, import.meta.url).href
const ConfirmIcon = new URL(`./../assets/icons/color/question.svg`, import.meta.url).href

type IAlert = SweetAlertOptions & {
  title?: string
  text?: string
  confirmButtonText?: string
  customClass?: 'success' | 'error' | 'warning' | 'confirm' | string
  actionConfirm?: () => void
  actionCancel?: () => void
  imageUrl?: string
}
interface IDefaultSweetAlert {
  fire: (options: IAlert, attr1?: any, attr2?: any) => any
}
export function useAlert() {
  const alert = inject<IDefaultSweetAlert>('Swal') as IDefaultSweetAlert
  const show = (options?: IAlert) => {
    alert.fire({
      ...options,
      text: options?.text,
    })
  }
  const showError = (options?: IAlert) => {
    alert.fire({
      ...options,
      title: options?.title || 'Error',
      text: options?.text || 'message',
      customClass: 'ec-alert error',
      imageUrl: ErrorIcon,
    }).then((result) => {
      if (result.isConfirmed && options?.actionConfirm)
        options.actionConfirm()
      else if (options?.actionCancel)
        options?.actionCancel()
    })
  }
  const showWarning = (options?: IAlert) => {
    alert.fire({
      ...options,
      title: options?.title || 'Warning',
      text: options?.text || 'message',
      customClass: 'ec-alert warning',
      imageUrl: WarningIcon,
    }).then((result) => {
      if (result.isConfirmed && options?.actionConfirm)
        options.actionConfirm()
      else if (options?.actionCancel)
        options?.actionCancel()
    })
  }
  const showSuccess = (options?: IAlert) => {
    alert.fire({
      ...options,
      title: options?.title || 'Success',
      text: options?.text || 'message',
      customClass: 'ec-alert success',
      imageUrl: SuccessIcon,
    }).then((result) => {
      if (result.isConfirmed && options?.actionConfirm)
        options.actionConfirm()
      else if (options?.actionCancel)
        options?.actionCancel()
    })
  }
  const showConfirm = (options?: IAlert) => {
    alert
      .fire({
        ...options,
        title: options?.title || 'Confirm',
        text: options?.text || 'message',
        customClass: 'ec-alert confirm',
        showCancelButton: true,
        imageUrl: ConfirmIcon,
      })
      .then((result: any) => {
        if (result.isConfirmed && options?.actionConfirm)
          options.actionConfirm()
        else if (options?.actionCancel)
          options?.actionCancel()
      })
  }
  return {
    alert,
    show,
    error: showError,
    warning: showWarning,
    success: showSuccess,
    confirm: showConfirm,
  }
}
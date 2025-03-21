import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
})
const showAlertSucess = (message: string) => {
  Swal.fire({
    title: 'Success',
    text: message,
    icon: 'success'
  })
}
const showAlertError = (message: string) => {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error'
  })
}
const showToastSuccess = (message: string) => {
  Toast.fire({
    icon: 'success',
    title: message
  })
}
const showToastError = (message: string) => {
  Toast.fire({
    icon: 'error',
    title: message
  })
}

export { showToastSuccess, showToastError, showAlertError, showAlertSucess }

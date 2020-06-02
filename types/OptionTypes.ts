export type CallbackOption = (data?: any) => void

export type SuccessAndFailCb = {
  success?: CallbackOption
  fail?: CallbackOption
}

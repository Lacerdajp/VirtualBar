/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('cnpj', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }
  let regex = /\D/g

  if (value[2] !== '.' || value[6] !== '.' || value[10] !== '/' || value[15] !== '-' ||
    value.length !== 18 || regex.test(value.substring(0, 1)) || regex.test(value.substring(3, 5))
    || regex.test(value.substring(7, 9)) || regex.test(value.substring(11, 14)) ||
    regex.test(value.substring(16, 17))
  ) {

    options.errorReporter.report(
      options.pointer,
      'cnpj',
      'cnpj validation failed',
      options.arrayExpressionPointer
    )
  }
})
validator.rule('nome_estabelecimento', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }
  let regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]+$/;
  if (!regex.test(value)) {
    options.errorReporter.report(
      options.pointer,
      'nome',
      'nome validation failed',
      options.arrayExpressionPointer
    )
  }
})
validator.rule('nome', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }
  let regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/
  if (!regex.test(value)) {
    options.errorReporter.report(
      options.pointer,
      'nome',
      'nome validation failed',
      options.arrayExpressionPointer
    )
  }
})

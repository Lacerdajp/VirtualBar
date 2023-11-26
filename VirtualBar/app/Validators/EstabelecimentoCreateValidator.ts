import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator';

export default class EstabelecimentoCreateValidator extends BaseValidator {
  constructor() {
    super()
  }


  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nome_estabelecimento: schema.string([
      rules.nome_estabelecimento(),
    ]),
    cnpj: schema.string([
      rules.cnpj(),
      rules.unique({ table: 'estabelecimentos', column: 'cnpj' }),
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string(),
    tipo: schema.array().members(schema.string()),
    img: schema.string.optional(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = { ...this.messages }
}

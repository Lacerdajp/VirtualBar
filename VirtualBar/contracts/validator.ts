declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    cnpj(): Rule
    nome(): Rule
    nome_estabelecimento(): Rule
  }
}

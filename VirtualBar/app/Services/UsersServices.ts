import User from 'App/Models/User'

export default class UsersServices {
  constructor() {}

  public async create(email: string, password: string,isEstabelecimento:boolean) {
    const user = await User.create({
      password,
      email,
      isEstabelecimento
    })

    return user
  }

  // public async buscarEmail(email:string){
  //   const user = await User.findByOrFail('email', email);
  //     return user
  // }
}

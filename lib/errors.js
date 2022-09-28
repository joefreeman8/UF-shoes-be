// created a class which extends all the information from Error & enables me to change the name to NotFound

export class NotFound extends Error {
  constructor() {
    super()

    this.name = 'NotFound'
  }
}

export class Unauthorized extends Error {
  constructor() {
    super()

    this.name = 'Unauthorized'
  }
}
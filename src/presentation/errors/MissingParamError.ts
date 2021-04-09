export class MissingParamError extends Error {
  constructor (missingParam: string) {
    super(`Missing Param: ${missingParam}`)
    this.name = 'MissingParamError'
  }
}
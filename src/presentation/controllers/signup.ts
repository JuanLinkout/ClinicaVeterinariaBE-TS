import { EmailValidator } from './../../validation/protocols/email-validator';
import { MissingParamError } from './../errors/MissingParamError';
import { InvalidParamError } from './../errors/invalidParamError';
import { badRequest } from './../helpers/http-helpers';
import { HttpRequest, HttpResponse } from './../protocols/http';
import { Controller } from './../protocols/controller';

export class SignupController implements Controller {
    constructor (private readonly emailValidator: EmailValidator) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { body } = httpRequest
        const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']

        for (let param of requiredParams) {
            if (!httpRequest.body[param]) {
                return badRequest(new MissingParamError(param))
            }
        }

        const { password, passwordConfirmation, email } = httpRequest.body
        if (password !== passwordConfirmation) {
            return badRequest(new InvalidParamError('passwordConfirmation'))
        }

        this.emailValidator.isValid(email)
    }
}
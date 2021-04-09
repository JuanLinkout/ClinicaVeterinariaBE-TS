import { InvalidParamError } from './../errors/invalidParamError';
import { badRequest } from './../helpers/http-helpers';
import { HttpRequest, HttpResponse } from './../protocols/http';
import { Controller } from './../protocols/controller';

export class SignupController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { body } = httpRequest
        const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']

        for (let param of requiredParams) {
            if (!httpRequest.body[param]) {
                return badRequest(new Error())
            }
        }

        if (body.password !== body.passwordConfirmation) {
            return badRequest(new InvalidParamError('passwordConfirmation'))
        }
    }
}
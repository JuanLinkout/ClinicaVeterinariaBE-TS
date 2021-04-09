import { EmailValidator } from './../../validation/protocols/email-validator'
import { MissingParamError } from './../errors/MissingParamError'
import { InvalidParamError } from './../errors/invalidParamError'
import { badRequest } from './../helpers/http-helpers'
import { HttpRequest, HttpResponse } from './../protocols/http'
import { SignupController } from './signup'


class EmailValidatorStub implements EmailValidator {
    async isValid(email: string): Promise<boolean> {
        return true
    }
}

describe("Signup Contoller", () => {
    it("Should return 400 if no name is provided", async () => {
        const sut = new SignupController(new EmailValidatorStub())

        const httpRequest = {
            body: {
                name: '',
                email: 'anyemail@gmail.com',
                password: 'anypassword',
                passwordConfirmation: 'anypassword'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    })

    it("Should return 400 if no email is provided", async () => {
        const sut = new SignupController(new EmailValidatorStub())

        const httpRequest = {
            body: {
                name: 'anyname',
                email: '',
                password: 'anypassword',
                passwordConfirmation: 'anypassword'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })

    it("Should return 400 if no password is provided", async () => {
        const sut = new SignupController(new EmailValidatorStub())

        const httpRequest = {
            body: {
                name: 'anyname',
                email: 'anyemail@gmail.com',
                password: '',
                passwordConfirmation: 'anypassword'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
    })

    it("Should return 400 if no passwordConfirmation is provided", async () => {
        const sut = new SignupController(new EmailValidatorStub())

        const httpRequest = {
            body: {
                name: 'anyname',
                email: 'anyemail@gmail.com',
                password: 'anypassword',
                passwordConfirmation: ''
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
    })

    it("Should return custom error if passwordConfirmation is invalid", async () => {
        const sut = new SignupController(new EmailValidatorStub())

        const httpRequest = {
            body: {
                name: 'anyname',
                email: 'anyemail@gmail.com',
                password: 'anypassword',
                passwordConfirmation: 'anypassword123'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
    })

    it("Should return custom error if email is invalid", async () => {
        const emailValidator = new EmailValidatorStub()
        const sut = new SignupController(emailValidator)
        const isValidSpy = jest.spyOn(emailValidator, 'isValid')

        const httpRequest = {
            body: {
                name: 'anyname',
                email: 'anyemail@gmail.com',
                password: 'anypassword',
                passwordConfirmation: 'anypassword'
            }
        }

        await sut.handle(httpRequest)
        expect(isValidSpy).toHaveBeenCalledWith('anyemail@gmail.com')
    })
})
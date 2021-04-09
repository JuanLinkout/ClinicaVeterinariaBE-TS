import { badRequest } from './../helpers/http-helpers';
import { HttpRequest, HttpResponse } from './../protocols/http';
import { SignupController } from './signup';

describe("Signup Contoller", () => {
    it("Should return 400 if no name is provided", async () => {
        const sut = new SignupController();

        const httpRequest = {
            body: {
                name: '',
                email: 'anyemail@gmail.com',
                password: 'anypassword',
                passwordConfirmation: 'anypassword'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    it("Should return 400 if no email is provided", async () => {
        const sut = new SignupController();

        const httpRequest = {
            body: {
                name: 'anyname',
                email: '',
                password: 'anypassword',
                passwordConfirmation: 'anypassword'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new Error()))
    })
})
import LoginRouter from './login-router';
import MissingParamError from '../helpers/missingParamError';
import UnauthorizedError from '../helpers/UnauthorizedError';


// sut stands for System Under Test
const makeSut = () => {
    class AuthUseCaseSpy {
        auth(email, password) {
            this.email = email
            this.password = password
            return this.accessToken;
        }
    }
    
    const authUseCaseSpy = new AuthUseCaseSpy();
    authUseCaseSpy.accessToken = 'valid_token'
    return {
        authUseCaseSpy,
        sut: new LoginRouter(authUseCaseSpy)
    }
}

describe('Login Router', () => {
    test('Should return 400 if there is no provided email', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                password: '12345678'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if there is no provided password', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'anymail@icloud.com'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
    test('Should return 500 if there is no provided httpRequest', () => {
        const { sut } = makeSut()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })
    test('Should return 500 if the httpRequest does not contain a body attribute', () => {
        const { sut } = makeSut()
        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    })
    // I'm not really sure what my opinions are about this following test,
    // This seems like an implementation test, and I don't see the point of
    // this kind of test (unless you are a pretentious prick)
    // but I might be wrong
    test('Should call AuthUseCaseSpy with correct params', () => {
        const { sut, authUseCaseSpy } = makeSut()
        const httpRequest = {
            body: {
                email: 'anymail@gmail.com',
                password: '1234556'
            }
        }
        sut.route(httpRequest)
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
        expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
    })

    test('Should return 401 status for invalid credentials', () => {
        const { sut, authUseCaseSpy } = makeSut()
        authUseCaseSpy.accessToken = null;
        const httpRequest = {
            body: {
                email: 'anymail@gmail.com',
                password: '1234556'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(new UnauthorizedError())
    })

    test('Should return 500 status when no authUseCase is provided', () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                email: 'anymail@gmail.com',
                password: '1234556'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should return 200 status for valid credentidals authUseCase', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'validmail@gmail.com',
                password: 'validPassword'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
    })
})

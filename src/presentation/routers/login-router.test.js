class LoginRouter {
    route(httpRequest) {
        if (!httpRequest || !httpRequest.body) {
            return { statusCode: 500 }
        }
        
        const { email, password } = httpRequest.body;

        if (!email || !password) {
            return { statusCode: 400 }
        }
    }
}

describe('Login Router', () => {
    test('Should return 400 if there is no provided email', () => {
        // sut stands for System Under Test
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                password: '12345678'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 400 if there is no provided password', () => {
        // sut stands for System Under Test
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                email: 'anymail@icloud.com'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 500 if there is no provided httpRequest', () => {
        // sut stands for System Under Test
        const sut = new LoginRouter()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })
    test('Should return 500 if the httpRequest does not contain a body attribute', () => {
        // sut stands for System Under Test
        const sut = new LoginRouter()
        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    })
})

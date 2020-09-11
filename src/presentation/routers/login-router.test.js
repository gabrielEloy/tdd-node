class LoginRouter {
    route (httpRequest) {
        if(!httpRequest.body.email){
            return {statusCode: 400}
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
})

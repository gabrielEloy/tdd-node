import HttpResponse from '../helpers/httpResponse';

export default class LoginRouter {
    constructor(authUseCase){
        this.authUseCase = authUseCase;
    }
    
    route(httpRequest) {
        if (!httpRequest || !httpRequest.body || !this.authUseCase) {
            return HttpResponse.serverError()
        }
        
        const { email, password } = httpRequest.body;

        if (!email) {
            return HttpResponse.badRequest('email')
        }
        if (!password) {
            return HttpResponse.badRequest('password')
        }

        const accessToken = this.authUseCase.auth(email, password);

        
        return accessToken
        ? HttpResponse.ok()
        : HttpResponse.unauthorizedError()
    }
}

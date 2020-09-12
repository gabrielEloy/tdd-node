export default class UnauthorizedError extends Error {
    constructor(paramName = 'unauthorized'){
        super(paramName);
        this.name = 'UnauthorizedError'
    }
}
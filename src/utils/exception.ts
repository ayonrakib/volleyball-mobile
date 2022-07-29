export class ApiError extends Error{
    constructor(public code: number, message: string){
        super(message);
    }

    static fromApiError(apiError){
        let error = null;

        if(apiError !== null) {

            error = new ApiError(apiError.errorCode, apiError.errorMessage);

        }
        
        return error;
    }
}
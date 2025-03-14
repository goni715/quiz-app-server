class AppError extends Error{
    public statusCode: number;

    constructor(statusCode:number, message: string, stack=''){
        super(message);
        this.statusCode = statusCode;
    }
}


export default AppError;
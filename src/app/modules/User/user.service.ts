import ApiError from "../../errors/ApiError";


const registerUserService = () => {
    throw new ApiError(400, `Couldn't find this email address`);
    return "20";
}


export {
    registerUserService
}
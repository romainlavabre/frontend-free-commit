import enums from "../enum/enums";

export default function (error) {
    if (error == undefined || error.response === undefined || error.response.data === undefined || error.response.data.message === undefined) {
        return 'An error occurred';
    }

    return enums.error[error.response.data.message] !== undefined
        ? enums.error[error.response.data.message]
        : error.response.data.message;
}

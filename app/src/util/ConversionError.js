class ConversionError extends Error{
    constructor(message){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this,ConversionError);
        this.status = 405;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = ConversionError;
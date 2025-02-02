module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'production') {
        let message = err.message;
        let error ={...err}

       
        if(err.name == "ValidationError") {
            message = Object.values(err.errors).map(value => value.message)
            error = new Error(message)
            err.statusCode = 400
        }
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
};

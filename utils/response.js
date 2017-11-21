exports.success = (req, res) => {
    return (result) => {
        res.json(result);
    };
};

exports.error = (req, res) => {
    return (error) => {
        // TODO if error.message
        res.json({"Error":true, "ErrorMessage": error.message});
    };
};

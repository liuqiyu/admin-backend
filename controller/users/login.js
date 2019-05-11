const login = (req, res) => {
    const data = {
        username: req.body.username,
        role: 1,
    };
    return res.send({
        code: 200,
        message: '',
        data,
    });
};

export default login;

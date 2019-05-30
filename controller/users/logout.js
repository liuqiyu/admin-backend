/**
 * 注销接口
 * @param req
 * @param res
 * @param next
 */
const logout = (req, res, next) => {
    try{
        req.session.destroy((err) => {
            // cannot access session here
            if(err) {
                return res.send({
                    code: 0,
                    status: 'error',
                    message: '退出失败'
                })
            }
            res.clearCookie(identityKey);
            res.send({
                code: 200,
                status: 'success',
                message: '退出成功'
            })
        })
    }catch(err){
        console.log('退出失败', err)
        return res.send({
            code: 0,
            status: 'error',
            message: '退出失败'
        })
    }
};

export default logout;

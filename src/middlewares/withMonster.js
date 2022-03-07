exports.withMonster = (req, res, next) => {
    if (req.session.cookie?.monster === 'gruh') {
        console.log('There\'s a monster in request');
        res.end('There\'s a monster in request can\'t request');
    }
    next();
}
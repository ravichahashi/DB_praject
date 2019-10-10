const logger=(req,res,next)=>{
    console.log('request logger.');
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
module.exports = logger;
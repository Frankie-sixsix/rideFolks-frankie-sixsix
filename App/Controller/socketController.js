
const socketController = {

    test:(req,res)=>{
        console.log("test");
        const {id} = req.decoded;
        const {content} = req.body;
        const {idRoom} = req.body;
        console.log('Content:', content);
        console.log(id,"socket");
        res.sendFile('/var/www/html/simbad/apotheose/project-back/project-ridefolks-back/App/static/index.html');
    }

        

}

module.exports = socketController;
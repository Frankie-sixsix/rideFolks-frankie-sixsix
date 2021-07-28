const client = require('../database');

class NetworkFront  {

    constructor(obj={}) {
        for (const propName in obj){
            this.last_name = obj.last_name,
            this.first_name = obj.first_name,
            this.location = obj.location,
            this.profile_picture = obj.profile_picture,
            this.id = obj.id;
        }
    }


}

module.exports = NetworkFront;
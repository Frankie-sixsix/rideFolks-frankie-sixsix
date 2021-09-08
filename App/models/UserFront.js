const client = require('../database');

class UserFront {

    // Boucle pour afficher un utlisateur en front sans son id, password et email
    constructor(obj={}) {
        for (const propName in obj){
            this.id=obj.id
            this.last_name=obj.last_name,
            this.first_name=obj.first_name,
            this.location=obj.location,
            this.language=obj.language,
            this.description=obj.description,
            this.profile_picture=obj.profile_picture,
            this.availability=obj.availability,
            this.city=obj.city
            

        }
    }
}

module.exports = UserFront;


module.exports = class UserDTO {
    username;
    email;
    id;
    isActivated;

    constructor(model) {
        this.username = model.userName
        this.email = model.email
        this.id = model.id
        this.isActivated = model.isActivated
    }
}
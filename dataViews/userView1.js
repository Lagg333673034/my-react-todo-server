module.exports = class UserView1{
    _id;
    email;
    role;

    constructor(model){
        this.id = model._id;
        this.email = model.email;
        this.role = model.role;
    }
};
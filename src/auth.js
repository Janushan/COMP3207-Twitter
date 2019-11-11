class Auth {
    constructor() {
        this.authenticated = false
        this.id = '';
        this.name = '';
        this.username = '';
    }
    
    newLogin(callback, id, name, username) {
        this.authenticated = true;
        this.id = id;
        this.name = name;
        this.username = username;
        callback();
    }

    login(callback, id, name, username) {
        this.authenticated = true;
        this.id = id;
        this.name = name;
        this.username = username;
        callback();
    }

    logout(callback) {
        this.authenticated = false;
        callback();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUsername() {
        return this.username;
    }

}

export default new Auth()
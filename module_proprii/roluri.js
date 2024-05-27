const Drepturi = require('./drepturi.js');

/**
 * Represents a generic role with permissions.
 * @class Rol
 */
class Rol {
    /**
     * Gets the type of the role.
     * @type {string}
     * @readonly
     */
    static get tip() { return "generic"; }

    /**
     * Gets the permissions of the role.
     * @type {Symbol[]}
     * @readonly
     */
    static get drepturi() { return []; }

    /**
     * Creates an instance of Rol.
     */
    constructor() {
        this.cod = this.constructor.tip;
    }

    /**
     * Checks if the role has a specific permission.
     * @param {Symbol} drept - The permission to check.
     * @returns {boolean} True if the role has the permission, false otherwise.
     */
    areDreptul(drept) {
        console.log("in metoda rol!!!!");
        return this.constructor.drepturi.includes(drept);
    }
}

/**
 * Represents an admin role with all permissions.
 * @class RolAdmin
 * @extends Rol
 */
class RolAdmin extends Rol {
    /**
     * Gets the type of the admin role.
     * @type {string}
     * @readonly
     */
    static get tip() { return "admin"; }

    /**
     * Creates an instance of RolAdmin.
     */
    constructor() {
        super();
    }

    /**
     * Checks if the admin role has a specific permission.
     * @returns {boolean} Always returns true as the admin has all permissions.
     */
    areDreptul() {
        return true;
    }
}

/**
 * Represents a moderator role with specific permissions.
 * @class RolModerator
 * @extends Rol
 */
class RolModerator extends Rol {
    /**
     * Gets the type of the moderator role.
     * @type {string}
     * @readonly
     */
    static get tip() { return "moderator"; }

    /**
     * Gets the permissions of the moderator role.
     * @type {Symbol[]}
     * @readonly
     */
    static get drepturi() { 
        return [
            Drepturi.vizualizareUtilizatori,
            Drepturi.stergereUtilizatori
        ]; 
    }

    /**
     * Creates an instance of RolModerator.
     */
    constructor() {
        super();
    }
}

/**
 * Represents a client role with specific permissions.
 * @class RolClient
 * @extends Rol
 */
class RolClient extends Rol {
    /**
     * Gets the type of the client role.
     * @type {string}
     * @readonly
     */
    static get tip() { return "comun"; }

    /**
     * Gets the permissions of the client role.
     * @type {Symbol[]}
     * @readonly
     */
    static get drepturi() { 
        return [
            Drepturi.cumparareProduse
        ]; 
    }

    /**
     * Creates an instance of RolClient.
     */
    constructor() {
        super();
    }
}

/**
 * A factory class for creating roles based on type.
 * @class RolFactory
 */
class RolFactory {
    /**
     * Creates a role instance based on the specified type.
     * @param {string} tip - The type of role to create.
     * @returns {Rol} An instance of the specified role type.
     */
    static creeazaRol(tip) {
        switch(tip) {
            case RolAdmin.tip: return new RolAdmin();
            case RolModerator.tip: return new RolModerator();
            case RolClient.tip: return new RolClient();
        }
    }
}

module.exports = {
    RolFactory: RolFactory,
    RolAdmin: RolAdmin
};

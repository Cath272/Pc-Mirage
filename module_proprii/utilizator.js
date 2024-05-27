const AccesBD = require('./accesbd.js');
const parole = require('./parole.js');
const { RolFactory } = require('./roluri.js');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/**
 * Represents a user with various attributes and methods for user management.
 * @class Utilizator
 */
class Utilizator {
    /**
     * @type {string}
     * @static
     */
    static tipConexiune = "local";
    
    /**
     * @type {string}
     * @static
     */
    static tabel = "utilizatori";
    
    /**
     * @type {string}
     * @static
     */
    static parolaCriptare = "tehniciweb";
    
    /**
     * @type {string}
     * @static
     */
    static emailServer = "pcmirageweb@gmail.com";
    
    /**
     * @type {number}
     * @static
     */
    static lungimeCod = 64;
    
    /**
     * @type {string}
     * @static
     */
    static numeDomeniu = "localhost:8080";

    /**
     * @type {string}
     * @private
     */
    #eroare;

    /**
     * Creates an instance of Utilizator.
     * @param {Object} param0 - The properties of the user.
     * @param {number} [param0.id] - The unique identifier for the user.
     * @param {string} [param0.username] - The username of the user.
     * @param {string} [param0.nume] - The last name of the user.
     * @param {string} [param0.prenume] - The first name of the user.
     * @param {string} [param0.email] - The email of the user.
     * @param {string} [param0.parola] - The password of the user.
     * @param {Object} [param0.rol] - The role of the user.
     * @param {string} [param0.culoare_chat="black"] - The chat color of the user.
     * @param {string} [param0.poza] - The profile picture of the user.
     */
    constructor({ id, username, nume, prenume, email, parola, rol, culoare_chat = "black", poza } = {}) {
        this.id = id;

        try {
            if (this.checkUsername(username)) {
                this.username = username;
            }
        } catch (e) { 
            this.#eroare = e.message; 
        }

        for (let prop in arguments[0]) {
            this[prop] = arguments[0][prop];
        }
        
        if (this.rol) {
            this.rol = this.rol.cod ? RolFactory.creeazaRol(this.rol.cod) : RolFactory.creeazaRol(this.rol);
        }

        console.log(this.rol);
        this.#eroare = "";
    }

    /**
     * Checks if the name is valid.
     * @param {string} nume - The name to check.
     * @returns {boolean} True if the name is valid, false otherwise.
     */
    checkName(nume) {
        return nume !== "" && nume.match(new RegExp("^[A-Z][a-z]+$"));
    }

    /**
     * Sets the name of the user.
     * @param {string} nume - The name to set.
     * @throws Will throw an error if the name is invalid.
     */
    set setareNume(nume) {
        if (this.checkName(nume)) {
            this.nume = nume;
        } else {
            throw new Error("Nume gresit");
        }
    }

    /**
     * Sets the username of the user.
     * @param {string} username - The username to set.
     * @throws Will throw an error if the username is invalid.
     */
    set setareUsername(username) {
        if (this.checkUsername(username)) {
            this.username = username;
        } else {
            throw new Error("Username gresit");
        }
    }

    /**
     * Checks if the username is valid.
     * @param {string} username - The username to check.
     * @returns {boolean} True if the username is valid, false otherwise.
     */
    checkUsername(username) {
        return username !== "" && username.match(new RegExp("^[A-Za-z0-9#_./]+$"));
    }

    /**
     * Encrypts the password.
     * @param {string} parola - The password to encrypt.
     * @returns {string} The encrypted password.
     * @static
     */
    static criptareParola(parola) {
        return crypto.scryptSync(parola, Utilizator.parolaCriptare, Utilizator.lungimeCod).toString("hex");
    }

    /**
     * Saves the user to the database.
     */
    salvareUtilizator() {
        let parolaCriptata = Utilizator.criptareParola(this.parola);
        let utiliz = this;
        let token = parole.genereazaToken(100);
        AccesBD.getInstanta(Utilizator.tipConexiune).insert({
            tabel: Utilizator.tabel,
            campuri: {
                username: this.username,
                nume: this.nume,
                prenume: this.prenume,
                parola: parolaCriptata,
                email: this.email,
                culoare_chat: this.culoare_chat,
                cod: token,
                poza: this.poza
            }
        }, function (err, rez) {
            if (err)
                console.log(err);
            else
                utiliz.trimiteMail("Te-ai inregistrat cu succes", "Username-ul tau este " + utiliz.username,
                    `<h1>Salut!</h1><p style='color:blue'>Username-ul tau este ${utiliz.username}.</p> <p><a href='http://${Utilizator.numeDomeniu}/cod/${utiliz.username}/${token}'>Click aici pentru confirmare</a></p>`,
                );
        });
    }

    /**
     * Sends an email to the user.
     * @param {string} subiect - The subject of the email.
     * @param {string} mesajText - The text message of the email.
     * @param {string} mesajHtml - The HTML message of the email.
     * @param {Object[]} [atasamente=[]] - The attachments of the email.
     * @returns {Promise<void>}
     */
    async trimiteMail(subiect, mesajText, mesajHtml, atasamente = []) {
        var transp = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: Utilizator.emailServer,
                pass: "fbrpvwnglxykehow"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transp.sendMail({
            from: Utilizator.emailServer,
            to: this.email,
            subject: subiect,
            text: mesajText,
            html: mesajHtml,
            attachments: atasamente
        });

        console.log("trimis mail");
    }

    /**
     * Retrieves a user by username asynchronously.
     * @param {string} username - The username of the user.
     * @returns {Promise<Utilizator|null>} The user object or null if not found.
     * @static
     */
    static async getUtilizDupaUsernameAsync(username) {
        if (!username) return null;
        try {
            let rezSelect = await AccesBD.getInstanta(Utilizator.tipConexiune).selectAsync({
                tabel: "utilizatori",
                campuri: ['*'],
                conditiiAnd: [`username='${username}'`]
            });
            if (rezSelect.rowCount != 0) {
                return new Utilizator(rezSelect.rows[0]);
            } else {
                console.log("getUtilizDupaUsernameAsync: Nu am gasit utilizatorul");
                return null;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    /**
     * Retrieves a user by username.
     * @param {string} username - The username of the user.
     * @param {Object} obparam - Additional parameters.
     * @param {function} proceseazaUtiliz - Callback to process the user.
     * @returns {null}
     * @static
     */
    static getUtilizDupaUsername(username, obparam, proceseazaUtiliz) {
        if (!username) return null;
        let eroare = null;
        AccesBD.getInstanta(Utilizator.tipConexiune).select({
            tabel: "utilizatori",
            campuri: ['*'],
            conditiiAnd: [`username='${username}'`]
        }, function (err, rezSelect) {
            if (err) {
                console.error("Utilizator:", err);
                eroare = -2;
            } else if (rezSelect.rowCount == 0) {
                eroare = -1;
            }
            let u = new Utilizator(rezSelect.rows[0]);
            proceseazaUtiliz(u, obparam, eroare);
        });
    }

    /**
     * Checks if the user has a specific permission.
     * @param {Symbol} drept - The permission to check.
     * @returns {boolean} True if the user has the permission, false otherwise.
     */
    areDreptul(drept) {
        return this.rol.areDreptul(drept);
    }
}

module.exports = { Utilizator: Utilizator };

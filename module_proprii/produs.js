/**
 * Represents a product with various attributes.
 * @class Produs
 */
class Produs {
    /**
     * Create a product.
     * @param {Object} param0 - The properties of the product.
     * @param {number} param0.id - The unique identifier for the product.
     * @param {string} param0.nume - The name of the product.
     * @param {string} param0.descriere - The description of the product.
     * @param {number} param0.pret - The price of the product.
     * @param {number} param0.gramaj - The weight of the product.
     * @param {string} param0.tip_produs - The type of the product.
     * @param {number} param0.calorii - The calories of the product.
     * @param {string} param0.categorie - The category of the product.
     * @param {string[]} param0.ingrediente - The ingredients of the product.
     * @param {boolean} param0.pt_diabetici - Indicates if the product is suitable for diabetics.
     * @param {string} param0.imagine - The image URL of the product.
     * @param {Date} param0.data_adaugare - The date when the product was added.
     */
    constructor({ 
        id, 
        nume, 
        descriere, 
        pret, 
        gramaj, 
        tip_produs, 
        calorii, 
        categorie, 
        ingrediente, 
        pt_diabetici, 
        imagine, 
        data_adaugare 
    } = {}) {
        for (let prop in arguments[0]) {
            this[prop] = arguments[0][prop];
        }
    }
}

module.exports = Produs;

import _ from 'underscore';

/**
    const format = {
        textOnly: false,
        numberOnly: false,
        min: 0,
        max: 0,
        email: false,
        same: false,
        containMaj: false,
        containMin: false,
        containNumber: false,
    };
*/

const errorsVerif = (content, verif) => {
    let c = content;
    let v = verif;
    let errors = "";

    if (v.textOnly) {
        if (!_.isString(c)) {
            errors = "Format non valide !!"
        }
    }
    if (v.numberOnly) {
        if (!_.isNumber(c)) {
            errors = "Format non valide !!"
        }
    }
    if (v.min) {
        if (c.length <= v.min) {
            errors = v.min + " caractères minimum !"
        }
    }
    if (v.max) {
        if (c.length > v.max) {
            errors = v.max + " caractères maximum !"
        }
    }
    if (v.email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(c)) {
            errors = " Email non valide !"
        }
    }
    if (v.containNumber) {
        var regexNumber = /\d/;
        if (!regexNumber.test(c)) {
            errors = "Au moins un Chiffre !!"
        }
    }
    if (v.containMaj) {
        var regexMaj = /[A-Z]/; // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (!regexMaj.test(c)) {
            errors = "Au moin une Majuscule"
        }
    }
    if (v.containMin) {
        var regexMin = /[a-z]/; // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (!regexMin.test(c)) {
            errors = "Au moin une Minuscule"
        }
    }
    return errors;
}
export default errorsVerif;
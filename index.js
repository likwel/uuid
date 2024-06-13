const randomUUID = (paramsObject=null) => {

    let delimiter = paramsObject && paramsObject.delimiter != null?paramsObject.delimiter : '-'
    let format = paramsObject && paramsObject.format != null ? paramsObject.format : '8-4-4-4-12'
    let version = paramsObject && paramsObject.version?paramsObject.version : 4
    format = format.replaceAll("-", delimiter)

    if(format==null){
        return 'xxxxxxxx-xxxx-'+version+'xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }else {

        const parts = format.split(delimiter).map(part => parseInt(part, 10));
        const uuidParts = parts.map((length, index) => {
            if (index === 2) {
                // Special handling for the third segment (4xxx)
                return version + randomHex(length - 1);
            } else if (index === 3) {
                // Special handling for the fourth segment (yxxx)
                const r = (Math.floor(Math.random() * 16) & 0x3) | 0x8;
                return r.toString(16) + randomHex(length - 1);
            } else {
                // General case
                return randomHex(length);
            }
        });

        return uuidParts.join(delimiter);

    }
    
}

const UUID = (seed, paramsObject=null) => {
    
    let delimiter = paramsObject && paramsObject.delimiter != null?paramsObject.delimiter : '-'
    let format = paramsObject && paramsObject.format != null ? paramsObject.format : '8-4-4-4-12'
    let version = paramsObject && paramsObject.version?paramsObject.version : 4

    format = format.replaceAll("-", delimiter)

    // Parse in base 6
    const num = parseBigInt(seed, 6);
    // Convert to base 16 via `toString`:
    const base16 = num.toString(16);

    let encryped = encrypt(seed, {delimiter: delimiter})

    if(!seed && format == null) {
        // alert('Please provide a value to generate a UUID')
        return randomUUID();
    }else if(seed && format == null){

        return 'xxxxxxxx-xxxx-'+version+'xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = seededRandom(seed) * 16 | 0;
            seed++;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

    }else{
        // const str = format.split('-');
        const parts = format.split(delimiter).map(part => parseInt(part, 10));
        // let first = str.substring(0, str[0]);
        let uuid = '';
        let currentSeed = seed;
        // let init = 0;
        
        parts.forEach((length, index) => {
            for (let i = 0; i < length; i++) {
                let c;
                if (index === 2 && i === 0) {
                    // Special handling for the third segment (4xxx)
                    c = version;
                } else if (index === 3 && i === 0) {
                    // Special handling for the fourth segment (yxxx)
                    const r = (seededRandom(currentSeed) * 16) | 0;
                    currentSeed++;
                    c = ((r & 0x3) | 0x8).toString(16);
                } else {
                    const r = (seededRandom(currentSeed) * 16) | 0;
                    currentSeed++;
                    c = r.toString(16);
                }
                uuid += c;
            }
            uuid += delimiter;
        });
    
        // Remove the trailing dash
        return {
            uuid: uuid.slice(0, -1),
            encryped: encryped
        }
        //  new Promise uuid.slice(0, -1);
    }
    
}

const randomHex = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 16).toString(16);
    }
    return result;
}

function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function parseBigInt(str, base = 10) {
    if(typeof str === 'string') {
        if (typeof base !== "number" || isNaN(base) || base < 2 || base > 36) {
            throw new Error(`parseBigInt doesn't support base ${base}`);
        }
        let num = 0n;
        base = BigInt(base);
        for (const digit of str) {
            num *= base;
            num += BigInt(parseInt(digit, 6));
        }
        return num;
    }else{
        return BigInt(str);
    }
    
}

const parseInteger = (h) =>{
    return parseInt(h, 16)
}

// tion pour chiffrer un texte avec XOR et le convertir en hexadécimal
const encrypt = (text, paramsObject=null) => {
    let key = paramsObject && paramsObject.key?paramsObject.key : '0dcb1e721df31294ba751c6363617bbf'
    let delimiter = paramsObject && paramsObject.delimiter != null ?paramsObject.delimiter : "-"
    let divided_to = paramsObject && paramsObject.divided_to != null ?paramsObject.divided_to : 4

    text = text.toString()

    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let keyChar = key.charCodeAt(i % key.length);
        let encryptedChar = charCode ^ keyChar; // XOR operation
        result += ('0' + encryptedChar.toString(16)).slice(-2); // Convertit en hexadécimal et ajoute au résultat
    }

    // Insérer un '-' chaque 4 caractères
    let formattedResult = '';
    for (let i = 0; i < result.length; i += divided_to) {
        formattedResult += result.substr(i, divided_to) + delimiter;
    }
    formattedResult = formattedResult.slice(0, -1); // Retirer le dernier '-'

    return formattedResult;
}

// Fonction pour décrypter un texte hexadécimal avec XOR
const decrypt = (hexString, paramsObject=null) => {

    let key = paramsObject && paramsObject.key?paramsObject.key : '0dcb1e721df31294ba751c6363617bbf'
    let delimiter = paramsObject && paramsObject.delimiter != null ?paramsObject.delimiter : "-"

    hexString = hexString.replaceAll(delimiter, "")
    let result = '';
    for (let i = 0; i < hexString.length; i += 2) {
        let hexChar = hexString.substr(i, 2); // Récupère chaque paire de caractères hexadécimaux
        let decryptedChar = parseInt(hexChar, 16); // Convertit en décimal
        let keyChar = key.charCodeAt((i / 2) % key.length); // Trouve le caractère de clé correspondant
        let originalChar = decryptedChar ^ keyChar; // XOR operation pour récupérer le caractère original
        result += String.fromCharCode(originalChar); // Ajoute le caractère au résultat
    }
    return result;
}

// Exemple d'utilisation

const seed = 20240612;  // Votre nombre spécifique

const uuidRandom = randomUUID({format : "12-4-4-8"});
let uuid = UUID(seed);
const decrypted = decrypt(uuid.encryped);

document.getElementById("res").innerHTML = "UUID Random : " + uuidRandom;
document.getElementById("res").innerHTML += "<br> Seed donnée : "+seed;
document.getElementById("res").innerHTML += "<br> UUID donnée : "+uuid.uuid;
document.getElementById("res").innerHTML += "<br> UUID crypté : "+uuid.encryped;
document.getElementById("res").innerHTML += "<br> UUID decrypté : "+decrypted;

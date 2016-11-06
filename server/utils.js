const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const base = alphabet.length;

class Utils {
    static validUrl(url){
        const expression = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        const regex = new RegExp(expression);
        return url.match(regex);
    }
    static encode(num){
        let str = "";
        while(num > 0){
            str += alphabet.charAt(num % base);
            num = Math.floor(num / base);
        }
        return str.split("").reverse().join("");
    }
    static decode(str){
        let num = 0;
        for(let i = 0; i < str.length; i+=1){
            num = num * base + alphabet.indexOf(str.charAt(i));
        }
        return num;
    }
}

module.exports = Utils;
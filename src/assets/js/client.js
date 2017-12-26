import crptico from './cryptico/src/api'
import { AES, enc } from 'crypto-js'
import Crypto from 'crypto-js'
var client = (function(){
	var my = {};

	my.privateKey = function(passPharse,bitLength){
	    var RSAkey = crptico.generateRSAKey(passPharse, bitLength);
	    return RSAkey;
	}

	my.publicKeyString = function(RSAkey){
        var publicKey = crptico.publicKeyString(RSAkey);
        console.log("The publicKey generate from client is: " + publicKey);
        return publicKey;
	}

	my.decryptRSA = function(CipherTest,RSAkey){
        var result = crptico.decrypt(CipherTest,RSAkey);
        console.log("The cipher text from server is: " + CipherTest);
        console.log("The key we got after decryption: " + result.plaintext)
        return result.plaintext;
	}

	my.encryptRSA = function(text, publicKey){
	    var EncryptionResult = cryptico.encrypt(text, publicKey);
	    return EncryptionResult.cipher;
	}

	my.decryptAES = function(data, secretekey){
	    var bytes  = AES.decrypt(data, secretekey).toString(enc.Utf8);
	    return bytes;
	}

	my.MD5 = function(data){
		var digit = Crypto.MD5(data).toString();
		console.log("The digit signature made by client is: " + digit);
		return digit;
	}

	return my;
}());

export default client;
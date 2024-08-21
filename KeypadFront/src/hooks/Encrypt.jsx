import { JSEncrypt } from "jsencrypt";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtkLA7dcyLqz4M6BS/XZi
wMee85fjwskmxfZVN/qI854Sa4mlU/5Rse0HcNY0QoF+J3kQF3xWpTKLfw2p5pzt
sALLN6gsO2m4qLIOk3eNR+hVL2Rh4dc8MAhuXfoTGrfMjXouiy05rYgVpqIRRCjz
MVGYnJ7arZ6rMN73nRxd0I9RVbe3LXEuHrBysxjfXae6z+qb+1Rp9MKnwiDuKC/i
2lqqqmV9p/8OuY+qUzsMCtU8URS8kvw/bkg90TEOHzjKWrRIYRcQQkdJ8KuX3/lV
1jBBgIQRfmQVTFUnkV5XBZw9jXYTsz6Bcp4MNWUlwHQIebAM8vMZ6/nH9p4OdETA
5wIDAQAB
-----END PUBLIC KEY-----
`;

export default function EncryptHashArray(hashArray){
    const combinedHash = hashArray.join(""); // 배열을 "hash+hash+hash" 형태로 합침
    console.log(hashArray);
    console.log(combinedHash);
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
  
    return encrypt.encrypt(combinedHash); // 결합된 문자열을 암호화
};
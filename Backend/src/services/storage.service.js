const ImageKit=require("imagekit")  //npm i imagekit --save
const storageService=require('./storage.service')
const imagekit=new ImageKit({           //npm install imagekit --save
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})
async function uploadFile(file,fileName){
    const result=await imagekit.upload({
        file:file,
        fileName:fileName
    })
    return result;
}
module.exports={uploadFile}

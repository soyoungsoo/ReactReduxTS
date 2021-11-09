export default {
    imageCDN: "https://d2fkfd93iftsmp.cloudfront.net/",
    imgTypeRegx: /^jpg$|^jpeg$|^gif$|^png$|^JPG$|^JPEG$|^PNG$|^GIF$/,
    passwordRegx: /^((?=.*?[a-zA-Z])(?=.*?[0-9])|(?=.*?[#?!@$%^&*+-])).{10,16}$/,
    dataUriRegx: 'data:image\\/([a-zA-Z]*);base64,([^\\"]*)'
}
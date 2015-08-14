class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMoreBlue(img, adjustment){
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i< length; i+= 4){
        data[i+2] = data[i+2] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function brighten(img, adjustment){
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i+=4) {
        data[i] = data[i] + adjustment;
        data[i + 1] = data[i + 1] + adjustment;
        data[i + 2] = data[i + 2] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function rosie(img, adjustment){
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels = pixels.data;

    for (var i = 0; i< length; i+=3){
        data[i] = data[i] + adjustment;
        data[i+3] = data[i+3] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

$(document).ready(function() {
    var img = new Image();
    img.src = "img/shake.JPG";
    //makeMoreBlue(img, 50);
    brighten(img, 50);
    //rosie(img, 20);
});


//    var pixels = ImageUtils.getPixels(img);
//    var heightPixelsToHide = 100;
//    for(var i = 0; i < img.width * heightPixelsToHide * 4; i++) {
//        pixels.data[i] = 255;}
//
//ImageUtils.putPixels(pixels, img.width, img.height);});
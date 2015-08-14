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

class RGBA{
    constructor(redValue, greenValue, blueValue, alphaValue){
        this.red = redValue;
        this.green = greenValue;
        this.blue = blueValue;
        this.alpha = alphaValue;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Point {
    constructor (xValue, yValue){
        this.x = xValue;
        this.y = yValue;
    }
}

$(document).ready(function() {
    var img = new Image();
    img.src = "img/shake.JPG";
    var colour = new RGBA(255, 100, 50, 255);
    console.log(colour.red);
    console.log(colour.green);
    sepia(img);
    var point = new Point(1,2);
    console.log(point);

});

function sepia(img) {

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all;i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
        var sepiaRGBA = sepiaPixel(originalRGBA);

        data[i] = sepiaRGBA.red;
        data[i+1] = sepiaRGBA.green;
        data[i+2] = sepiaRGBA.blue;
        data[i+3] = sepiaRGBA.alpha;
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}

function sepiaPixel (colour){
    var modifiedRed = colour.red * 6 + colour.green * 7 + colour.blue * 3
    var modifiedGreen = colour.red * 7 + colour.green * 7 + colour.blue * 1
    var modifiedBlue = colour.red * 0.9 + colour.green * 7 + colour.blue * 7

    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, colour.alpha);
}

function colourise (img, colour, level){

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i +=4)
        {
            var originalRGBA = new RGBA(data[i], data[i + 1], data[i + 2], data[i + 3]);

            var modifiedRGBA = colourisePixel(originalRGBA, colour, level);

            data[i] = modifiedRGBA.red;
            data[i+1] = modifiedRGBA.green;
            data[i+2] = modifiedRGBA.blue;
            data[i+3] = modifiedRGBA.alpha;

        }
        ImageUtils.putPixels(pixels, img.width, img.height);
}




function colourisePixel (originalRGBA, colour, level) {

    var diffRed = (originalRGBA.red - colour.red) * (level / 100);
    var modifiedRed = originalRGBA.red - diffRed;

    var diffGreen = (originalRGBA.green - colour.green) * (level / 100);
    var modifiedGreen = originalRGBA.green - diffGreen;

    var diffBlue = (originalRGBA.blue - colour.blue) * (level / 100);
    var modifiedBlue = originalRGBA.blue - diffBlue;

    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, colour.alpha);
        }
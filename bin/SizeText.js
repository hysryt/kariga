const Jimp = require('jimp');

class SizeText {
  /**
   * 画像が60px以下の場合はフォントサイズを8pxにする
   * @param {*} imageWidth 画像の横幅
   */
  constructor(imageWidth, imageHeight) {
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.text = imageWidth + ' x ' + imageHeight;

    this.setFontStyle();
  }

  /**
   * 画像の横幅に合わせて使用するフォントを設定する
   */
  setFontStyle() {
    if (this.imageWidth <= 60) {
      this.fontType = Jimp.FONT_SANS_8_BLACK;
      this.fontSize = 8;
      
    } else {
      this.fontType = Jimp.FONT_SANS_16_BLACK;
      this.fontSize = 16;
    }
  }

  /**
   * フォントデータを読み込む
   */
  async loadFontData() {
    this.fontData = await Jimp.loadFont(this.fontType);
  }

  /**
   * 引数 image にサイズテキストを書き込む
   * @param {Jimp} image 
   */
  printTo(image) {
    const textWidth = this.text.length * this.fontSize / 2;
    const textHeight = this.fontSize;

    image.print(
      this.fontData
      , this.imageWidth / 2 - textWidth / 2
      , this.imageHeight / 2 - textHeight / 2
      , this.text
    );
  }
}

module.exports = SizeText;
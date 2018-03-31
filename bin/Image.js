const Jimp = require('jimp');
const fs = require('fs');
const SizeText = require('./SizeText.js');

class Image {
  constructor(width, height, color, hasSizeText) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.hasSizeText = hasSizeText;
    this.image = new Jimp(width, height, color);
  }

  /**
   * 画像を保存
   * @param {string} 保存先ファイルパス
   * @return {Promise}
   */
  async save(filepath) {
    if (this.hasSizeText) {
      await this.printSizeText();
    }

    return new Promise((resolve, reject) => {
      this.image.write(filepath);
      console.log('ok.');
      resolve();
    })
  }

  /**
   * 画像にサイズテキスト "横幅x縦幅" を描画する
   */
  async printSizeText() {
    const sizeText = new SizeText(this.width, this.height);
    await sizeText.loadFontData();
    sizeText.printTo(this.image);
  }
}

module.exports = Image;
const Jimp = require('jimp');
const fs = require('fs');

class Image {
  constructor(width, height, color) {
    this.image = new Jimp(width, height, color);
  }

  /**
   * 画像を保存
   * @param {string} 保存先ファイルパス
   * @return {Promise}
   */
  save(filepath) {
    return new Promise((resolve, reject) => {
      this.image.write(filepath);
      console.log('ok.');
      resolve();
    })
  }
}

module.exports = Image;
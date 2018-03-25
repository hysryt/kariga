const Canvas = require('canvas');
const fs = require('fs');

class Image {
  constructor(width, height, color) {
    const canvas = new Canvas(width, height);
  
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  
    const dataURL = canvas.toDataURL();
    this.image = dataURL.replace(/^data:image\/png;base64,/, "");
  }

  /**
   * 画像を保存
   * @param {string} 保存先ファイルパス
   * @return {Promise}
   */
  save(filepath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, this.image, 'base64', function(err) {
        if (err) {
          reject(err);
        } else {
          console.log('ok.');
          resolve();
        }
      });
    })
  }
}

module.exports = Image;
#!/usr/bin/env node

const Canvas = require('canvas');
const fs = require('fs');

(function() {

  const yargs = require("yargs")
    .option('w', {
      alias: 'width',
      describe: '画像の横幅(px)',
      demandOption: true,
    })
    .option('h', {
      alias: 'height',
      describe: '画像の高さ(px)',
      demandOption: true,
    })
    .option('c', {
      alias: 'color',
      describe: '塗りつぶし色(000000)',
      default: '000000',
    })
    .option('o', {
      alias: 'output',
      describe: '保存先ファイルパス',
      default: 'output.png',
    });

  yargs.parse(process.argv.slice(2), (err, argv, output) => {
    // error or help or version
    if (output) {
      if (err) {
        console.error(output);
        process.exitCode = 1;

      } else {
        console.log(output);

      }

      return;
    }


    // bashの場合エスケープしないと#が入力できないので、
    // #なしでの入力も受け取る
    let color = argv.color;
    if (!color.startsWith('#')) {
      color = '#' + color;
    }

    // 画像の作成
    const image = createImage(argv.width, argv.height, color);

    // 画像の保存
    saveImage(image, argv.output);
      
  });

})();


/**
 * png画像を作成し、Base64形式で返す。
 * @param {number} width - 画像の横幅
 * @param {number} height - 画像の高さ
 * @param {string} color - 塗りつぶし色(#000000形式)
 * @return {string} Base64形式のpngデータ
 */
function createImage(width, height, color) {
  const canvas = new Canvas(width, height);
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  const dataURL = canvas.toDataURL();
  const image = dataURL.replace(/^data:image\/png;base64,/, "");

  return image;
}


/**
 * Base64形式のpngデータをファイルとして保存する。
 * @param {string} Base64形式のpngデータ
 * @param {string} 保存先パス
 */
function saveImage(image, path) {
  const data = image.replace(/^data:image\/png;base64,/, "");

  fs.writeFile(path, data, 'base64', function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('ok.');
    }
  });
}

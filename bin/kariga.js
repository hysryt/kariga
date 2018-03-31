#!/usr/bin/env node

const Image = require('./Image.js');

class KarigaError extends Error {}

(function() {
  const DEFAULT_ALPHA = "ff";

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
      default: 'ffffff7f',
      type: 'string',
    })
    .option('o', {
      alias: 'output',
      describe: '保存先ファイルパス',
      default: 'output.png',
    })
    .option('sizetext', {
      type: 'boolean',
      describe: 'サイズテキストの有効化',
      default: true,
    });

  yargs.parse(process.argv.slice(2), async (err, argv, output) => {
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

    try {
      // 入力値の色情報を正規化
      let color = normalizeColor(argv.color);

      // 画像の生成、保存
      const image = new Image(argv.width, argv.height, color, argv.sizetext);
      await image.save(argv.output);

    } catch(e) {
      if (e instanceof KarigaError) {
        console.log(e.message);
        
      } else {
        throw e;
      }
    }
  });

  /**
   * 色情報を正規化
   * @param {string} color - 6桁(RGB)か8桁(RGBA)の16進数の色情報（文字列）
   * @return {number} RGBAの色情報（数値型）
   */
  function normalizeColor(color) {
    if (!(/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(color))) {
      throw new KarigaError('error: -c オプションには6桁または8桁の16進数を指定してください。')
    }

    // 6桁の場合はアルファ値を追加
    let normalizedColor = color;
    if (normalizedColor.length == 6) {
      normalizedColor += DEFAULT_ALPHA;
    }

    return parseInt(normalizedColor, 16);
  }
})();

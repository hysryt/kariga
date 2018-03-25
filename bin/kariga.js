#!/usr/bin/env node

const Image = require('./Image.js');

class KarigaError extends Error {}

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
      type: 'string',
    })
    .option('o', {
      alias: 'output',
      describe: '保存先ファイルパス',
      default: 'output.png',
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
      if (argv.color.length != 6 && argv.color.length != 8) {
        throw new KarigaError('error: -c オプションには6桁または8桁の16進数を指定してください。')
      }

      // 色を指定する16進数文字列を数値に変換
      // 指定が16進数で6桁の場合はアルファ値を0xffとする
      let color = parseInt(argv.color, 16);
      if (argv.color.length == 6) {
        color = (color << 8) + 0xff;
      }

      // 画像の生成、保存
      const image = new Image(argv.width, argv.height, color);
      await image.save(argv.output);

    } catch(e) {
      if (e instanceof KarigaError) {
        console.log(e.message);
        
      } else {
        throw e;
      }
    }
  });
})();

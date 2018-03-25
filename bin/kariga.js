#!/usr/bin/env node

const Image = require('./Image.js');

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

    // bashの場合エスケープしないと#が入力できないので、
    // #なしでの入力も受け取る
    let color = argv.color;
    if (!color.startsWith('#')) {
      color = '#' + color;
    }

    // 画像の生成、保存
    const image = new Image(argv.width, argv.height, color);
    await image.save(argv.output);

  });
})();

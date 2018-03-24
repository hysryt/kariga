
# 必要なライブラリのインストール

```
brew install pkg-config cairo pango libpng jpeg giflib
```


# インストール
```
$ npm install -g @hysryt/kariga
```


# 使い方
```
$ kariga -w 横幅 -h 高さ [options...]
```


# オプション
|オプション|説明|
|-|-|
|`-w`,`--width`|画像の横幅(px)|
|`-h`,`--height`|画像の高さ(px)|
|`-c`,`--color`|塗りつぶし色<br>16進のRGB指定で、先頭の#はなくてもいい<br>bashで#を入力する時はエスケープが必要なので注意<br>デフォルトは`000000`|
|`-o`,`--output`|画像の保存パス<br>デフォルトは`output.png`

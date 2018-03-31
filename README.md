Kariga
===

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
|`-c`,`--color`|塗りつぶし色<br>6桁または8桁の16進のRGB指定。<br>8桁の場合、最後の2桁がアルファ値とする<br>6桁の場合、アルファ値は`0xff`<br>デフォルトは`000000ff`|
|`-o`,`--output`|画像の保存パス<br>デフォルトは`output.png`|
|`--no-sizetext`|サイズテキストを無効化|

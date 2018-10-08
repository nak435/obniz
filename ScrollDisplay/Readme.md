# ScrollDisplayクラス

obnizのディスプレイに好きなメッセージをスクロール表示するクラスです。  
デモムービーは[こちら](https://ssl.nak435.com/obniz/demo2.mov)。

# 使い方

scrollクラスを生成します。

```javascript
//Javascript
const scroll = obniz.wired("ScrollDisplay");
```

## font(font, size)

表示するメッセージのフォントを指定します。初期化後は**Arial**の**16**pxです。
ディスプレイの高さは64pixelため、64px以下をお薦めします。


## textプロパティ

表示するメッセージを指定します。複数行のメッセージを指定する場合は、改行コード`\n`で区切ります。一行づつスクロール表示します。
表示中にtextプロパティを変更した場合は、再`start()`したときに有効となります。


## speedプロパティ、stepプロパティ

スクロールするスピードと描画間隔をミリ秒とpixel数で指定します。初期化後は**10**ミリ秒と**4**pxです。

```javascript
//Javascript
//ゆっくりスクロール
scroll.speed = 20; //20ミリ秒
scroll.step = 1; //1px
```

## start()

スクロールを開始します。繰り返して表示するため、スクロールを止める場合は、次の`stop()`を呼び出します。

```javascript
//Javascript
scroll.start();
```

## stop()

スクロールを停止します。

```javascript
//Javascript
scroll.stop();
```

## isScrollingプロパティ

スクロール中かどうかを判定します。

```javascript
//Javascript
scroll.start();
scroll.isScrolling; //true
```

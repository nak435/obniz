# ScrollDisplayクラス

obnizのディスプレイに好きなメッセージをスクロール表示するクラスです。  
node.js環境の場合はnode-canvasを必要とします。  
デモムービーは[こちら](https://ssl.nak435.com/obniz/demo2.mov)。

# 使い方

scrollクラスを生成します。引数にobnizのインスタンスを指定します。

```javascript
//Javascript
const obniz = new Obniz("");
const scroll = new ScrollDisplay(obniz);
```

## font(font, size)

表示するメッセージのフォントを指定します。初期化後は**Arial**の**16**pxです。
ディスプレイの高さは64pixelため、64px以下をお薦めします。ただし、使用するフォントによっては64pxでも上下が欠けることがあります。

```javascript
//Javascript
scroll.font('serif', 24); //serif 24px 
```

## textプロパティ

表示するメッセージを指定します。複数行のメッセージを指定する場合は、改行コード`\n`で区切ります。一行づつスクロール表示します。
表示中にtextプロパティを変更した場合は、再`start()`したときに有効となります。

```javascript
//Javascript
scroll.text = '1st line messegage' + '\n' + '2nd line message'; 
```

## baselineプロパティ

表示するメッセージの基点を指定します。指定できるのは、`'top'`と`'bottom'`です。初期化後は`'top'`です。  
詳しい意味は[こちら](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline)を参照してください。

```javascript
//Javascript
scroll.baseline = 'bottom'; 
```

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

スクロールを停止します。なお、obnizにデータが溜まっている場合は、直ちに停止しないことがあります。

```javascript
//Javascript
scroll.stop();
```

## isScrollingプロパティ

スクロール中かどうかを判定します。

```javascript
//Javascript
scroll.start();
console.log(scroll.isScrolling); //true
```

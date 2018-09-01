
# GPSモジュールをobnizにつなぐライブラリを作りました

![](./sample.gif)

## はじめに

![](http://akizukidenshi.com/img/goods/L/K-09991.jpg) 

このGPSモジュール[GYSFDMAXB(太陽誘電)](http://akizukidenshi.com/catalog/g/gK-09991/)をobnizにつないでGPS情報を取得するライブラリを作成しました。<br><br>


## サンプルhtml

GPS情報取得ライブラリを使ったサンプルです。
![](./sampleshot.png)

- **地図情報** および **住所情報** (地図の下に小さい文字で表示)<br>
	ライブラリから取得したGPGGAセンテンス(GPS位置情報=経度・緯度情報)からGoogle Mapを表示。	また、Google Mapのgeocodeサービスにて住所情報を取得

- **方向・速度情報** (赤い<span style="color:red;">N</span>が北を示す)<br>
	ライブラリから取得したGPVTGセンテンス(針路と速度情報)を元に方角と速度を描画

- **衛星情報情報** (棒グラフ および その下の円形の図形)<br>
	ライブラリから取得したGPGSVセンテンス(衛星情報)を元に衛星の番号と受信感度を描画。
	また、衛星の仰角と方位角から、各衛星の位置を描画
	
- **1PPS** (1PPSの丸い図形)<br>
	GPSモジュールの1PPSに連動して表示が点滅。(衛星を安定して受信するまでは点滅しません。)

<br>
	

## GPSモジュールとobnizの接続

GPSモジュールとobnizのピン接続は以下の通り。写真で示す通り、直付けで問題ありません。

![](./obniz-gps.png)


|GPS|obniz pin#|
|:-:|:--|
|5V     |7 (5v) |
|GND    |8 (gnd) |
|TXD    |9 (txd)   |
|RXD    |10 (rxd)   |
|1PPS   |11 (opps)   |

<br>

## GPSモジュールライブラリの説明

簡単にですが、APIについて説明します。


## wired(obniz, vcc, gnd, txd, rxd {, Opps })

つながっているioを指定してオブジェクト化します。

このGPSモジュールはGPS衛星の電波を受信すると、正確に1秒単位で基板上の赤いLEDが点滅を始めます。同時に1PPSのピンにも信号を出します。

- 1PPSを使用しない場合は、Oppsの接続は不要。


## start1pps(callback)

1PPSピンの信号に連動してコールバック関数を呼び出します。


## readSentence()

受信したGPSデータ(NMEAフォーマット)の1センテンス(1行の)データを読み出します。データがない場合は、空文字が返ります。
NMEAフォーマットのデータを直接使いたい場合にこのAPIを使いますが、通常は次の`getEditedData()`を使う方が便利です。


## getEditedData()

受信したNMEAフォーマットを編集しオブジェクト化した結果を取り出します。同じ情報が`editedData`プロパティにもセットされます。

```
editedData.enable : editedDataが有効なデータを保持している場合true

editedData.GPGGA : GPGGAセンテンスデータ
editedData.GPGLL : GPGLLセンテンスデータ
editedData.GPGSA : GPGSAセンテンスデータ
editedData.GPGSV[] : GPGSVセンテンスデータ
editedData.GPRMC : GPRMCセンテンスデータ
editedData.GPVTG : GPVTGセンテンスデータ
editedData.GPZDA : GPZDAセンテンスデータ

editedData.timestamp : GPZDAセンテンスの日付時刻情報（Date型）
```


## staticメソッド

```javascript
  // NMEAの緯度経度を「度分秒」(DMS)の文字列に変換
  static nmea2dms(v)

  // NMEAの緯度経度を「度分」(DM)の文字列に変換
  static nmea2dm(v)

  // NMEAの緯度経度を「度」(DD)の文字列に変換
  static nmea2dd(v)

  // NMEAの緯度経度を「秒」(S)の数値に変換
  static nmea2s(v)
```
 
 
## 使用例
 
 
```javascript
let gps = obniz.wired("GYSFDMAXB", { vcc:7, gnd:8, txd:9, rxd:10, Opps:11 });

gps.start1pps(function() {
    console.log("1pps received.");
});

function mainLoop() {
  var data = gps.getEditedData();
  if (data.enable) {
    if (data.GPGGA)    console.log(data.GPGGA.join(","));
    if (data.GPGLL)    console.log(data.GPGLL.join(","));
    if (data.GPGSA)    console.log(data.GPGSA.join(","));
    if (data.GPGSV[0]) console.log(data.GPGSV[0].join(","));
    if (data.GPGSV[1]) console.log(data.GPGSV[1].join(","));
    if (data.GPGSV[2]) console.log(data.GPGSV[2].join(","));
    if (data.GPGSV[3]) console.log(data.GPGSV[3].join(","));
    if (data.GPRMC)    console.log(data.GPRMC.join(","));
    if (data.GPVTG)    console.log(data.GPVTG.join(","));
    if (data.GPZDA)    console.log(data.GPZDA.join(","));
    if (data.PMTK010)  console.log(data.PMTK010.join(","));
    if (data.PMTK011)  console.log(data.PMTK011.join(","));
  }
  setTimeout(mainLoop, 100);
}

setTimeout(mainLoop, 10);
```


[参考サイト](https://www.petitmonte.com/robot/howto_gysfdmaxb.html)



'use strict';

const Obniz = require("obniz");
const ScrollDisplay = require("./ScrollDisplay.js");

const message = 'This is ScrollDisplay DEMO.\n' + "It's a wonderful smooth scrolling!!\n" + '日本語もスクロールします。';

const obniz = new Obniz("9659-3725");
obniz.onconnect = async function () {

  Obniz.PartsRegistrate(ScrollDisplay);
  const scroll = obniz.wired("ScrollDisplay");
  scroll.speed = 50;//ms

  obniz.display.clear();
  obniz.display.print('ready!');

  obniz.switch.onchange = function(state) {
    $('#print').text(state);
    obniz.display.clear();
    obniz.display.print(state);
  }  

  $('#run').on(tapORclick, function () {
      if (scroll.isScrolling) {
        scroll.stop();
        $('#run').text('Run');
      } else {
        $('#run').text('Stop');
        let fs = $('input[name="fontSize"]:checked').val();
        scroll.font($('input[name="fontFamily"]:checked').val() , Number(fs));
        scroll.baseline = $('input[name="baseline"]:checked').val();
        scroll.text = $('#textarea').val();
        scroll.start();
      }
  });
}

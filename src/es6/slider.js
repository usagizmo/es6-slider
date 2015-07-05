var $ = require('jquery');
var SliderPanel = require('./slider-panel.js');

export default class Slider {
  constructor($el) {
    this.$el = $el;
    this.width = 0;
    this.height = 0;
    this.panels = [];
    this.panelIndex = 0;

    this.setSize();
    this.setPanels();
    this.lineUp();
 }

  setSize() {
    // スライダーのサイズを設定
  }

  setPanels() {
    // パネルの初期化
  }

  setPanel(index) {
    // 現在表示されているパネルのインデックスの設定
    this.lineUp();
  }

  lineUp() {
    // パネルの整列
  }
}

import $ from 'jquery';

export default class SliderPanel {
  constructor(slider, $el) {
    this.slider = slider;
    this.$el = $el;
    this.width = 0;
    this.height = 0;

    this.setSize();
    this.setBindings();
 }

  setSize() {
    // パネルのサイズを設定
  }

  setPostion(position = {top: 0, left: 0}) {
    // パネルの位置を設定
  }

  setBindings() {
    // クリックイベント => パネルの変更
  }
}

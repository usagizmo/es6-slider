import $ from 'jquery';

export default class SliderPanel {
  constructor(slider, index, $el) {
    this.slider = slider;
    this.index = index;
    this.$el = $el;

    this.width = 0;
    this.height = 0;

    this.setSize();
    this.setBindings();
 }

  setSize() {
    this.width = this.$el.width();
    this.height = this.$el.height();
  }

  setPostion(position) {
    this.$el.css(position);
  }

  setBindings() {
    this.$el.on('click', () => {
      this.slider.setPanel(this.index);
    });
  }
}

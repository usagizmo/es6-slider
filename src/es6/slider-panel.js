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
    this.width = this.$el.width();
    this.height = this.$el.height();
  }

  setPostion(position) {
    this.$el.css(position);
  }

  setBindings() {
    var self = this;
    self.$el.on('click', function() {
      var index = $(this).data('index');
      self.slider.setPanel(index);
    });
  }
}

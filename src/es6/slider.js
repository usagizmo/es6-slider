import $ from 'jquery';
import SliderPanel from './slider-panel';

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
    this.width = $(window).width();
    this.height = $(window).height();
  }

  setPanels() {
    var self = this;
    self.panels = [];
    self.$el.find('.slider-panel').each(function() {
      self.panels.push(new SliderPanel(self, $(this)));
    });
  }

  setPanel(index) {
    this.panelIndex = index;
    this.lineUp();
  }

  lineUp() {
    this.panels.forEach((panel, i) => {
      let position = {
        top: this.height / 2 - panel.height / 2,
        left: 0
      };
      if (i < this.panelIndex - 1) {
        position.left = -this.width;
      } else if (i === this.panelIndex - 1) {
        position.left = -panel.width + this.width * 0.1;
      } else if (i === this.panelIndex) {
        position.left = this.width / 2 - panel.width / 2;
      } else if (i === this.panelIndex + 1) {
        position.left = this.width - this.width * 0.1;
      } else if (i > this.panelIndex + 1) {
        position.left = this.width;
      }
      panel.setPostion(position);
    });
  }
}

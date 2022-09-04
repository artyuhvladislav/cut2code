import { throttle, sliderOptions, Listeners } from './utils';
import { data } from './data';
import { MySlider } from './slider';
import { $ } from './dom';
import '../scss/app.scss';
import Glide from '@glidejs/glide';

const mySlider = new MySlider(data);
const listener = new Listeners([]);

function handleScroll() {
  const y = 100;
  if (scrollY > y) {
    $.header.style.background = 'rgba(0, 0, 0, 0.95)';
  } else {
    $.header.style.background = 'none';
  }
}

function handleClick() {
  $.mobileMenu.classList.toggle('mobile-open');
  $.mobileMenuNav.classList.toggle('mobile-menu-open');
}

function handleTabsClick(e) {
  const $target = e.target.closest('[data-id]');
  [...$.tabs.children].forEach((tab, idx) => {
    if (Number($target.dataset.id) === idx) {
      tab.classList.add('active-tab');
    } else {
      tab.classList.remove('active-tab');
    }
  });

  const tabCategory = !!Number($target.dataset.id);
  mySlider.createSliderItems(tabCategory, $.sliderList, $.bullets);
  new Glide('.glide', sliderOptions).mount();
}

function handleButtonSubscribe(e) {
  e.preventDefault();
  alert('Subscribed');
  listener.destroy($.subscribe, 'click');
}

function initSlider() {
  mySlider.createSliderItems(false, $.sliderList, $.bullets);
  new Glide('.glide', sliderOptions).mount();
  listener.destroy(document, 'DOMContentLoaded');
}

listener
  .add({ target: $.tabs, type: 'click', func: handleTabsClick })
  .add({ target: $.mobileMenu, type: 'click', func: handleClick })
  .add({ target: window, type: 'scroll', func: throttle(handleScroll, 200) })
  .add({ target: document, type: 'DOMContentLoaded', func: initSlider })
  .add({ target: $.subscribe, type: 'click', func: handleButtonSubscribe });

listener
  .init($.tabs, 'click')
  .init($.mobileMenu, 'click')
  .init(window, 'scroll')
  .init(document, 'DOMContentLoaded')
  .init($.subscribe, 'click');

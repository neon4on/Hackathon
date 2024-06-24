import { makeAutoObservable } from 'mobx';

class ThemeStore {
  root = document.querySelector(':root');
  theme = 'dark';

  constructor() {
    makeAutoObservable(this);
  }

  setDark() {
    this.theme = 'dark';

    this.root.style.setProperty('--black', '#241f1f');
    this.root.style.setProperty('--sb-grad', 'linear-gradient(90deg, #66d53f 0%, #fcfd54 100%)');
    this.root.style.setProperty('--sb-grad-green', 'linear-gradient(76.08deg, #7bfaa3 4.73%, #20aa4d 100.7%)');
    this.root.style.setProperty('--sb-grad-g-y', `linear-gradient(
      135.42deg,
      rgba(252, 253, 84, 0.2) 17.31 %,
      rgba(32, 170, 77, 0.2) 80.9 %
    )`);

    this.root.style.setProperty('--text-white', '#fff3f3');
    this.root.style.setProperty('--text-secondary-light', '#aecea2');
    this.root.style.setProperty('--text-secondary', '#6b8362');
    this.root.style.setProperty('--text-title17', '#acb97d');

    this.root.style.setProperty('--sb-blue', '#1398d5');
    this.root.style.setProperty('--sb-yellow', '#eeea1a');
    this.root.style.setProperty('--sb-green3', '#2db358');
    this.root.style.setProperty('--sb-green2', '#41c76c');
    this.root.style.setProperty('--sb-green1', '');

    this.root.style.setProperty('--dashboard-backgr', '#273928');
    this.root.style.setProperty('--dashboard-column', '#314332');

    this.root.style.setProperty('--divider-thin', '#aecea212');
    this.root.style.setProperty('--divider-bold', '#acb97d80');
  }

  setLight() {
    this.theme = 'light';

    this.root.style.setProperty('--black', '#241F1F');
    this.root.style.setProperty('--sb-grad', 'linear-gradient(90deg, #66D53F 0%, #E4E010 100%)');
    this.root.style.setProperty('--sb-grad-green', 'linear-gradient(76.08deg, #7BFAA3 4.73%, #20AA4D 100.7%)');
    this.root.style.setProperty('--sb-grad-g-y', `linear-gradient(76.08deg, #7BFAA3 4.73%, #20AA4D 100.7%)`);

    this.root.style.setProperty('--text-white', '#21A049');
    this.root.style.setProperty('--text-secondary-light', '#9ABA8E');
    this.root.style.setProperty('--text-secondary', '#617958');
    this.root.style.setProperty('--text-title17', '');

    this.root.style.setProperty('--sb-blue', '#1398D5');
    this.root.style.setProperty('--sb-yellow', '#E4E010');
    this.root.style.setProperty('--sb-green3', '#2DB358');
    this.root.style.setProperty('--sb-green2', '#41C76C');
    this.root.style.setProperty('--sb-green1', '');

    this.root.style.setProperty('--dashboard-backgr', '#E3F3E4');
    this.root.style.setProperty('--dashboard-column', '#F9FFF9');

    this.root.style.setProperty('--divider-thin', '#AECEA22E');
    this.root.style.setProperty('--divider-bold', '#ACB97D80');
  }
}

export default new ThemeStore();

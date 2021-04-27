import Worm from '../Worm';
import styles from './styles.scss';

export default class App {
  constructor({ projectName }) {
    this.el = document.createElement('div');
    this.el.className = `${styles.root} `;
    this.el.innerHTML = `
      <iframe src="https://sveltekit-test-app.vercel.app/"></iframe>
    `;
  }
}

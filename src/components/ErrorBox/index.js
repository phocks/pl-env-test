import styles from './styles.scss';

export default class ErrorBox {
  constructor({ error }) {
    const el = (this.el = document.createElement('pre'));

    el.className = styles.root;
    el.textContent = `${String(error)}\n\n${error.stack}`;

    (function logOnMount() {
      if (!el.parentNode) {
        return setTimeout(logOnMount, 100);
      }

      console.error(error);
    })();
  }
}

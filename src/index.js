import App from './components/App';
import { DECOY_KEYS, getApplication, getGeneration, getTier, requestDOMPermit } from '@abcnews/env-utils';

const PROJECT_NAME = 'pl-env-test';

function init() {
  requestDOMPermit(DECOY_KEYS.ARTICLE).then(() => {
    // Remove sidebar
    const sidebarEl = document.querySelector("[data-component='ArticleSidebar']").parentElement;
    sidebarEl.classList.add('nodisplay');
    sidebarEl.classList.add('u-full');

    // It is now safe to modify the DOM tree below the decoy
    const root = document.querySelector('[data-component="Sidebar"]');
    render(new App({ projectName: PROJECT_NAME }).el, root);
  });
}

init();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    try {
      init();
    } catch (err) {
      import('./components/ErrorBox').then(({ default: ErrorBox }) => {
        render(new ErrorBox({ error: err }).el, root);
      });
    }
  });
}

if (process.env.NODE_ENV === 'development') {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}

function render(el, parentEl) {
  if (parentEl === null) {
    throw new Error('parentEl is not an Element');
  }

  while (parentEl.firstElementChild) {
    parentEl.removeChild(parentEl.firstElementChild);
  }

  parentEl.appendChild(el);
}

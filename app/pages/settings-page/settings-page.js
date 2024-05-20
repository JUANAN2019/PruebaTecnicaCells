/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { layout2cols2 } from '../../scripts/utils/layouts.js';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-divider/bbva-web-divider.js';
import '@bbva-web-components/bbva-web-form-toggle/bbva-web-form-toggle.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './settings-page-styles.js';

const DEFAULT_I18N_KEYS = {
  title: 'settings-page.title'
};

/* eslint-disable new-cap */
class SettingsPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'settings-page';
  }

  static get properties() {
    return {
      /**
       * Custom keys for default texts
       */
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  constructor() {
    super();

    this.i18nKeys = {};
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);

    const queryScope = this.shadowRoot || this;
    this._toggleEn = queryScope.querySelector('.toggle-en');
    this._toggleEs = queryScope.querySelector('.toggle-es');
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  static get styles() {
    return [ styles ];
  }

  render() {
    return html`
      <demo-web-template
        page-title="User settings"
        detail-variant="dark"
        reset-detail-on-state-change
        @detail-opened-change="${(ev) => (this.detailOpened = ev.detail.value)}"
      >
        <div slot="app-top-content" class="overlap">
          <h1>${this.t(this._i18nKeys.title)}</h1>
        </div>

        <div slot="app-main-content">
          ${this._userSettingsTpl}
        </div>
      </demo-web-template>
    `;
  }

  get _userSettingsTpl() {
    return html`
      <bbva-foundations-grid-tools-layout .layout="${layout2cols2}">
        <ul class="language-settings" slot="left">
          <li>
            <bbva-web-form-toggle 
              class="toggle-en"
              value="en-US" 
              variant="left"
              @input="${(this._onInputToggle)}"
              checked
            >
              English
            </bbva-web-form-toggle>

            <bbva-web-divider></bbva-web-divider>
          </li>
          <li>
            <bbva-web-form-toggle 
              class="toggle-es"
              value="es-ES" 
              variant="left"
              @input="${(this._onInputToggle)}"
            >
              Español
            </bbva-web-form-toggle>
          </li>
        </ul>
      </bbva-foundations-grid-tools-layout>
    `;
  }

  _onInputToggle(ev) {
    const { checked, value } = ev.target;
    let language = 'en-US';

    if (ev.target === this._toggleEn) {
      this._toggleEs.checked = !checked;
      language = checked ? value : 'es-ES';

    } else {
      this._toggleEn.checked = !checked;
      language = checked ? value : 'en-US';
    }

    localStorage.setItem('language', language);
    window.IntlMsg.lang = localStorage.getItem('language');
  }
}

window.customElements.define(SettingsPage.is, SettingsPage);
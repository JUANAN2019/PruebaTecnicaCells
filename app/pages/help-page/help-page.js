/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-web-list-item-bullet/bbva-web-list-item-bullet.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './help-page-styles.js';

const DEFAULT_I18N_KEYS = {
  fifthList: 'help-page.fifth-li',
  firstList: 'help-page.first-li',
  fourthList: 'help-page.fourth-li',
  headerText: 'help-page.header-text',
  secondList: 'help-page.second-li',
  text: 'help-page.text',
  thirdList: 'help-page.third-li'
};

/* eslint-disable new-cap */
class HelpAPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'help-page';
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
        page-title="Help page"
        detail-variant="dark"
        reset-detail-on-state-change
        @detail-opened-change="${(ev) => (this.detailOpened = ev.detail.value)}"
      >
        <div slot="app-top-content" class="overlap">
          <h1>${this.t(this._i18nKeys.headerText)}</h1>
        </div>

        <div slot="app-main-content">
          <p>${this.t(this._i18nKeys.text)}</p>

          <div role="list">
            <bbva-web-list-item-bullet>${this.t(this._i18nKeys.firstList)}</bbva-web-list-item-bullet>
            <bbva-web-list-item-bullet>${this.t(this._i18nKeys.secondList)}</bbva-web-list-item-bullet>
            <bbva-web-list-item-bullet>${this.t(this._i18nKeys.thirdList)}</bbva-web-list-item-bullet>
            <bbva-web-list-item-bullet>${this.t(this._i18nKeys.fourthList)}</bbva-web-list-item-bullet>
            <bbva-web-list-item-bullet>${this.t(this._i18nKeys.fifthList)}</bbva-web-list-item-bullet>
          </div>
        </div>

      </demo-web-template>
    `;
  }
}

window.customElements.define(HelpAPage.is, HelpAPage);
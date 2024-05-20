/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { randomID } from '@bbva-web-components/bbva-core-lit-helpers/utils/randomId.js';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import {
  bbvaCarbonfootprint,
  bbvaClimateaction,
  bbvaInclusivegrowth,
  bbvaFacebook,
  bbvaTwitter,
  bbvaInstagram,
  bbvaLinkedin,
  bbvaGoogleplus,
  bbvaPinterest,
  bbvaYoutube
} from '@bbva-web-components/bbva-foundations-icons';
import {
  expenses,
  moneygraphic
} from '@bbva-web-components/bbva-foundations-microillustrations';
import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-web-form-fieldset/bbva-web-form-fieldset.js';
import '@bbva-web-components/bbva-web-form-radio-button/bbva-web-form-radio-button.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer-language-list-item.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './login-page-styles.js';

const panelIcons = {
  carbonfootprint: bbvaCarbonfootprint(),
  climateaction: bbvaClimateaction(),
  inclusivegrowth: bbvaInclusivegrowth(),
};

const footerIcons = {
  facebook: bbvaFacebook(),
  twitter: bbvaTwitter(),
  instagram: bbvaInstagram(),
  linkedin: bbvaLinkedin(),
  googleplus: bbvaGoogleplus(),
  pinterest: bbvaPinterest(),
  youtub: bbvaYoutube()
};

const DEFAULT_I18N_KEYS = {
  outstandingHeader1: 'login-page.outstanding-opportunity-module-1-header',
  outstandingHeader2: 'login-page.outstanding-opportunity-module-2-header',
  outstandingTitle1: 'login-page.outstanding-opportunity-module-1-title',
  outstandingTitle2: 'login-page.outstanding-opportunity-module-2-title',
  menuTab1: 'login-page.menu-tab-1',
  menuTab2: 'login-page.menu-tab-2',
  menuAccess: 'login-page.menu-access',
  formHeading: 'login-page.form-heading',
  legendRadio: 'login-page.form-legend-radio',
  labelRadio1: 'login-page.form-radio-1',
  labelRadio2: 'login-page.form-radio-2',
  labelInput1: 'login-page.form-input-1-label',
  labelInput2: 'login-page.form-input-2-label',
  labelInput3: 'login-page.form-input-3-label',
  labelCheck: 'login-page.form-checkbox-label',
  labelButton: 'login-page.form-button',
  footerNavigation1: 'login-page.footer-navigation-item-1',
  footerNavigation2: 'login-page.footer-navigation-item-2',
  footerNavigation3: 'login-page.footer-navigation-item-3',
  footerNavigation4: 'login-page.footer-navigation-item-4',
  footerNavigation5: 'login-page.footer-navigation-item-5',
  footerNavigation6: 'login-page.footer-navigation-item-6',
  footerNavigation7: 'login-page.footer-navigation-item-7',
  footerNavigation8: 'login-page.footer-navigation-item-8',
  footerClaim: 'login-page.footer-claim',
};

/* eslint-disable new-cap */
class LoginPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'login-page';
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

      /**
       * Show/hide the access form
       */
      showForm: {
        type: Boolean,
        attribute: 'show-form',
      },

      _uniqueId: {
        type: String,
        attribute: false,
      },
    };
  }

  constructor() {
    super();

    this.i18nKeys = {};
    this.showForm = false;
    this._uniqueId = randomID();
  }

  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);

    const queryScope = this.shadowRoot || this;
    this._dm = queryScope.querySelector('demo-data-dm');
    this._form = queryScope.querySelector('form');
    window.IntlMsg.lang = localStorage.getItem('language') || 'en-US';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  render() {

    return html` 
      <demo-web-template
        page-title="Login"
      >
        <div slot="app-top-content">
          ${this._headerTpl}
        </div>

        <div slot="app-main-content">
          ${this._formLoginTpl}
          ${this._opportunityTpl(this.t(this._i18nKeys.outstandingHeader1), this.t(this._i18nKeys.outstandingTitle1), expenses)}
          ${this._opportunityTpl(this.t(this._i18nKeys.outstandingHeader2), this.t(this._i18nKeys.outstandingTitle2), moneygraphic)}
        </div>

        <div slot="app-main-content" data-grid="full-width">
          ${this._footerTpl}
        </div>

        <demo-data-dm @settings="${this._getUserSettings}"></demo-data-dm>
      </demo-web-template>
    `;
  }

  get _headerTpl() {
    return html`
      <h1 class="hidden"> login web template </h1>
      <bbva-web-header-public-web 
        description="BBVA Home" 
        logo-href="https://www.bbva.es" 
        logo-target="_blank" 
        register-href="https://www.bbva.es/general/hazte-cliente/abrir-cuenta-bancaria-online.html" 
        register-target="_blank"
        selected-tab="1"
        show-login 
        show-register 
        show-search
        tab-1-label="${this.t(this._i18nKeys.menuTab1)}"
        tab-2-label="${this.t(this._i18nKeys.menuTab2)}"
      >
        <bbva-web-button-default 
          aria-controls="${this._uniqueId}"
          aria-expanded="${this.showForm}" 
          id="access"
          class="login" 
          size="l" 
          slot="login-desktop"
          variant="positive" 
          @click="${this._onLoginClick}"
        >
          ${this.t(this._i18nKeys.menuAccess)}
        </bbva-web-button-default>
      </bbva-web-header-public-web>
    `;
  }

  get _formLoginTpl() {
    return html`
      <bbva-core-collapse id="${this._uniqueId}" ?opened="${this.showForm}">
        <form enctype="multipart/form-data">
          <bbva-web-form-fieldset legend="${this.t(this._i18nKeys.legendRadio)}" sr-only>
            <bbva-web-form-radio-button name="client" value="yes" checked>${this.t(this._i18nKeys.labelRadio1)}</bbva-web-form-radio-button>
            <bbva-web-form-radio-button name="client" value="no">${this.t(this._i18nKeys.labelRadio2)}</bbva-web-form-radio-button>
          </bbva-web-form-fieldset>
          
          <h2>${this.t(this._i18nKeys.formHeading)}</h2>
          <bbva-web-form-text id="company" label="${this.t(this._i18nKeys.labelInput1)}"></bbva-web-form-text>
          <bbva-web-form-text id="user" label="${this.t(this._i18nKeys.labelInput2)}"></bbva-web-form-text>
          <bbva-web-form-text id="password" label="${this.t(this._i18nKeys.labelInput3)}"></bbva-web-form-text>
          <bbva-web-form-checkbox name="remember" value="1" checked>
            ${this.t(this._i18nKeys.labelCheck)}
          </bbva-web-form-checkbox>
          <bbva-web-button-default
            id="send"
            type="button" 
            @click="${this._doLogin}"
          >
            ${this.t(this._i18nKeys.labelButton)}
          </bbva-web-button-default>
        </form>
      </bbva-core-collapse>
    `;
  }

  _opportunityTpl(title, subtitle, micro) {
    return html`
      <div class="opportunity">
        <div class="opportunity-header">
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </div>

        <bbva-web-panel-outstanding-opportunity>
          <bbva-web-panel-outstanding-opportunity-item 
            heading="Lorem ipsum dolor sit amet consectetur" 
            heading-icon="${panelIcons.climateaction}" 
            link="Link" slot="main" 
            bg-img="./resources/example.jpg"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </bbva-web-panel-outstanding-opportunity-item>

          <bbva-web-panel-outstanding-opportunity-item 
            heading="Lorem ipsum dolor sit" 
            link="Link" 
            slot="secondary"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
            <div slot="micro">${micro}</div>
          </bbva-web-panel-outstanding-opportunity-item>

          <bbva-web-panel-outstanding-opportunity-item 
            heading="Lorem ipsum dolor sit" 
            link="Link" 
            icon="${panelIcons.carbonfootprint}" 
            slot="tertiary1"
          >
            Lorem ipsum dolor sit amet, consectetur
          </bbva-web-panel-outstanding-opportunity-item>

          <bbva-web-panel-outstanding-opportunity-item 
            heading="Lorem ipsum dolor sit" 
            link="Link" 
            icon="${panelIcons.inclusivegrowth}" 
            slot="tertiary2"
          >
            Lorem ipsum dolor sit amet, consectetur
          </bbva-web-panel-outstanding-opportunity-item>
        </bbva-web-panel-outstanding-opportunity>
      </div>
    `;
  }

  get _footerTpl() {
    return html`
      <bbva-web-module-footer 
        copyright="© 2022 Banco Bilbao Bizcaya Argentaria, S.A."
        claim="${this.t(this._i18nKeys.footerClaim)}"
      >
        <bbva-web-module-footer-language-list-item slot="languages" ?selected="${window.IntlMsg.lang === 'es-ES'}">Castellano</bbva-web-module-footer-language-list-item>
        <bbva-web-module-footer-language-list-item slot="languages">Catalá</bbva-web-module-footer-language-list-item>
        <bbva-web-module-footer-language-list-item slot="languages" ?selected="${window.IntlMsg.lang === 'en-US'}">English</bbva-web-module-footer-language-list-item>
        <bbva-web-module-footer-language-list-item slot="languages">Gallego</bbva-web-module-footer-language-list-item>
        <bbva-web-module-footer-language-list-item slot="languages">Euskera</bbva-web-module-footer-language-list-item>

        <bbva-web-link-list-item icon="${footerIcons.facebook}" icon-link variant="subdued" href="https://www.facebook.com/BBVAGroup/" target="_blank" slot="social-networks">facebook</bbva-web-link-list-item>
        <bbva-web-link-list-item icon="${footerIcons.twitter}" icon-link variant="subdued" href="https://twitter.com/bbva" target="_blank" slot="social-networks">twitter</bbva-web-link-list-item>
        <bbva-web-link-list-item icon="${footerIcons.instagram}" icon-link variant="subdued" href="https://www.instagram.com/bbva/" target="_blank" slot="social-networks">instagram</bbva-web-link-list-item>
        <bbva-web-link-list-item icon="${footerIcons.linkedin}" icon-link variant="subdued" href="https://www.linkedin.com/company/bbva" target="_blank" slot="social-networks">linkedin</bbva-web-link-list-item>
        <bbva-web-link-list-item icon="${footerIcons.pinterest}" icon-link variant="subdued" href="https://www.pinterest.es/grupobbva/" target="_blank" slot="social-networks">pinterest</bbva-web-link-list-item>
        <bbva-web-link-list-item icon="${footerIcons.youtube}" icon-link variant="subdued" href="https://www.youtube.com/user/bbva" target="_blank" slot="social-networks">youtube</bbva-web-link-list-item>      

        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation1)}</bbva-web-link-list-item>
        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation2)}</bbva-web-link-list-item>
        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation3)}</bbva-web-link-list-item>
        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation4)}</bbva-web-link-list-item>
        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation5)}</bbva-web-link-list-item>
        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation6)}</bbva-web-link-list-item>
        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation7)}</bbva-web-link-list-item>
        <bbva-web-link-list-item variant="subdued" slot="navigation">${this.t(this._i18nKeys.footerNavigation8)}</bbva-web-link-list-item>
      </bbva-web-module-footer>
    `;
  }

  _onLoginClick() {
    this.showForm = !this.showForm;
  }

  _doLogin(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this._dm.getUserSettings();
  }

  _getUserSettings({ detail }) {
    const { lang } = detail;

    localStorage.setItem('language', lang);

    window.setTimeout(() => {
      window.IntlMsg.lang = lang;
    }, 0);

    this.navigate('dashboard');
  }
}

window.customElements.define(LoginPage.is, LoginPage);

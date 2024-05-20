/* eslint-disable no-unused-expressions */
import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { layout2cols } from '../../scripts/utils/layouts.js';
import { mask } from '@bbva-web-components/bbva-core-lit-helpers/utils/mask.js';
import { bbvaCopy, bbvaEdit, bbvaHelp, bbvaTasks, bbvaEmail, bbvaBuilding, bbvaFeedback } from '@bbva-web-components/bbva-foundations-icons';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { MENU_ITEMS } from '../../scripts/app-routes.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-amount/bbva-web-amount.js';
import '@bbva-web-components/bbva-web-badge-default/bbva-web-badge-default.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-expandable-accordion/bbva-web-expandable-accordion.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-web-clip-entities/bbva-web-clip-entities.js';
import '@bbva-web-components/bbva-web-form-select-filter/bbva-web-form-select-filter.js';
import '@bbva-web-components/bbva-web-list-item-definition-amount/bbva-web-list-item-definition-amount.js';
import '@bbva-web-components/bbva-web-notification-message/bbva-web-notification-message.js';
import '@bbva-web-components/bbva-web-progress-bar/bbva-web-progress-bar.js';
import '@bbva-web-components/bbva-web-table-filter/bbva-web-table-filter.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import '@cells-demo/demo-table-movements/demo-table-movements.js';
import { bbvaWebFormCheckboxControlAmbient } from '@bbva-web-components/bbva-web-form-checkbox';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-text';
import { bbvaWebListItemDefinitionAmountAmbient } from '@bbva-web-components/bbva-web-list-item-definition-amount';
import { bbvaWebFormSelectFilterAmbient } from '@bbva-web-components/bbva-web-form-select-filter';
import styles from './dashboard-page-styles.js';

const iconset = {
  copy: bbvaCopy(),
  edit: bbvaEdit()
};

const HEADER_ICONS = [{
  icon: bbvaHelp(),
  label: 'Help'
}, {
  icon: bbvaTasks(),
  label: 'Task'
}, {
  icon: bbvaEmail(),
  label: 'Email',
  notifications: 0
}, {
  icon: bbvaBuilding(),
  label: 'Building'
}, {
  icon: bbvaFeedback(),
  label: 'Feedback'
}];

const DEFAULT_I18N_KEYS = {
  accountDetail: 'dashboard-page.account-detail',

  accountMovements: 'dashboard-page.account-movements',
  accountNumber: 'dashboard-page.account-number',
  accountType: 'dashboard-page.account-type',
  alias: 'dashboard-page.alias',
  allowableLimit: 'dashboard-page.allowable-limit',
  arranged: 'dashboard-page.arranged',
  arrangedAllowableLimit: 'dashboard-page.arranged-allowable-limit',
  availableBalance: 'dashboard-page.available-balance',
  businessName: 'dashboard-page.business-name',
  copyAccountNumber: 'dashboard-page.copy-account-number',
  currency: 'dashboard-page.currency',
  difference: 'dashboard-page.difference',
  editAlias: 'dashboard-page.edit-alias',
  entity: 'dashboard-page.entity',
  selectAccount: 'dashboard-page.select-account',
  totalAccountBalance: 'dashboard-page.total-account-balance',
};

/* eslint-disable new-cap */
class DashboardPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'dashboard-page';
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

      _accounts: {
        type: Array,
        attribute: false,
      },

      _accountId: {
        type: String,
        attribute: false,
      },

      _accountMovements: {
        type: Array,
        attribute: false,
      },

      _customFilters: {
        type: Array,
        attribute: false,
      },

      _customLinks: {
        type: Array,
        attribute: false,
      },

      _detailOpened: {
        type: Boolean,
        attribute: false,
      },

      _openFilter: {
        type: Boolean,
        attribute: false,
      },

      _selectAccount: {
        type: Object,
        attribute: false,
      },
    };
  }

  constructor() {
    super();

    this.i18nKeys = {};
    this._resetData();
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.subscribe('detail_open', (ev) => {
      this._detailOpened = ev;
    });

    this.publish('navigation_info', MENU_ITEMS);
    this.publish('header_info', HEADER_ICONS);
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);

    const queryScope = this.shadowRoot || this;
    this._selectAccounts = queryScope.querySelector('.select-account');
    this._tableMovements = queryScope.querySelector('demo-table-movements');
    this._dm = queryScope.querySelector('demo-data-dm');
  }

  updated(props) {
    super.updated && super.updated(props);

    if (props.has('_detailOpened') && !this._detailOpened) {
      this._tableMovements.cleanSelected = true;
    }

    if (props.has('_accountId') && this._accountId !== '') {
      this._dm.getAccountMovement(this._accountId);
    }

    if (props.has('_accounts') && this._accounts.length) {
      this._selectAccounts.querySelectorAll('bbva-web-form-option-filter').forEach(option => {
        if (option.selected) {
          this._accountId = option.value;
          this._selectAccount = this._accounts.filter(account => account.account === this._accountId)[0];
        }
      });

      this._dm.getAccountMovement(this._accountId);
    }
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  onPageEnter() {
    if (!this._accounts.length) {
      this._dm.getData();
    }
  }

  onPageLeave() {
    this._resetData();
  }

  static get styles() {
    return [
      bbvaWebFormCheckboxControlAmbient.light,
      bbvaWebFormFieldAmbient.light,
      bbvaWebFormSelectFilterAmbient.light,
      bbvaWebListItemDefinitionAmountAmbient.light,
      styles
    ];
  }

  render() {

    return html`
      <demo-web-template
        page-title="Dashboard"
        reset-detail-on-state-change
      >
        <div class="top" slot="app-top-content">
        <h1 class="hidden"> dashboard web template </h1>
          <bbva-foundations-grid-tools-layout .layout="${layout2cols}">
            <div class="content-top" slot="left" ambient="light100">
              ${this._contentTopHeaderTpl}
              ${this._selectAccount ? this._contentTopTpl : ''}
              ${this._selectAccount ? this._contentDetailTpl : ''}
            </div>
          </bbva-foundations-grid-tools-layout>
        </div>
        
        <div class="main" slot="app-main-content">
          <h2>${this.t(this._i18nKeys.accountMovements)}</h2>
          ${this._tableContentTpl}
        </div>

        <demo-data-dm 
          @Data="${this._getData}" 
          @account="${this._getDataMovements}"
        ></demo-data-dm>
      </demo-web-template>
    `;
  }

  get _contentTopHeaderTpl() {
    return html`
      <bbva-web-form-select-filter 
        class="select-account"
        label="${this.t(this._i18nKeys.selectAccount)}" 
        variant="clip-product-header"
        @filter-option-click="${this._onSelectOptionClick}"
      >
        ${this._accounts.map((account, index) => {
    this._accountId = index === 0 ? account.account : '';
    return html`
            <bbva-web-form-option-filter value="${account.account}" ?selected="${index === 0}">
              <bbva-web-clip-entities 
                asset="${account.entity.substring(account.entity.indexOf(':') + 1).toLowerCase()}"
                slot="clip"
              >
                ${account.entity.substring(account.entity.indexOf(':') + 1).toLowerCase()}
              </bbva-web-clip-entities>

              <span slot="description">${mask(account.account, '•', true, 4)}</span>

              ${account.alias || account.title.substring(0, account.title.lastIndexOf(' '))}
            </bbva-web-form-option-filter>
          `;
  })}
      </bbva-web-form-select-filter>
    `;
  }

  get _contentTopTpl() {
    return html`
      <div class="definitions" role="list">
        <bbva-web-list-item-definition-amount
          class="definition"
          heading="${this.t(this._i18nKeys.totalAccountBalance)}"
          role="listitem"
        >
          <bbva-web-amount 
            slot="amount" 
            amount="${this._selectAccount.amount}" 
            currency-code="${this._selectAccount.currency}"
            iso
          ></bbva-web-amount>
        </bbva-web-list-item-definition-amount>

        <bbva-web-list-item-definition-amount
          class="definition"
          heading="${this.t(this._i18nKeys.difference)}"
          role="listitem"
        >
          <bbva-web-amount 
            slot="amount" 
            amount="${this._selectAccount.disposableAmount - this._selectAccount.amount}" 
            currency-code="${this._selectAccount.currency}"
            iso
          ></bbva-web-amount>
        </bbva-web-list-item-definition-amount>
        
        <bbva-web-list-item-definition-amount
          class="definition"
          heading="${this.t(this._i18nKeys.availableBalance)}"
          role="listitem"
        >
          <bbva-web-amount 
            slot="amount" 
            amount="${this._selectAccount.disposableAmount}" 
            currency-code="${this._selectAccount.currency}"
            iso
          ></bbva-web-amount>
        </bbva-web-list-item-definition-amount>
      </div>

      ${this._progressTpl}
    `;
  }

  get _progressTpl() {
    return html`
      <div class="progress">
        <bbva-web-progress-bar 
          current="${this._selectAccount.arranged}"
          max="${this._selectAccount.allowableLimit}" 
          variant="success"
        >
          ${this.t(this._i18nKeys.arrangedAllowableLimit)}
        </bbva-web-progress-bar>
        
        <div class="progress-info">
          <div>
            <span>${this.t(this._i18nKeys.arranged)}</span>
            <bbva-web-amount 
              amount="${this._selectAccount.arranged}" 
              currency-code="${this._selectAccount.currency}"
              iso
              size="m"
              slot="amount" 
            ></bbva-web-amount>
          </div>

          <div>
            <span>${this.t(this._i18nKeys.allowableLimit)}</span>
            <bbva-web-amount 
              amount="${this._selectAccount.allowableLimit}" 
              currency-code="${this._selectAccount.currency}"
              iso
              size="m"
              slot="amount" 
            ></bbva-web-amount>
          </div>
        </div>
      </div>
    `;
  }

  get _contentDetailTpl() {
    return html`
      <div class="content-detail">
        <bbva-web-expandable-accordion header-title="${this.t(this._i18nKeys.accountDetail)}" size="s">
          <ul class="account-detail">
            <li>
              <bbva-web-list-item-simple
                icon-actions
                link-icon="${iconset.copy}"
                link-text="${this.t(this._i18nKeys.accountNumber)}"
              >
                <span slot="label">${this.t(this._i18nKeys.accountNumber)}</span>
                <span slot="description">${this._getFormatAccountNumber(this._selectAccount.account)}</span>
              </bbva-web-list-item-simple>
            </li>
            <li>
              <bbva-web-list-item-simple>
                <span slot="label">${this.t(this._i18nKeys.accountType)}</span>
                <span slot="description">${this._selectAccount.type}</span>
              </bbva-web-list-item-simple>
            </li>
            <li>
              <bbva-web-list-item-simple>
                <span slot="label">${this.t(this._i18nKeys.businessName)}</span>
                <span slot="description">${this._selectAccount.name}</span>
              </bbva-web-list-item-simple>
            </li>
            <li>
              <bbva-web-list-item-simple
                icon-actions
                link-icon="${iconset.edit}"
                link-text="${this.t(this._i18nKeys.editAlias)}"
              >
                <span slot="label">${this.t(this._i18nKeys.alias)}</span>
                <span slot="description">${this._selectAccount.alias}</span>
              </bbva-web-list-item-simple>
            </li>
            <li>
              <bbva-web-list-item-simple>
                <span slot="label">${this.t(this._i18nKeys.currency)}</span>
                <span slot="description">${this._selectAccount.currency}</span>
              </bbva-web-list-item-simple>
            </li>
            <li>
              <bbva-web-list-item-simple>
                <span slot="label">${this.t(this._i18nKeys.entity)}</span>
                <span slot="description">${this._selectAccount.entityName}</span>
              </bbva-web-list-item-simple>
            </li>
          </ul>
        </bbva-web-expandable-accordion>
      </div>
    `;
  }

  get _tableContentTpl() {
    return html`
      <demo-table-movements 
        .data="${this._accountMovements}" 
        @item-detail-click="${this._onDetailToggleClick}"
      ></demo-table-movements>
    `;
  }

  _getData(ev) {
    this._incomes = ev.detail.incomes;
    this._accounts = ev.detail.accounts;
    this.publish('accounts', this._accounts);
  }

  _getDataMovements(ev) {
    this._accountMovements = ev.detail.movements;
  }

  _getFormatAccountNumber(account) {
    return account?.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  _onDetailToggleClick(ev) {
    const { id, selected } = ev.detail;
    const showDetail = selected && this._detailOpened ? false : true;

    this.publish('detail_open', showDetail);
    this.publish('detail_data', this._accountMovements[id]);
  }

  _onSelectOptionClick(ev) {
    const { value } = ev.detail;

    this._accountMovements = [];
    this._accountId = value;
    this._selectAccount = this._accounts.filter(account => account.account === this._accountId)[0];
    this._dm.getAccountMovement(this._accountId);
    this.publish('detail_open', false);
  }

  _resetData() {
    this._accountMovements = [];
    this._accounts = [];
    this._accountId = '';
    this._detailOpened = false;
    this._selectAccount = {};
  }
}

window.customElements.define(DashboardPage.is, DashboardPage);

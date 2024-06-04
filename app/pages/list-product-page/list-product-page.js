import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
import '@bbva-web-components/bbva-web-badge-default/bbva-web-badge-default.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@cells-demo/demo-web-template/demo-web-template.js';


const DEFAULT_I18N_KEYS = {
  header: 'list-products.header',
  deletebtn: 'list-products.product-button-delete'

};

/* eslint-disable new-cap */
// Eliminamos ciclos de vida que no utilizamos
class ListProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'list-product-page';
  }

  static get properties() {
    return {
      i18nKeys: {
        type: Object,
        attribute: false,
      },
      _product: {
        type: Array,
        attribute: false,
      },
      _products: {
        type: Array,
        attribute: false,
      },

    };
  }

  constructor() {
    super();

    this.i18nKeys = {};
    this._resetData();
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  onPageEnter() {

    this.subscribe('add_product', (ev) => {
      this._product = ev;

    });
    this._handleAddProduct(this._product);

  }

  //💪 muy bien reset data al salir de la pagina
  onPageLeave() {
    this._resetData();

  }

  render() {
    return html`
      <demo-web-template page-title="List Products">
        <div class="top" slot="app-top-content">
          <h1>${this.t(this._i18nKeys.header)}</h1>
        </div>
        <div class="main" slot="app-main-content">  
          ${this._renderCardProduct()}
        </div>
        <demo-data-dm ></demo-data-dm>
      </demo-web-template>
    `;
  }
  _renderCardProduct() {
    this._products = JSON.parse(localStorage.getItem('products')) || [];
    return html`
    ${this._products.map((product, index) => html`
      
      <bbva-web-card-product
        class = "card"
        badge-text="${product.nameP}"
        button-text=""
        image="${product.imageP}"
        preheading="${product.priceP} €"
       
      >
      <bbva-web-button-default
            id="delProduct"
            slot="button" 
            @click="${() => this._delProduct(index)}"
          >${this.t(this._i18nKeys.deletebtn)}
          </bbva-web-button-default>
      </bbva-web-card-product>

    `)}
  `;
  }


  // Recuerda que para tratar con arrays y objetos tenemos que cambiar la referencía, para esto nos ayudamos del operador spread, evitemos hacer push
  _handleAddProduct(product) {
    this._products = [
      ...this._products,
      product
    ];

    localStorage.setItem('products', JSON.stringify(this._products));
  }

  //💪 muy bien utilizamos filter
  _delProduct(index) {
    const filteredProducts = this._products.filter((product, i) => i !== index);
    this._products = filteredProducts;
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  }

  _resetData() {
    this._product = [],
    this._products = [];
  }
}

window.customElements.define(ListProductPage.is, ListProductPage);

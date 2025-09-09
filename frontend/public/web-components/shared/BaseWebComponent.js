export class BaseWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._locale = 'en';
    this._config = {};
    this._subscription = 'free';
    this._images = [];
    this._translations = {};
  }

  // Observed attributes
  static get observedAttributes() {
    return ['locale', 'config', 'subscription', 'images'];
  }

  // Getters and setters
  get locale() { return this._locale; }
  set locale(value) {
    this._locale = value;
    this.loadTranslations();
    this.render();
  }

  get config() { return this._config; }
  set config(value) {
    this._config = typeof value === 'string' ? JSON.parse(value) : value;
    this.render();
  }

  get subscription() { return this._subscription; }
  set subscription(value) {
    this._subscription = value;
    this.updateFeatures();
  }

  get images() { return this._images; }
  set images(value) {
    this._images = typeof value === 'string' ? JSON.parse(value) : value;
    this.updateImageLibrary();
  }

  // Lifecycle
  connectedCallback() {
    this.loadStyles();
    this.loadTranslations();
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  // Core methods
  async loadTranslations() {
    // For now, use embedded translations
    this._translations = this.getDefaultTranslations()[this._locale] || this.getDefaultTranslations()['en'];
    this.updateUIText();
  }

  loadStyles() {
    const style = document.createElement('style');
    style.textContent = this.getStyles();
    this.shadowRoot.appendChild(style);
  }

  updateFeatures() {
    // Enable/disable features based on subscription
    const isPremium = this._subscription !== 'free';
    this.shadowRoot.querySelectorAll('[data-premium]').forEach(el => {
      el.style.display = isPremium ? '' : 'none';
    });
  }

  updateImageLibrary() {
    // Override in child classes
  }

  updateUIText() {
    // Update all text elements with translations
    this.shadowRoot.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        el.textContent = translation;
      }
    });
  }

  getTranslation(key) {
    const keys = key.split('.');
    let value = this._translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  emit(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  // Abstract methods (override in child classes)
  get appName() {
    throw new Error('appName must be implemented');
  }

  getStyles() {
    throw new Error('getStyles must be implemented');
  }

  getDefaultTranslations() {
    return {};
  }

  render() {
    throw new Error('render must be implemented');
  }

  setupEventListeners() {
    // Override in child classes
  }

  cleanup() {
    // Override in child classes
  }
}
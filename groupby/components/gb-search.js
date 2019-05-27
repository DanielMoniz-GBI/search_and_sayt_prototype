import { html, render } from 'lit-html'

import GBBaseElement from './gb-base-element'

export default class GBSearch extends GBBaseElement {
  constructor() {
    super()
    this.placeholder = undefined
    this.searchBox = undefined
    this.heading = 'example-start-value'

    this.attemptSearch = this.attemptSearch.bind(this)
  }

  attemptSearch() {
    if (this.searchBox.value.length > 2) {
      this.fireEvent('gb-trigger-sayt', { 'searchTerm': this.searchBox.value })
    }
  }

  static get observedAttributes() {
    return ['placeholder']
  }

  connectedCallback() {
    this.addEventListener('keyup', this.attemptSearch)

    let placeholder = this.getAttribute('placeholder')
    if (placeholder === null) {
      placeholder = 'Search here'
    }
    this.innerHTML = `
      <input class="gb-search-box" type='text' placeholder='${placeholder}'></input>
    `
    this.searchBox = this.querySelector('.gb-search-box')
    this.placeholder = placeholder
  }

  disconnectedCallback() {
    this.removeEventListener('keyup', this.attemptSearch)
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this[attr] = newValue

    if (attr === 'placeholder') {
      // @TODO This is hacky. Ideally the re-render observes changes
      // to placeholder automatically.
      this.connectedCallback()
    }
  }
}

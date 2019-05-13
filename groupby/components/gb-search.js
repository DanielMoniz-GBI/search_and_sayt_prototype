import { html, render } from 'lit-html'

import GBBaseElement from './gb-base-element'

export default class GBSearch extends GBBaseElement {
  constructor() {
    super()
    this.searchBox = undefined

    this.addEventListener('keyup', () => {
      console.log('|' + this.searchBox.value + '|');
      if (this.searchBox.value.length > 2) {
        console.log('Triggering SAYT!');
        this.fireEvent('gb-trigger-sayt', { 'searchTerm': this.searchBox.value })
      }
    })
  }

  connectedCallback() {
    let placeholder = this.getAttribute('placeholder')
    if (placeholder === null) {
      placeholder = 'Search here'
    }
    this.innerHTML = `
      <input class="gb-search-box" type='text' placeholder='${placeholder}'></input>
    `
    this.searchBox = this.querySelector('.gb-search-box')
  }
}

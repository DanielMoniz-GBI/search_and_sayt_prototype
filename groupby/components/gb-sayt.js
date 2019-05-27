import { html, render } from 'lit-html'

import GBBaseElement from './gb-base-element'

export default class GBSayt extends GBBaseElement {
  constructor() {
    super()
    this.container = undefined
    this.products = []

    window.addEventListener('gb-trigger-sayt', (event) => {
      this.requestSaytSuggestions(event.detail.searchTerm)
    })

    window.addEventListener('gb-provide-sayt-suggestions', (event) => {
      this.products = event.detail.products
      const products = event.detail.products
      if (!products) { return }
      this.render()
    })

    window.addEventListener('gb-sayt-open', () => this.open())
    window.addEventListener('gb-sayt-close', () => this.close())
    window.addEventListener('click', (event) => {
      if (!this.contains(event.target)) {
        this.close()
      }
    })

    this.renderProducts = this.renderProducts.bind(this)
  }

  connectedCallback() {
    this.firstRender()
    this.container = this.querySelector('.gb-sayt-container')
    this.close()
  }

  firstRender() {
    this.innerHTML = `
      <div class="gb-sayt-container"></div>
    `
  }

  render() {
    this.open()
    if (!this.products || this.products.length === 0) {
      return render(`No items.`, this.container)
    }

    render(this.renderProducts(), this.container)
  }

  renderProducts() {
    return html`
      ${this.products.map(product => {
        return html`
          <div class='product'>
            <p>${product.name}</p>
            <p>${product.price}</p>
            <p><img src="${product.image}" /></p>
          </div>
        `
      })}
    `
  }

  requestSaytSuggestions(searchTerm) {
    this.fireEvent('gb-request-sayt-suggestions', {
      searchTerm,
      quantity: 10,
    })
  }

  open() {
    this.container.classList.add('open')
    this.container.classList.remove('closed')
  }

  close() {
    this.container.classList.add('closed')
    this.container.classList.remove('open')
  }
}

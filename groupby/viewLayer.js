import { html, render } from '/node_modules/lit-html/lit-html.js'

(function() {
  console.log('View layer loaded...');

  class GBBaseElement extends HTMLElement {
    fireEvent(name, data) {
      const event = new CustomEvent(name, {
        bubbles: true,
        detail: data,
      })
      this.dispatchEvent(event)
    }
  }

  class GBSearch extends GBBaseElement {
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
  customElements.define('gb-search', GBSearch)


  class GBSayt extends GBBaseElement {
    constructor() {
      super()
      this.container = undefined
      this.products = []

      window.addEventListener('gb-trigger-sayt', (event) => {
        console.log('Successfully caught SAYT trigger!');
        console.log('Data:', event.detail);
        this.requestSaytSuggestions(event.detail.searchTerm)
      })

      window.addEventListener('gb-provide-sayt-suggestions', (event) => {
        console.log('View layer received event:', event.type);
        this.products = event.detail.products
        const products = event.detail.products
        if (!products) { return }

        console.log('All products: ------------');
        products.forEach((product) => {
          console.log(`${product.name}: ${product.price}`);
        })
        console.log('--------------------------');
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
  customElements.define('gb-sayt', GBSayt)
})()

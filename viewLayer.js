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
      console.log('in constructor for GBSayt');
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
    }

    connectedCallback() {
      console.log('In connectedCallback');
      this.firstRender()
      this.container = this.querySelector('.gb-sayt-container')
    }

    firstRender() {
      this.innerHTML = `
        <div class="gb-sayt-container">No content.</div>
      `
    }

    render() {
      this.container.classList.add('open')
      this.container.classList.remove('closed')
      if (!this.products || this.products.length === 0) {
        return this.container.innerHTML = `No content.`
      }
      this.container.innerHTML = this.products.map(product => {
        return `
          <div class='product'>
            <p>${product.name}</p>
            <p>${product.price}</p>
            <p><img src="${product.image}" /></p>
          </div>
        `
      }).join('')
    }

    requestSaytSuggestions(searchTerm) {
      this.fireEvent('gb-request-sayt-suggestions', {
        searchTerm,
        quantity: 10,
      })
    }
  }
  customElements.define('gb-sayt', GBSayt)
})()

(function() {
  class GBSearch extends HTMLElement {
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

    fireEvent(name, data) {
      const event = new CustomEvent(name, {
        bubbles: true,
        detail: data,
      })
      this.dispatchEvent(event)
    }
  }
  customElements.define('gb-search', GBSearch)

  class GBSayt extends HTMLElement {
    constructor() {
      super()
      console.log('in constructor for GBSayt');
      document.addEventListener('gb-trigger-sayt', (event) => {
        console.log('Successfully caught SAYT trigger!');
        console.log('Data:', event.detail);

        this.getSaytSuggestions().then((products) => {
          console.log('All products: ------------');
          products.forEach((product) => {
            console.log(`${product.name}: ${product.price}`);
          })
          console.log('--------------------------');
        })
      })
    }

    connectedCallback() {
      console.log('In connectedCallback');
      this.innerHTML = `
        <div>SAYT content goes here</div>
      `
    }

    getSaytSuggestions() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const numItems = 10
          const minIndex = Math.random() * (window.mockData.length - numItems)
          resolve(window.mockData.slice(minIndex, minIndex + numItems))
        }, 350)
      })
    }
  }
  customElements.define('gb-sayt', GBSayt)
})()

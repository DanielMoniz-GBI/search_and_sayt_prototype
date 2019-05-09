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
      })
    }

    connectedCallback() {
      console.log('In connectedCallback');
      this.innerHTML = `
        <div>SAYT content goes here</div>
      `
    }
  }
  customElements.define('gb-sayt', GBSayt)
})()

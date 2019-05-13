import GBSearch from './components/gb-search'
import GBSayt from './components/gb-sayt'

(function() {
  console.log('View layer loaded...');

  customElements.define('gb-search', GBSearch)
  customElements.define('gb-sayt', GBSayt)
})()

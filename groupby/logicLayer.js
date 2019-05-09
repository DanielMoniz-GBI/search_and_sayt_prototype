const cache = (function() {
  const cache = {}
  return {
    get: function(key) {
      return cache[key]
    },
    set: function(key, value) {
      cache[key] = value
    },
  }
})();

(function() {
  console.log('Logic layer loaded...');
  document.addEventListener('gb-request-sayt-suggestions', (event) => {
    console.log('Logic layer received event:', event.type);
    console.log('Event details:', event.detail);
    console.log('Event:', event);

    const searchTerm = event.detail.searchTerm
    if (!searchTerm) { return }

    const cachedResponse = cache.get(searchTerm)
    if (cachedResponse) {
      const responseEvent = new CustomEvent('gb-provide-sayt-suggestions', {
        bubbles: true,
        detail: cachedResponse,
      })
      return dispatchEvent(responseEvent)
    }

    const quantity = event.detail.quantity || 5
    const products = window.mockData.filter(product => {
      return product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    }).slice(0, quantity)

    const searchInfo = {
      searchTerm,
      quantity,
      products,
    }
    const responseEvent = new CustomEvent('gb-provide-sayt-suggestions', {
      bubbles: true,
      detail: searchInfo,
    })
    console.log('responseEvent:', responseEvent);
    setTimeout(() => {
      dispatchEvent(responseEvent)
      cache.set(searchTerm, searchInfo)
    }, 400)
  })


})()

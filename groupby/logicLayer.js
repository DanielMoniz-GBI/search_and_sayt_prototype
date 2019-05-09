(function() {
  console.log('Logic layer loaded...');
  document.addEventListener('gb-request-sayt-suggestions', (event) => {
    console.log('Logic layer received event:', event.type);
    console.log('Event details:', event.detail);
    console.log('Event:', event);

    const searchTerm = event.detail.searchTerm
    if (!searchTerm) { return }

    const quantity = event.detail.quantity || 5
    const products = window.mockData.filter(product => {
      return product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    }).slice(0, quantity)

    const responseEvent = new CustomEvent('gb-provide-sayt-suggestions', {
      bubbles: true,
      detail: {
        searchTerm,
        quantity,
        products,
      }
    })
    console.log('responseEvent:', responseEvent);
    setTimeout(() => {
      dispatchEvent(responseEvent)
    }, 400)
  })
})()

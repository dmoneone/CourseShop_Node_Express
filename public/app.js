const fixPrice = (price, format, currency) => {
    return new Intl.NumberFormat(format, {
        currency: currency,
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.course-price').forEach(node => {
    node.textContent = fixPrice(node.textContent, 'ru-RU', 'rub')
})

const $totalCardPrice = document.querySelector('#total-price')
if($totalCardPrice) {
    $totalCardPrice.textContent = fixPrice($totalCardPrice.textContent.split(':')[1], 'ru-RU', 'rub')
}

const $card = document.querySelector('#card')
if($card) {
    $card.addEventListener('click', e => {
        if(e.target.classList.contains('remove-item')) {
            const csrf = e.target.dataset.csrf
            const id = e.target.dataset.id
            fetch('/card/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
              .then(cart => {
                  console.log(cart)
                  if(cart.courses.length){
                    const html = cart.courses.map(c => {
                        return `
                          <tr>
                              <th>${c.title}</th>
                              <th>${c.count}</th>
                              <th>
                                  <button class="btn btn-small remove-item" data-id="${c.id}">remove</button>
                              </th>
                          </tr>
                        `
                    }).join()
                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('#total-price').innerHTML = cart.totalPrice
                  }
                  else{
                    $card.innerHTML = '<p>No items</p>'
                  }
                  
                  $totalCardPrice.textContent = fixPrice($totalCardPrice.textContent, 'ru-RU', 'rub')
              })
        }
    })
}

var instance = M.Tabs.init(document.querySelector('.tabs'));
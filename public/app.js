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
            const id = e.target.dataset.id
            fetch('/card/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
              .then(card => {
                  if(card.basket.length){
                    const html = card.basket.map(c => {
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
                    $card.querySelector('#total-price').innerHTML = card.totalPrice
                  }
                  else{
                    $card.innerHTML = '<p>No items</p>'
                  }
                  $totalCardPrice.textContent = fixPrice($totalCardPrice.textContent.split(':')[1], 'ru-RU', 'rub')
              })
        }
    })
}
document.querySelectorAll('.course-price').forEach(node => {
    node.textContent = new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(node.textContent)
})

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
              })
        }
    })
}
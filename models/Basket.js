const fs = require('fs'), path = require('path')
const { resolve } = require('path')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'basket.json')

class Basket {

    static async add(course) {
        const basket = await Basket.fetch()

        let ind = basket.basket.findIndex(c => c.id === course.id)

        const candidate = basket.basket[ind]

        if (candidate) {
            candidate.count++
            basket.basket[ind] = candidate
        } else {
            course.count = 1
            basket.basket.push(course)
        }

        basket.totalPrice += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(basket), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        })
    }

    static async remove(id) {
        const basket = await Basket.fetch()

        let index = basket.basket.findIndex(c => c.id === id)
        let course = basket.basket[index]

        if(course.count === 1) {
            basket.basket = basket.basket.filter(c => c.id !== id)
        } else {
            basket.basket[index].count--
        }

        basket.totalPrice -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(basket), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(basket)
                }
            })
        })

    }

    static fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Basket

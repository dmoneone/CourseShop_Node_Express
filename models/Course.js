const path = require('path')
const shortid = require('shortid');
const fs = require('fs')

class Course {

    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = shortid.generate()
    }

    toJson() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        let data = await Course.getAllData()
        data = JSON.parse(data)
        data.push(this.toJson())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(data),
                err => {
                    if(err) {
                        reject(arr)
                    } else{
                        resolve(true)
                    }
                }
            )
        })
    }

    static getAllData() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(content)
                    }
                }
            )
        })
    }

    static async getDataById(id) {
        let data = await Course.getAllData()
        data = JSON.parse(data)
        return data.find(item => item.id === id)
    }

    static async update(body){
        let data = await Course.getAllData()
        data = JSON.parse(data)
        
        let ind = data.findIndex(c => c.id == body.id)
        data[ind] = body

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(data),
                err => {
                    if(err) {
                        reject(arr)
                    } else{
                        resolve(true)
                    }
                }
            )
        })
    }
}

module.exports = Course
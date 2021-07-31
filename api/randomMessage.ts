import axios from "axios"

module.exports = (req, res) => {
    axios.get('https://watasalim.vercel.app/api/quotes/random').then((response) => {
        res.send(response.data.quote.body)
    })
}
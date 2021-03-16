import React from 'react'
import Axios from 'axios'

export default class LandingPage extends React.Component{
    state = {
        dataProduct: null
    }

    componentDidMount () {
        this.getDataProduct ()
    }

    getDataProduct = () => {
        Axios.get ('http://localhost:2000/products')
        .then ((res) => {
            this.setState ({dataProduct: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    addToCart = (idProduct, currentStock) => {
        let idUser = localStorage.getItem('id')

        let quantityUser = prompt('Masukan Jumlah Quantity :')
        if(quantityUser === ''){
            alert('Masukan Jumlah Qty')
        }else if(quantityUser > currentStock){
            alert('Qty Melebihi Stock Product')
        }else{
            // Qty Sudah Sesuai -> Cek Apakah Product Sudah Ada Didalam Cart
            Axios.get(`http://localhost:2000/carts?idProduct=${idProduct}`)
            .then((res) => {
                console.log(res.data)



                if(res.data.length === 0){
                    // Ketika Product Belum Ada Di Cart
                    Axios.post(`http://localhost:2000/carts`, {idUser: idUser, idProduct: idProduct, quantity: quantityUser})
                    .then((res) => {
                        alert('Add To Cart Success')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }else{
                    // Ketika Product Udah Ada Di Cart -> Update Qty
                    // Qty Terbaru Tidak Boleh Melebihi Stock
                    let idCart = res.data[0].id
                    let quantityCart = res.data[0].quantity
                    let updateQuantity = Number(quantityUser) + Number(quantityCart)

                    if(updateQuantity > currentStock){
                        alert('Quantity Terbaru Melebihi Stock')
                    }else{
                        Axios.patch(`http://localhost:2000/carts/${idCart}`, {quantity: updateQuantity})
                        .then((res) => {
                            alert('Add To Cart Success')
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    mapDataProduct = () => {
        return this.state.dataProduct.map ((value, index) => {
            return (
                <div key={index}>
                    <div className="card m-3" style={{width: "18rem"}}>
                        <img src={value.img} className="card-img-top" alt="..." height='200px' />
                        <div className="card-body">
                            <h5 className="card-title" style={{lineHeight: '3px'}}>
                                {value.name}
                            </h5>
                            <div className="card-text">
                                <p>
                                    Stock : {value.stock} Items
                                </p>
                                <h5>
                                    Rp. {value.price.toLocaleString('id-ID')}
                                </h5>
                            </div>
                            <input type="button" className="btn btn-primary mt-3 w-100" value="Add To Cart" onClick={() => this.addToCart(value.id, value.stock)} />
                        </div>
                    </div>
                </div>
            )
        })
    }

    render () {
        if (this.state.dataProduct === null) {
            return (
                <div className="container">
                    <div className="row">
                        Now Loading
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row justify-content-center flex-wrap my-5">
                    {
                        this.mapDataProduct ()
                    }
                </div>
            </div>
        )
    }
}

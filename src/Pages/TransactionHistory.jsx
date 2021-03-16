import React from "react"
import Axios from "axios"

class TransactionHistory extends React.Component {

    state = {
        dataTransactions: null
    }

    componentDidMount () {
        this.getDataTransaction ()
    }

    getDataTransaction = () => {
        let idUser = localStorage.getItem ("id")
        Axios.get (`http://localhost:2000/transactions?idUser=${idUser}`)

        .then ((res) => {
            this.setState ({dataTransactions: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    cancelTransaction = (index, idTransaction) => {
        this.state.dataTransactions[index].detail.forEach((value) => {
            console.log(value.productId)

            let idProduct = value.productId
            let quantityProduct = value.productQuantity

            Axios.get(`http://localhost:2000/products/${idProduct}`)
            .then((res) => {
                let currentStock = res.data.stock
                let kembalikanStock = currentStock + quantityProduct

                Axios.patch(`http://localhost:2000/products/${idProduct}`, {stock: kembalikanStock})
                .then((res) => {
                    Axios.patch(`http://localhost:2000/transactions/${idTransaction}`, {status: 'Cancel'})
                    .then((res) => {
                        this.getDataTransaction()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

    mapDataTransaction = () => {
        return this.state.dataTransactions.map ((value, index) => {
            return (
                <div key = {index}>
                    <div className="px-5 py-4 shadow">
                        <div>
                            <h5 style={{lineHeight: '3px'}}>
                                Status :
                            </h5>
                            <h5 className='text-primary'>
                                {value.status}
                            </h5>
                        </div>
                        <div>
                            <h5>
                                Items :
                            </h5>
                        </div>
                        <div className="col-7">
                            {
                                value.detail.map((val, ind) => {
                                    return (
                                        <div key = {ind}>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="mr-4">
                                                        <h5>
                                                            - {val.productName} 
                                                            <span className='ml-3'>
                                                                ( x{val.productQuantity} Items )
                                                            </span>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                
                                })
                            }
                        </div>
                        <div className='mt-5'>
                            <h5 style={{lineHeight: '3px'}}>
                                Total :
                            </h5>
                            <h5 className='text-primary'>
                                Rp.{value.total.toLocaleString('id-ID')}
                            </h5>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 text-right">
                                <input type="button" disabled={value.status === 'Belum Dibayar'? false : true} value="Pay Now" className=" btn btn-primary mr-2" />
                                <input type="button" disabled={value.status === 'Belum Dibayar'? false : true} value="Cancel Transaction" className=" btn btn-warning" onClick={() => this.cancelTransaction(index, value.id)}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    
    render () {
        if (this.state.dataTransactions === null) {
            return (
               null
            )   

        } else {

            return (
                <div className="container mt-5">
                    <div className="row flex-column">
                        {this.mapDataTransaction()}
                    </div>
                </div>
            )   
        }
        
    }
}

export default TransactionHistory
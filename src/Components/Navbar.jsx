import React from 'react'

export default class Navbar extends React.Component{
    render(){
        return(
            <>
                <div className="bg-warning">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className='my-2'>
                                Toko Sepatu
                            </div>
                            <div className='row'>
                                <div className='my-2'>
                                    Transaction History
                                </div>
                                <div className ='my-2 ml-2'>
                                    Shopping Bag
                                </div>
                                <div>
                                    
                                </div>
                                <div className='my-2 mx-2 clickable-element'>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
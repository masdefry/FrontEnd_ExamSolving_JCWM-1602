import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component{

    state = {
        userLogin: false,
        emailUser: null, 
    }

    componentDidMount(){
        this.onUserLogin()
    }

    onUserLogin = () => {
        let idUser = localStorage.getItem('id')

        axios.get(`http://localhost:2000/users/${idUser}`)
        .then((res) => {
            this.setState({userLogin: true, emailUser: res.data.email})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onUserLogout = () => {
        localStorage.removeItem('id')
        this.setState({userLogin: false, emailUser: null})
        alert('Logout Succes')
        
    }

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
                                <div className='my-2 font-weight-bold'>
                                    {
                                        this.state.emailUser?
                                            this.state.emailUser
                                        :
                                            null
                                    }
                                </div>
                                <div className='my-2 ml-2'>
                                    Transaction History
                                </div>
                                <div className ='my-2 ml-2'>
                                    Shopping Bag
                                </div>
                                <div>
                                    
                                </div>
                                <div className='my-2 mx-2 clickable-element'>
                                    {
                                        this.state.userLogin?
                                            <span onClick={this.onUserLogout}>
                                                Logout
                                            </span>
                                        :
                                            <Link to='/login'>
                                                Login
                                            </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
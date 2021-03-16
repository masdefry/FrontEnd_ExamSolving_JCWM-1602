import React from 'react'

// Function
import EmailValidator from './../Supports/Functions/EmailValidator'
import PasswordValidator from '../Supports/Functions/PasswordValidator'
import axios from 'axios'

export default class Login extends React.Component{

    state = {
        email: null,
        password: null,
        error: null
    }

    validasiEmail = () => {
        let inputEmail = this.refs.email.value
        
        let resultEmailValidator = EmailValidator(inputEmail)
        
        if(resultEmailValidator === true){
            this.setState({email: inputEmail, error: null})
        }else{
            this.setState({error: 'Email Minimal 6 Karakter & Harus Mengandung Angka'})
        }
    }

    validasiPassword = () => {
        let inputPassword = this.refs.password.value
        let resultPasswordValidator = PasswordValidator(inputPassword)
        if(resultPasswordValidator === true){
            this.setState({password: inputPassword, error: null})
        }else{
            this.setState({error: 'Password Minimal 6 Karakter & Kombinasi Huruf-Angka'})
        }
    }

    onLogin = () => {
        if(this.state.email === null && this.state.password === null){
            this.setState({error: 'Email & Password Harus Diisi'})
        }else{
            // Cek Apakah Email Sudah Ada Di DB
            axios.get(`http://localhost:2000/users?email=${this.state.email}`)
            .then((res) => {
                console.log(res.data)
                if(res.data.length === 0){
                    // Kalo Datanya Belum Ada -> Post
                    axios.post(`http://localhost:2000/users`, {email: this.state.email, password: this.state.password, role: 'user'})
                    .then((res) => {
                        alert('Register Success')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }else{
                    // Kalo Datanya Udah Ada -> Cek Email & Password Apakah Udah Sesuai
                    if(res.data[0].email === this.state.email && res.data[0].password === this.state.password){
                        alert('Login Success')
                    }else{
                        alert('Login Failed')
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render(){
        return(
            <>
                <div className="container">
                    <div className='d-flex justify-content-center'>
                        <div className="card my-5 w-50">
                            <h5 className="card-header">Login</h5>
                            <div className="card-body">
                                <h6>Insert your email address</h6>
                                <input type='text' ref='email' placeholder='your email address' className='form form-control' onChange={this.validasiEmail}/>
                                <h6 className='my-2'>Insert your password</h6>
                                <input type='text' ref='password' placeholder='your password' className='form form-control' onChange={this.validasiPassword}/>
                                <p className ='text-danger ml-2'>
                                    {
                                        this.state.error
                                    }
                                </p>
                                <button className='btn btn-success' onClick={this.onLogin}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
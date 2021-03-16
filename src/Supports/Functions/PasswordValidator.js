// PASSWORD VALIDATOR

function PasswordValidator(inputPassword){
    let alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    // Password minimal 6 karakter
    if(inputPassword.length < 6) return false

    // Password harus mengandung angka & huruf
    let mengandungAngka = false
    for(let i=0; i < inputPassword.length; i++){
        if(inputPassword[i] >= 0){
            mengandungAngka = true
        }
    }

    let mengandungHuruf = false
    for(let i=0; i < inputPassword.length; i++){
        if(alpha.includes(inputPassword[i])){
            mengandungHuruf = true
        }
    }

    if(mengandungAngka === false || mengandungHuruf === false){
        return false
    }else if(mengandungAngka === true && mengandungHuruf === true){
        return true
    }
}

export default PasswordValidator
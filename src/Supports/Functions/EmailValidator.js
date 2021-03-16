// EMAIL VALIDATOR
// ex. ryandefryan20@gmail.com

// 1. Index paling awal tidak boleh dimulai menggunakan angka
// 2. Nama email minimal 6 karakter dan harus mengandung angka
// 3. Terdapat string sebelum & sesudah @
// 4. Sesudah @ -> Ada string -> Ada .
// 5. Sesudah . -> Ada String

function EmailValidator(inputEmail){
    let number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    // Email dipisah berdasarkan @
    let emailSplit = inputEmail.split('@')

    // Kalo emailSplit lebih dari 2 element -> false
    if(emailSplit.length !== 2) return false
    let emailName = emailSplit[0]
    let hostingEmail = emailSplit[1]

    // Kalo diawali dengan angka -> false
    if(emailName[0] >= 0) return false

    // Nama email minimal 6 karakter & mengandung angka
    if(emailName.length < 6) return false

    let mengandungAngka = false

    for(let i=0; i < emailName.length; i++){
        if(number.includes(emailName[i])){
            mengandungAngka = true
        }
    }
    if(mengandungAngka === false){
        return false
    }

    // Hosting dipisah berdasarkan .
    let hostingEmailSplit = hostingEmail.split('.')
    console.log(hostingEmailSplit)

    if(hostingEmailSplit.length <= 1) return false
    for(let i = 0; i < hostingEmailSplit.length; i++){
        if(hostingEmailSplit[i] === '' || hostingEmailSplit[i] === ' '){
            return false
        }
    }

    return true
}

export default EmailValidator
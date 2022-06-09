export const ValidateEmail = (email) => { 
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
export const ValidatePassword = (password) => { 
    return password.length >= 6
}
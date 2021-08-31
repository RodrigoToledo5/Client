export default function validate_pass(pass,passconfirmation) {
    let errors={}
    if(pass !== passconfirmation){
        errors.pass='Las contraseñas no coinciden'
    }
    return errors
}

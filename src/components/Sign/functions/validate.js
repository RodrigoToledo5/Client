
export default function validate(patient) {
    let errors = {};
    if(!patient.name){
        errors.name = 'El nombre es requerido *';
      }
    if(!patient.lastName){
        errors.lastName = 'Apellido es requerido *';
    }
    if(patient.pass&&patient.pass.length < 5){
      errors.pass='Debe ser mayor a 6 caracteres'
    }
    else if(patient.pass!==patient.passwordconfirmation){
        errors.pass='Las contraseñas no coinciden'
    }
    
    if(!patient.phone){
        errors.phone = 'Teléfono es requerido *';
      }
      else if(!/(?=.*[0-9])/.test(patient.phone)){
        errors.phone = 'Solo se aceptan números'
      }
    if(!patient.dni){
        errors.dni = 'No. de id es requerido *';
      }
      else if(!/(?=.*[0-9])/.test(patient.dni)){
        errors.dni = 'Solo se aceptan números'
      }
    if (!patient.email) {
      errors.email = 'Correo es requerido *';
    } else if (!/\S+@\S+\.\S+/.test(patient.email)) {
      errors.email = 'Correo invalido';
    }
    if (!patient.birth) {
        errors.birth = 'Fecha de nacimiento es requerida *';
      }
    if (!patient.address) {
        errors.address = 'Domicilio es requerida *';
      }
    if (!patient.country) {
    errors.country = 'Pais es requerida *';
    }
    
  
    return errors;
  };
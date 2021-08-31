import React, { useCallback, useState } from 'react'
import { useFirebaseApp} from 'reactfire';
import 'firebase/auth';
import '../../firebase/firebase';
import {Link} from 'react-router-dom'
import {makeStyles, Button, Box,TextField, Container } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyle = makeStyles(theme =>({
    container:{
        marginTop: '120px',
        background: '#E8EEF4',
        width:'50%',
        marginBottom: '120px',
        fontFamily: 'Roboto',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '33px',
        '@media (max-width : 1230px)':{
            width: '70%'
        },
        '@media (max-width : 970px)':{
            width: '80%'
        },
        '@media (max-width : 600px)':{
            width: '100%'
        },
    },
    text:{
        color: '#159DE9'
    },
    containerForm:{
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        '@media (max-width : 1230px)':{
            width: '80%'
        },
        '@media (max-width : 700px)':{
            width: '90%'
        },
        '@media (max-width : 500px)':{
            width: '100%'
        },
    },
    form:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    btnBox:{
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width : 970px)':{
            width: '100%'
        },
        '@media (max-width : 360px)':{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
    },
    btn:{
    },
    span:{
        margin: '5px'
    },
    input:{
        color: '#159DE9',
        width: '100%'
    },
    textfield:{
        width: '100%'
    },
    error:{
        color: 'white',
        padding: '10px',
        marginBottom: '10px',
        textAlign:'center',
        borderRadius: '5px',
        backgroundColor: 'rgb(230, 81, 81)',
    },
    confirmation:{
        marginTop: '90px',
        background: '#4caf50',
        width:'40%',
        marginBottom: '67px',
        fontFamily: 'Roboto',
        borderRadius: '10px',
        display: 'flex',
        paddingBottom: '20px',
        paddingTop: '20px',
        '@media (max-width : 1280px)':{
            width: '50%'
        },
        '@media (max-width : 800px)':{
            width: '70%'
        },
        '@media (max-width : 600px)':{
            width: '80%'
        },
        '@media (max-width : 500px)':{
            width: '100%'
        },
    },
    icon:{
        width: '10%',
        height: '10%',
        padding: '10px',
        '@media (max-width : 400px)':{
            width: '20%'
        },
    },
    alert:{
        width: '90%',
    }
}))

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null);
    const [send, setSend] = useState(false);
    const firebase = useFirebaseApp();
    const styleClass = useStyle()
    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }
        
        setError(null)
        recuperar()

    }

    const recuperar = useCallback(async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(email)
            console.log('correo enviado')
            setSend(true)
            setEmail('')
            setTimeout(() => {
                setSend(false)
            }, 5000);
        } catch (error) {
            setError('No es un correo electrónico valido.')
        }
    }, [email])


    return !send ?(
        <Container className={styleClass.container}>
            <Box>
                <h3 className={styleClass.text}>
                    Cambiar Contraseña
                </h3>
            </Box>
            <Box className={styleClass.containerForm}>
                <form 
                    className={styleClass.form}
                    onSubmit={procesarDatos}>
                        {
                            error ? (
                                <Box className={styleClass.error}>
                                    {error}
                                </Box>
                            ) : null
                        }
                        <TextField
                                className={styleClass.textfield}
                                type="email"
                                label="Correo electrónico"
                                variant="outlined"
                                color="secondary"
                                name= "password"
                                InputProps={{
                                    className: styleClass.input
                                }}
                                onChange={ e => setEmail(e.target.value)}
                                value={email}
                            />
                        <Box 
                            className={styleClass.btnBox}
                            p={1}>
                            <Button 
                                type="submit" 
                                variant="contained"
                                color="secondary"
                                size="small"
                                className={styleClass.btn}>
                                Restablecer Contraseña
                            </Button>
                            <Box mt={1}>
                                <span className={styleClass.span}>o</span>
                                <Link to='/login'> Iniciar sesión </Link>
                            </Box>
                        </Box>
                </form>
            </Box>
        </Container>
    ):
    (
        <Container className={styleClass.confirmation}>
            <CheckCircleIcon className={styleClass.icon}/>
            <Box className={styleClass.alert}>
                <b>¿Has olvidado la contraseña?</b>
                <p>
                    Pronto recibirás un correo electrónico para restablecer tu contraseña. Revisa la carpeta de spam y la papelera si no encuentras el correo electrónico.
                </p>            
            </Box>
        </Container>

    )
}

export default ResetPassword

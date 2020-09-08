import { makeStyles } from '@material-ui/core/styles';
const estilos = makeStyles((theme) => ({

    perfil: {
        margin: "auto",
    },
    root: {
        maxWidth: 500,
    },
    media: {
        height: 140,
    },

    boton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
        margin: 'auto',
    },
    nya: {
        display: 'flex',
        marginTop: '10px'
    },
    dir: {
        display: 'flex',
        marginTop: '10px'
    },
    email: {
        display: 'flex',

    },
}));

export default estilos;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import "./DetalleProducto.css";
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { addReview } from '../store/actions/reviews'
import swal from 'sweetalert';


const useStyles = makeStyles((theme) => ({
    extendedIcon: {
        marginLeft: theme.spacing(85),
    },
}));

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

function Review(props) {
    const { user } = props;
    const [producto, setProducto] = useState({});
    const { idP } = useParams();
    const classes = useStyles();
    const [rating, setRating] = useState(0);  

    const handleRating = (event) => {
        setRating(event.target.value);
    };

    const [input, setInput] = useState({
        description: "",
        qualification: ""
    });
    const [Comments, setComments] = useState([]);

    const inputB = {
        description: "",
        qualification: ""
    };
    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const submitReview = function (e) {
        e.preventDefault();
        if (
            !input.description ||
            !rating
        ) {
            swal("Henry Beers!", "...Debes completar ambos campos!");
        }

        if (user.setUser.id !== null) {
            axios.post(`http://localhost:4000/products/${user.setUser.id}/review`, {
                description: input.description,
                qualification: rating,
                productId: idP,
            }, { withCredentials: true })
                .then(res => {
                    props.addReview(res.data)
                }).catch((err) => {
                    alert(err);
                });
            setInput(inputB);
        }
    };

    return (
        <div id="container2">
            <form onSubmit={submitReview}>
                <Box textAlign="justify" fontWeight="fontWeightBold" fontStyle="oblique" component="fieldset" mb={3} borderColor="transparent">
                    <Typography gutterBottom variant="h6" component="legend">Dejanos tu calificacion..</Typography>
                    <Rating name="half-rating-read" precision={0.5} value={rating} onChange={handleRating} />                    
                    <TextField
                        name="description"
                        type="text"
                        id="standard-full-width"
                        label="Comentario"
                        style={{ margin: 8 }}
                        value={input.description}
                        placeholder="Dejanos tu Opinion..."
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                    />
                    {(user.setUser &&
                        <Button className={classes.extendedIcon} size="small" variant="contained" color="primary" type="submit" >
                            Enviar
                    </Button>
                    )}
                    {(!user.setUser &&
                        <Link to="/ingresar">
                            <Button className={classes.extendedIcon} size="small" variant="contained" color="primary" type="submit" >
                                Enviar
                    </Button>
                        </Link>
                    )}
                </Box>
            </form>
        </div>
    );
}
const mapStateToProps = ({ user, reviews }) => ({
    user,
    reviews
})

const mapDispatchToProps = dispatch => ({
    addReview: review => dispatch(addReview(review)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Review)


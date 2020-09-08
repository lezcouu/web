import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import "./Home.css";


function Home(props) {

    console.log('HOLAAAAA', props)
    var items = [
        {
            name: "Bienvenido a Henry Beers!",
            description: "",
            picture: 'https://www.mundocerveza.com/wp-content/uploads/2020/03/Desa-4.jpg',
            redireccion: '/products'
        },
        {
            name: "Conoce nuestras birras!!",
            description: "",
            picture: 'https://www.65ymas.com/uploads/s1/15/84/8/bigstock-glasses-of-beer-and-ale-barrel-206288896.jpeg',
            redireccion: '/products'
        }
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <div class="doc">

            <Paper>
                <div className='color'>
                    <h2>{props.item.name}</h2>
                    <p>{props.item.description}</p>
                </div>
                <Link style={{ textDecoration: 'none' }} to={props.item.redireccion}>
                    <div class="box">
                        < img className="Bienvenido" src={props.item.picture} alt="" />
                    </div>
                </Link>
            </Paper >

        </div>
    )
}






const mapStateToProps = ({ producto }) => ({
    producto
})

export default connect(mapStateToProps, null)(Home)
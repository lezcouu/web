import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import './Catalogo.css'
import { Typography } from "@material-ui/core";

// S13 : Crear Componente Catalogo
export default function Catalogo({ beers, categoriesSelected, handleCompra }) {
  const [items, setItems] = useState([]);

  // Temporizador para el gif de cargando
  startCount()
  var t;
  var timer_is_on = 0;

  function timedCount() {
    t = setTimeout(timedCount, 1000);
  }
  function startCount() {
    if (!timer_is_on) {
      timer_is_on = 1;
      timedCount();
    }
  }
  function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
  }
  if (t > 300) { stopCount() } // Para que no siga corriendo hasta el infinito
  // Fin de las funciones del temporizador

  useEffect(() => {
    filtrarPorCategoria();
  }, [categoriesSelected, beers])

  // S12 : Agregar funcionalidad de filtrado por categoría al componente Catálogo
  const filtrarPorCategoria = () => {
    if (!categoriesSelected.length) {
      setItems(beers); // Si no hay ninguna categoria seleccionada, setea el estado inicial
    } else { // Si hay categorias seleccionadas, filtra aquellas cervezas que coincida con el id de categoria
      let newItems = [];
      categoriesSelected.forEach(categoryId => {
        const itemsSelectedByCategory = beers.filter(b => b.categories.some(c => c.id == categoryId));
        newItems = [...newItems, ...itemsSelectedByCategory];
      });
      setItems([...new Set(newItems)]);
    }
  }

  if (items.length != 0) {
    return (
      <div className='cards'>
        {items.map((beer) => (
          <ProductCard name={beer.name} image={beer.picture} price={beer.price} ml={beer.description} id={beer.id} stock={beer.stock} avg={beer.avg} handleCompra={handleCompra} />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      (t < 15) ? // ESTE ES EL TIEMPO EN QUE SE MUESTRAN LAS CERVEZAS CARGANDO
        (<div className='cards'>
          <img src='https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-030f7b87ee31.gif' />
        </div >) : ((<div className='cards'>
          <Typography variant="h4"></Typography>
        </div >))
    )

  }
}
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Catalogo from './Catalogo';
import Categorias from './Categorias';
import axios from 'axios';
import './Content.css';
import { connect } from 'react-redux'
import { isFetching, isntFetching } from '../store/actions/fetching'

function Content(props) {
  const [initial, setInitialItems] = useState([]);
  const [items, setItems] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/products', { withCredentials: true })
      .then(res => {
        const review = res.data;
        const singleReview = review.map(e => {
          const total = e.reviews.reduce((t, r) => t + r.qualification, 0);
          const avg = e.reviews.length ? total / e.reviews.length : 0;
          return {
            ...e,
            avg
          }
        })

        setInitialItems(res.data)
        setItems(singleReview)
      });
  }, [],
  );


  const handleToggle = (e, value) => {
    e.preventDefault()
    const currentIndex = categoriesSelected.indexOf(value.id);
    if (currentIndex === -1) {
      setCategoriesSelected([...categoriesSelected, value.id])
    } else {
      const oldCategories = [...categoriesSelected];
      oldCategories.splice(currentIndex, 1);
      setCategoriesSelected(oldCategories)
    }
  };



  const onSearch = (text) => {
    props.isFetching()
    if (text) {
      const itemsFound = items.filter(item => item.name.toLowerCase().includes(text.toLowerCase()) || item.description.toLowerCase().includes(text.toLowerCase()));
      setItems(itemsFound);
    } else {
      setItems(initial);
    }
    props.isntFetching()
  };
  return (
    <div className="content">
      <SearchBar onSearch={onSearch} />
      <div className='contenido'>
        <Categorias contenido={props.contenido} handleToggle={handleToggle} checked={categoriesSelected} />
        {/* S14 : Crear Ruta para mostrar el componente Catalogo */}
        <Catalogo beers={items} categoriesSelected={categoriesSelected} handleCompra={props.handleCompra} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ fetching }) => ({
  fetching
})

const mapDispatchToProps = dispatch => ({
  isFetching: () => dispatch(isFetching()),
  isntFetching: () => dispatch(isntFetching()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)
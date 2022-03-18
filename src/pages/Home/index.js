import React, { useEffect, useState } from 'react'
import FilterPanel from '../../components/Home/FilterPanel'
import SearchBar from '../../components/Home/SearchBar'
import List from '../../components/Home/List'
import './styles.css'
import { dataList } from '../../constants'
import EmptyView from '../../components/Common/EmptyView'

function Home() {
  const  [selectedCategory, setSelectedCategory] = useState(null);
  const  [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSlectedPrice] = useState([1000,5000]);
  const [list, setList] = useState(dataList);
  const [inputSearch, setInputSearch] = useState('');
  const [resultFound, setResultFound] = useState(false);
  const  [cusines, setCusines] = useState([
    {
      id:1,
      checked: false,
      label: "American"
    },
    {
      id:2,
      checked: false,
      label: "Chinese"
    },
    {
      id:3,
      checked: false,
      label: "Italian"
    },
  ]);

  const handleselectedToggle=(event, value) => !value?null:setSelectedCategory(value);
  
  const handleSelectedRating=(event, value) => !value?null:setSelectedRating(value);
  
  const handleChangeChecked = (id) => {
    const cuisinesStateList = cusines;
    const chandeCheckedCuisines = cuisinesStateList.map(item=>item.id === id ? {...item, checked: !item.checked} : item);
    setCusines(chandeCheckedCuisines);
  }

  const handleChangedPrice = (event, value) => setSlectedPrice(value)

  const applyFilters = () => {
    let updatedList = dataList;

    //Rating Filter
    if(selectedRating) {
      updatedList=updatedList.filter(item=>parseInt(item.rating)===parseInt(selectedRating))
    }

    //Category filter
    if(selectedCategory) {
      updatedList = updatedList.filter(item=>item.category===selectedCategory)
    }

    //Cusine Filter
    const cuisineChecked = cusines.filter(item=>item.checked).map((item) => item.label.toLowerCase())
    if(cuisineChecked.length) {
      updatedList = updatedList.filter((item) => cuisineChecked.includes(item.cuisine));
    }

    //Price Filter
    const minPrice=selectedPrice[0];
    const maxPrice = selectedPrice[1];
    updatedList = updatedList.filter(item => item.price>=minPrice && item.price<=maxPrice)

    //Search Filter
    if(inputSearch) {
      updatedList = updatedList.filter((item)=>item.title.toLowerCase().search(inputSearch.toLowerCase().trim())!==-1)
    }

    setList(updatedList);

    !updatedList.length ? setResultFound(false) : setResultFound(true);
  }

  useEffect(() => {
    applyFilters();
  },[selectedRating, selectedCategory, cusines, selectedPrice, inputSearch])

  return (
    <div className='home'>
      {/* Search Bar */}
      <SearchBar value={inputSearch} changeInput={e=>setInputSearch(e.target.value)} />

      <div className='home-panelList-wrap'>
        <div className='home-panel-wrap'>
          {/* Side Panels */}
          <FilterPanel selectedCategory={selectedCategory} selectToggle={handleselectedToggle} selectRating={handleSelectedRating} selectedRating={selectedRating} cusines={cusines} changeChecked={handleChangeChecked} selectedPrice={selectedPrice} changedPrice={handleChangedPrice} />
        </div>
        <div className='home-list-wrap'>
          {/* List and Empty View */}
          {resultFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  )
}

export default Home
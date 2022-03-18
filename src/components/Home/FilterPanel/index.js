import React from 'react'
import { categoryList, ratingList } from '../../../constants'
import FilterListToggle from '../../Common/FilterListToggle'
import "./styles.css"
import CheckBoxProton from '../../Common/CheckboxProton'
import SliderProton from '../../Common/SliderProton'

function FilterPanel({selectedCategory, selectToggle, selectRating, selectedRating, cusines, changeChecked, selectedPrice, changedPrice}) {
  return (
    <div>
      {/* Category */}
      <div className='input-group'>
        <p className='label'>Category</p>
        <FilterListToggle options={categoryList} value={selectedCategory} selectToggle={selectToggle} />
      </div>

      {/* Cusines */}
      <div className='input-group'>
        <p className='label'>Cusines</p>
        {cusines.map(cusines => <CheckBoxProton key={cusines.id} cuisine={cusines} changeChecked={changeChecked} /> )}
      </div>

      {/* Price Range */}
      <div className='input-group'>
        <p className='label-range'>Prize Rate</p>
        <SliderProton value={selectedPrice} changedPrice={changedPrice} />
      </div>

      {/* Star Rating */}
      <div className='input-group'>
        <p className='label'>star Rating</p>
        <FilterListToggle options={ratingList} value={selectedRating} selectToggle={selectRating} />
      </div>
    </div>
  )
}

export default FilterPanel
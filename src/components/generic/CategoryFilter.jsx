import "./CategoryFilter.scss"
import React, {useEffect, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function CategoryFilter({ categories, selectedCategoryId, setSelectedCategoryId, className = "" }) {
    let minButtonWidthPercentage = categories && categories.length ?
        Math.floor(100 / categories.length)
        : 0

    const hasCategoryWithLongLabel = categories.find(category => category.label && category.label.length >= 8)
    if(hasCategoryWithLongLabel)
        minButtonWidthPercentage *= 0.9

    return (
        <div className={`category-filter btn-group ${className}`}
             role={"group"}>
            {categories.map((category, key) => (
                <CategoryFilterButton key={key}
                                      category={category}
                                      minButtonWidthPercentage={minButtonWidthPercentage}
                                      onClick={() => setSelectedCategoryId(category.id)}
                                      isSelected={category?.id === selectedCategoryId}/>
            ))}
        </div>
    )
}

function CategoryFilterButton({ category, minButtonWidthPercentage, isSelected, onClick }) {
    const language = useLanguage()

    const selectedClassName = isSelected ?
        `category-filter-button-selected` : ``

    const tooltip = language.getString("filter_by").replace("{x}", category.label)

    return (
        <button type={"button"}
                className={`category-filter-button ${selectedClassName} btn text-2`}
                style={{minWidth: `${minButtonWidthPercentage}%`}}
                onMouseDown={onClick}
                onTouchStart={onClick}
                data-tooltip={tooltip}>
            <span className={`category-filter-button-label`}>{category.label}</span>
            <span className={`category-filter-button-count`}>({category.count})</span>
        </button>
    )
}

export default CategoryFilter
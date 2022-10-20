import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

const _ = require('lodash');

const ButtonList = ({ componentName, items, navigateUrl, sortValues, sortOperation }) => {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const [sortValue, setSortValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const sortItems = (sortValue, sortOrder) => {
        if (sortValue === 'games') {
            return sortOperation(_.orderBy(items, [(publisher) => {
                return publisher.games.length
            }], [sortOrder]))
        }
        return sortOperation(_.orderBy(items, [sortValue], [sortOrder]))
    }

    useEffect(() => {
        if (sortValue !== '') {
            return sortItems(sortValue, sortOrder)
        }
    },[sortValue, sortOrder, sortItems])

    const handleSortOrderClick = (value) => {
        if (value === 'asc') {
            return setSortOrder('desc')
        }
        return setSortOrder('asc')
    }

    const handleAddClick = () => {
        navigate(`/${navigateUrl}/add`)
    }

    return (
        <div className='buttons d-flex justify-content-between'>
            <div className='d-flex gap-2 w-25 align-items-center'>
                <select value={sortValue} onChange={(values) => setSortValue(values.target.value)} className='form-select'>
                    <option value=''>Choose Sort Value</option>
                    {sortValues && sortValues.map(value =>
                        <option value={value[0]}>{value[1]}</option>)}
                </select>
                {sortOrder === 'asc' ?
                    <svg onClick={() => handleSortOrderClick(sortOrder)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-chevron-up up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                    :
                    <svg onClick={() => handleSortOrderClick(sortOrder)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-chevron-up down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>}
            </div>
            {keycloak.authenticated ? <button className='btn btn-primary' onClick={handleAddClick}>Add {componentName}</button> : null}
        </div>
    )
}

export default ButtonList;
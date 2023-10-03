import {FilterInput, FilterLable} from './SearchFilter.styled'
import { FaSearch } from 'react-icons/fa';

export const Filter = ({value, onChange}) => {
    return <FilterLable>Find contacts by name<FilterInput type="text" value={value} onChange={onChange}/><FaSearch/></FilterLable>
}
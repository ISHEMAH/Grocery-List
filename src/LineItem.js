import { FaTrashAlt } from "react-icons/fa"

const LineItem = ({items,handleCheck,handleDelete}) => {
    return (
        <li className="item" key={items.id}>
            <input type="checkbox"
            onChange={() => handleCheck(items.id)}
            checked={items.checked}
            />
            <label
                onDoubleClick={() => handleCheck(items.id)}
                style={(items.checked ? { textDecoration: 'line-through'} : null)}
            >{items.item}</label>
            <FaTrashAlt
            onClick={() => handleDelete(items.id)} 
            role="button" 
            tabIndex="0"/>
        </li>
    )
}

export default LineItem
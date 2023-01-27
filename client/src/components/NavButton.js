import { NavLink } from 'react-router-dom';

function NavButton(props) {
    return (
        <NavLink to={props.href} id={props.id} onClick={props.handleClick}>{props.text}</NavLink>
    );
}

export default NavButton;
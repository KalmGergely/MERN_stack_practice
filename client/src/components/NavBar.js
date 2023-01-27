function NavBar(props) {
    return (
        <nav className={props.hasUser ? 'has-user' : ''}>
            {props.children}
        </nav>
    );
}

export default NavBar;
function DeleteButton(props) {
    return (
        <a data-id={props.id} onClick={props.handleClick} className={props.text} href='#0'>{props.text}</a>
    );
}

export default DeleteButton;
function Banner(props) {
    return (
        <div className="banner">
            <h2>{props.h2Text}</h2>
            <h5>r/space</h5>
            {props.children}
        </div>
    );
}

export default Banner;
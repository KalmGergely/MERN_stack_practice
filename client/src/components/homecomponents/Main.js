import About from "./About";
import Content from "./Content";

function Main(props) {
    return (
        <main>
            <Content user={props.user} />
            <About />
        </main>
    );
}

export default Main;
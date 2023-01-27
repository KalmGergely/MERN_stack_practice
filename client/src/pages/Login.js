import { useNavigate } from 'react-router-dom';
import '../styles/formPages.css';
import NavBar from '../components/NavBar';
import RedditLogo from '../components/RedditLogo';
import UserForm from '../components/formComponents/UserForm';

function Login() {
    const navigate = useNavigate();

    function loginUser(e) {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        fetch('http://localhost:8080/api/users/login', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(jsonData => {
                if (jsonData.message) {
                    alert(jsonData.message);
                } else {
                    localStorage.setItem('token', jsonData.token);
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <NavBar>
                <RedditLogo />
            </NavBar>
            <UserForm h1Text='Log In to your account' handleSubmit={loginUser} btnText='Log In' />
        </>
    );
}

export default Login;
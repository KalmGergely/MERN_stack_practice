import { useNavigate } from 'react-router-dom';
import '../styles/formPages.css';
import NavBar from '../components/NavBar';
import RedditLogo from '../components/RedditLogo';
import UserForm from '../components/formComponents/UserForm';

function Register() {
    const navigate = useNavigate();

    function registerUser(e) {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        fetch('http://localhost:8080/api/users/register', {

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
            <UserForm h1Text='CREATE AN ACCOUNT' handleSubmit={registerUser} btnText='Register' />
        </>
    );
}

export default Register;
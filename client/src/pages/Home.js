import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import NavBar from "../components/NavBar";
import RedditLogo from "../components/RedditLogo";
import NavButton from "../components/NavButton";
import Header from "../components/Header";
import Banner from '../components/Banner';
import Main from '../components/homecomponents/Main';
import Footer from '../components/Footer';

function Home() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/users/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.hasOwnProperty('token') ? localStorage.getItem('token') : ''}`
            }
        })
            .then(res => res.json())
            .then(jsonData => {
                if (jsonData.username) {
                    setUser(jsonData.username);
                };
            })
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setUser('');
        navigate('/');
    }

    if (user !== '') {
        return (
            <>
                <NavBar hasUser={true}>
                    <RedditLogo />
                    <h3 style={{ justifySelf: 'end' }}>{`Logged in as ${user}`}</h3>
                    <NavButton id='logout' href='/' text='Log Out' handleClick={logout} />
                </NavBar>
                <Header className='home-header' />
                <Banner h2Text='/r/space: news, articles and discussion'>
                    <NavButton id='newpost' href='/newpost' text='Submit a new post' />
                    <p>Posts</p>
                </Banner>
                <Main user={user} />
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <NavBar>
                    <RedditLogo />
                    <NavButton id='register' href='/register' text='Register' />
                    <NavButton id='login' href='/login' text='Log In' />
                </NavBar>
                <Header className='home-header' />
                <Banner h2Text='/r/space: news, articles and discussion'>
                    <p>Posts</p>
                </Banner>
                <Main />
                <Footer />
            </>
        );
    }
}

export default Home;
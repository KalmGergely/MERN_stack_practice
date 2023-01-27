import { useNavigate } from 'react-router-dom';
import '../styles/formPages.css';
import NavBar from "../components/NavBar";
import RedditLogo from "../components/RedditLogo";
import Header from "../components/Header";
import Banner from "../components/Banner";
import PostForm from "../components/formComponents/PostForm";

function NewPost() {
    const navigate = useNavigate();

    function createPost(e) {
        e.preventDefault();

        const data = {
            title: e.target.title.value,
            url: e.target.url.value
        }

        fetch('http://localhost:8080/api/posts/', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(jsonData => {
                if (jsonData.message) {
                    alert(jsonData.message);
                } else {
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
            <Header className='form-header' />
            <Banner h2Text='/r/space: Post submission'></Banner>
            <PostForm h1Text='Submit a new post' handleSubmit={createPost} />
        </>
    );
}

export default NewPost;
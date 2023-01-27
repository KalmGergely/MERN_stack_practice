import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import RedditLogo from "../components/RedditLogo";
import Header from "../components/Header";
import Banner from "../components/Banner";
import PostForm from "../components/formComponents/PostForm";

function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;

  function editPost(e) {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      url: e.target.url.value
    }

    fetch(`http://localhost:8080/api/posts/${id}`, {

      method: 'PUT',
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
      <Banner h2Text='/r/space: Post modification'></Banner>
      <PostForm h1Text='Edit your post' values={location.state} handleSubmit={editPost} />
    </>
  );
}

export default EditPost;
import { useState, useEffect } from 'react';
import PostContainer from "./PostContainer";
import Sort from "./Sort";
import Post from './Post';

function Content(props) {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState('new');

    useEffect(() => {
        fetch(`http://localhost:8080/api/posts/?sort=${sort}`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.log(err));
    }, [sort]);

    function toggleSort(e) {
        setSort(e.target.id);
    }

    function deletePost(e) {
        const id = e.target.getAttribute('data-id');

        fetch(`http://localhost:8080/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(jsonData => {
                if (jsonData.message) {
                    alert(jsonData.message);
                } else {
                    setPosts(posts.filter(post => post._id !== id));
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='content'>
            <Sort currentSort={sort} toggleSort={toggleSort} />
            <PostContainer>
                {posts.map((post) => {
                    return <Post key={post._id} owner={post.owner.username} user={props.user} id={post._id} title={post.title} url={post.url} score={post.score} timeStamp={post.timeStamp} deletePost={deletePost} />;
                })}
            </PostContainer>
        </div>
    );
}

export default Content;
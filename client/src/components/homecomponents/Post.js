import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import upvoteImg from '../../images/upvote.png';
import upvotedImg from '../../images/upvoted.png';
import downvoteImg from '../../images/downvote.png';
import downvotedImg from '../../images/downvoted.png';

function Post(props) {
    const [score, setScore] = useState(props.score);
    const [upvote, setUpvote] = useState(upvoteImg);
    const [downvote, setDownvote] = useState(downvoteImg);

    const timeStamp = props.timeStamp;
    let timeElapsed = (Date.now() - timeStamp) / 1000;
    let minutes = Math.round(timeElapsed / 60);
    let hours = Math.round(timeElapsed / (60 * 60));
    let days = Math.round(timeElapsed / (60 * 60 * 24));
    let timeSincePosted;
    if (minutes < 60) {
        timeSincePosted = `${minutes} minute(s)`;
    } else if (hours < 24) {
        timeSincePosted = `${hours} hour(s)`;
    } else if (hours >= 24) {
        timeSincePosted = `${days} day(s)`;
    }

    function upvotePost(e) {
        const id = e.target.getAttribute('data-id');

        fetch(`http://localhost:8080/api/posts/${id}/upvote`, {

        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(jsonData => {
          if (jsonData.message) {
            alert(jsonData.message);
          } else {
            setUpvote(upvotedImg);
            setScore(score + 1);
          }
        })
        .catch(err => console.log(err));
    } 

    function downotePost(e) {
        const id = e.target.getAttribute('data-id');

        fetch(`http://localhost:8080/api/posts/${id}/downvote`, {

        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(jsonData => {
          if (jsonData.message) {
            alert(jsonData.message);
          } else {
            setDownvote(downvotedImg);
            setScore(score - 1);
          }
        })
        .catch(err => console.log(err));
    }

    if (props.user === props.owner) {
        return (
            <div className='postDiv' data-id={props.id}>
                <div className='scoreDiv'>
                    <img data-id={props.id} src={upvote} onClick={upvotePost} alt='upvote' />
                    <h3 id={`score-${props.id}`}>{score}</h3>
                    <img data-id={props.id} src={downvote} onClick={downotePost} alt='downvote' />
                </div>
                <div className='infoDiv'>
                    <div className='first-container'>
                        <p id='postedBy'>Posted by {props.owner} {timeSincePosted} ago</p>
                        <Link to='/editpost' state={{ id: props.id, title: props.title, url: props.url }}>edit</Link>
                        <DeleteButton id={props.id} handleClick={props.deletePost} text='delete' />
                    </div>
                    <h3 id={`title-${props.id}`}>{props.title}</h3>
                    <a id={`url-${props.id}`} href={props.url} target='_blank' rel='noreferrer'>{`${props.url.slice(0, 25)}...`}</a>
                </div>
            </div>
        );
    } else {
        return (
            <div className='postDiv' data-id={props.id}>
                <div className='scoreDiv'>
                    <img data-id={props.id} src={upvote} onClick={upvotePost} alt='upvote' />
                    <h3 id={`score-${props.id}`}>{score}</h3>
                    <img data-id={props.id} src={downvote} onClick={downotePost} alt='downvote' />
                </div>
                <div className='infoDiv'>
                    <p id='postedBy'>Posted by {props.owner} {timeSincePosted} ago</p>
                    <h3 id={`title-${props.id}`}>{props.title}</h3>
                    <a id={`url-${props.id}`} href={props.url} target='_blank' rel='noreferrer'>{`${props.url.slice(0, 25)}...`}</a>
                </div>
            </div>
        );
    }
}

export default Post;
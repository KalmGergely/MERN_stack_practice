import { useState } from "react";

function PostForm(props) {
    const [title, setTitle] = useState(props.values ? props.values.title : '');
    const [url, setUrl] = useState(props.values ? props.values.url : '');

    function changeTitle(e) {
        setTitle(e.target.value);
    }

    function changeUrl(e) {
        setUrl(e.target.value)
    }

    return (
        <div className='post-form-container'>
            <h1>{props.h1Text}</h1>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' id='title' minLength='1' value={title} onChange={changeTitle} required />
                <label htmlFor='url'>URL</label>
                <input type='url' name='url' id='url' minLength='3' value={url} onChange={changeUrl} required />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default PostForm;
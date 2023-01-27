function UserForm(props) {
    return (
        <div className='user-form-container'>
            <h1>{props.h1Text}</h1>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor='username'>USERNAME</label>
                <input type='text' name='username' id='username' minLength='1' required />
                <label htmlFor='password'>PASSWORD</label>
                <input type='password' name='password' id='password' minLength='3' required />
                <button type='submit'>{props.btnText}</button>
            </form>
        </div>
    );
}

export default UserForm;
function Sort(props) {
  return (
    <div className='sort'>
      Sort by:
      <button id='new' className={props.currentSort === 'new' ? 'highlighted' : ''} onClick={props.toggleSort}>New</button>
      <button id='top' className={props.currentSort === 'top' ? 'highlighted' : ''} onClick={props.toggleSort}>Top</button>
    </div>
  );
}

export default Sort;
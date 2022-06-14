import classes from './delete-confirm.module.css'

export default function DeleteConfirm(props) {
  return (
    <div className={classes.dialog}>
      <h2>Sure?</h2>
      <div>
        <button onClick={props.onDelete}>Delete</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

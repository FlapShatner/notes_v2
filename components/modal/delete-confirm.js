import classes from './delete-confirm.module.css'

export default function DeleteConfirm(props) {
  return (
    <div className={classes.dialog}>
      <h2>Sure?</h2>
      <div className={classes.actions}>
        <button className={classes.del} onClick={props.onDelete}>
          Delete
        </button>
        <button className={classes.cancel} onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

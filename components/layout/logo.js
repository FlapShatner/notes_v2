import classes from './logo.module.css'

export default function Logo() {
  const logoText = 'Note Books'

  return <div className={classes.logo}>{logoText}</div>
}

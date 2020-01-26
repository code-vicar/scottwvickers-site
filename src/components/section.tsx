import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const Section: React.FC<{}> = ({ children }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
    >
      {children}
    </div>
  )
}

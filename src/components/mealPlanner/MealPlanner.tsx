import React from 'react'
import { createStyles, Typography, Grid, makeStyles } from '@material-ui/core'
import { AddMenuItem, Menu, MenuItems } from '../menu'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '10px'
    }
  })
)

export const MealPlanner: React.FC = () => {
  const styles = useStyles()
  return (
    <Grid className={styles.root} container direction="row">
      <Grid item container xs component="section" direction="column">
        <Typography component="header">Menu Items</Typography>
        <Menu>
          <MenuItems />
          <AddMenuItem />
        </Menu>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  )
}

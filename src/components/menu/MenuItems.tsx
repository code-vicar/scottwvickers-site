import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import { MenuContextType } from '../../contexts/menu'
import { MenuItem } from './MenuItem'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxHeight: '400px',
      overflow: 'auto'
    }
  })
)

export const MenuItems: React.FC = () => {
  const menuContext = React.useContext(MenuContextType)
  const styles = useStyles()
  return (
    <dl className={styles.root}>
      {menuContext.items.map(item => (
        <MenuItem
          key={item.name}
          name={item.name}
          description={item.description}
        />
      ))}
    </dl>
  )
}

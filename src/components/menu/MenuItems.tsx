import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import { MenuContextType } from '../../contexts/menu'
import { MenuItem } from './MenuItem'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '20px 0 0 0',
      maxHeight: '400px',
      overflow: 'auto'
    }
  })
)

export interface IMenuItemsProps {
  className?: string
}

export const MenuItems: React.FC<IMenuItemsProps> = ({ className }) => {
  const menuContext = React.useContext(MenuContextType)
  const styles = useStyles()
  const combinedClassName = React.useMemo(() => {
    const classNames = [styles.root]
    if (className) {
      classNames.push(className)
    }
    return classNames.join(' ')
  }, [styles.root, className])
  return (
    <dl className={combinedClassName}>
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

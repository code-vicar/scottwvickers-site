import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { Menu, Popover } from 'mineral-ui'
import { ThemedPrimaryNav } from '../../themed/PrimaryNav'

export interface INavItem {
  title: string;
  url: string;
}

interface Props {
  navItems: INavItem[]
  onRenderMenuItem: (navItem: INavItem, setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>) => JSX.Element
  onRenderNavItem: (navItem: INavItem) => JSX.Element
}

export const BaseNav: React.FC<Props> = ({ navItems, onRenderMenuItem, onRenderNavItem }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    function outsideElementClick(e?: MouseEvent) {
      if (!e || !e.target || !(e.target as Element).closest) {
        return
      }
      if (!(e.target as Element).closest('#mainNavPopover')) {
        setPopoverOpen(false)
      }
    }
    document.addEventListener('click', outsideElementClick)
    return () => {
      document.removeEventListener('click', outsideElementClick)
    }
  }, [])

  return (
    <>
      <Popover
        id="mainNavPopover"
        css={{
          '@media (min-width: 768px)': {
            display: 'none',
            visibility: 'hidden'
          }
        }}
        isOpen={popoverOpen}
        placement="left"
        setPopoverOpen={setPopoverOpen}
        content={
          <Menu>
            {navItems.map(navItem => onRenderMenuItem(navItem, setPopoverOpen))}
          </Menu>
        }
      >
        <div
          style={{
            padding: '20px',
            margin: '-20px'
          }}
          onClick={() => {
            setPopoverOpen(true)
          }}
        >
          <FaBars
            style={{
              verticalAlign: 'middle'
            }}
          />
        </div>
      </Popover>
      <ThemedPrimaryNav
        minimal
        css={{
          '@media (max-width: 768px)': {
            display: 'none',
            visibility: 'hidden'
          }
        }}
      >
        {navItems.map(navItem => onRenderNavItem(navItem))}
      </ThemedPrimaryNav>
    </>
  )
}

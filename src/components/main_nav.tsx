import React, { useState, useEffect } from 'react'
import { Menu, MenuItem, NavItem, Popover } from 'mineral-ui'
import { ThemedPrimaryNav } from '../themed/PrimaryNav'
import { FaBars } from 'react-icons/fa'

const navData = [
  {
    title: 'About',
    url: '#about'
  },
  {
    title: 'Notes',
    url: '#notes'
  },
  {
    title: 'Contact',
    url: '#contact'
  }
]

const getMenuItems = ({ setPopoverOpen }: {
  setPopoverOpen: (value: React.SetStateAction<boolean>) => void;
}) => (
    navData.map(({ title, url }) => (
      <MenuItem
        key={title}
        as="a"
        href={url}
        onClick={() => { setPopoverOpen(false) }}
      >
        {title}
      </MenuItem>
    ))
  )

const getNavItems = () => (
  navData.map(({ title, url }) => (
    <NavItem
      key={title}
      as={"a"}
      href={`/${url}`}
    >
      {title}
    </NavItem>
  ))
)

export const MainNav: React.FC<{}> = () => {
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
            {getMenuItems({ setPopoverOpen })}
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
        {getNavItems()}
      </ThemedPrimaryNav>
    </>
  )
}

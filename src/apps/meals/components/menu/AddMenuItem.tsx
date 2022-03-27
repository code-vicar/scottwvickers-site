import React from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import {
  createStyles,
  makeStyles
} from "@mui/styles"
import { MenuContextType } from "../../../../contexts/menu"

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      margin: 0
    }
  })
)

export interface IAddMenuItemProps {
  className?: string
}

export const AddMenuItem: React.FC<IAddMenuItemProps> = ({ className }) => {
  const styles = useStyles()
  const menuContext = React.useContext(MenuContextType)
  const [editMode, setEditMode] = React.useState<boolean>(false)

  const nameDefaultHelperText = "What do you call this menu item?"
  const [nameField, setName] = React.useState<{
    value: string
    error: boolean
    helperText: string | undefined
  }>({
    value: "",
    error: false,
    helperText: nameDefaultHelperText
  })

  const descriptionDefaultHelperText = undefined
  const [descriptionField, setDescription] = React.useState<{
    value: string
    error: boolean
    helperText: string | undefined
  }>({ value: "", error: false, helperText: descriptionDefaultHelperText })

  const onNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName({
        value: event.target.value,
        error: false,
        helperText: nameDefaultHelperText
      })
    },
    [setName]
  )
  const onDescriptionChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription({
        value: event.target.value,
        error: false,
        helperText: descriptionDefaultHelperText
      })
    },
    [setDescription]
  )

  const startEdit = React.useCallback(() => {
    setEditMode(true)
  }, [setEditMode])

  const exitEdit = React.useCallback(() => {
    setName({
      value: "",
      error: false,
      helperText: nameDefaultHelperText
    })
    setDescription({
      value: "",
      error: false,
      helperText: descriptionDefaultHelperText
    })
    setEditMode(false)
  }, [setName, setDescription, setEditMode])

  const submitForm = React.useCallback(() => {
    if (!nameField.value) {
      setName({
        value: nameField.value,
        error: true,
        helperText: "You must provide a name"
      })
      return
    } else if (menuContext.items.some(item => item.name === nameField.value)) {
      setName({
        value: nameField.value,
        error: true,
        helperText: "A menu item with that name already exists"
      })
      return
    }
    menuContext.addItem({
      name: nameField.value,
      description: descriptionField.value
    })
    exitEdit()
  }, [menuContext, nameField, descriptionField, setName, setEditMode])

  if (!editMode) {
    return (
      <Button
        className={className}
        variant="contained"
        color="primary"
        onClick={startEdit}
      >
        Add new menu item
      </Button>
    )
  }

  return (
    <Grid
      className={`${className || ""} ${styles.form}`}
      container
      component="form"
      direction="column"
      spacing={3}
      onSubmit={submitForm}
    >
      <Grid
        item
        component={TextField}
        required
        id="menu-item-name"
        label="Name"
        error={nameField.error}
        value={nameField.value}
        helperText={nameField.helperText}
        onChange={onNameChange}
      />
      <Grid
        item
        component={TextField}
        id="menu-item-Description"
        label="Description"
        multiline
        maxRows={3}
        error={descriptionField.error}
        value={descriptionField.value}
        helperText={descriptionField.helperText}
        onChange={onDescriptionChange}
      />
      <Grid container item direction="row" spacing={3}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={submitForm}>
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={exitEdit}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

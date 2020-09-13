import React from "react"
import { createStyles, Typography, makeStyles } from "@material-ui/core"
import { AuthButton } from "../auth"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex"
    },
    left: {
      flex: "1 1 auto"
    },
    right: {
      flex: "1 1 auto",
      maxWidth: "max-content"
    }
  })
)

export const MenuHeader: React.FC<{ className?: string }> = ({ className }) => {
  const styles = useStyles()
  const rootClassName = React.useMemo(() => {
    const classNames = [styles.root]
    if (className) {
      classNames.push(className)
    }
    return classNames.join(" ")
  }, [className])
  return (
    <div className={rootClassName}>
      <div className={styles.left}>
        <Typography component="h2">Menu Items</Typography>
      </div>
      <div className={styles.right}>
        <AuthButton />
      </div>
    </div>
  )
}

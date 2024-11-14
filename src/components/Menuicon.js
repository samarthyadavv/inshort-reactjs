import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Button, List, ListItem, ListItemText, useMediaQuery } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import categories from "../data/categories";  // Ensure categories data is properly defined

// Styles for the drawer
const useStyles = makeStyles({
  list: {
    width: 250, // Increased width for better view of categories
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer({ setcategory }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // Drawer state

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Dynamically set theme based on user preference
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  // Toggle drawer open and close
  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  // List of categories to display in the drawer
  const renderCategoryList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)} // Close drawer on item click
      onKeyDown={toggleDrawer(false)}
    >
      <p style={{ fontSize: "16px", fontWeight: "bold" }}>Categories</p>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={() => setcategory(category)} // Update category state
            style={{
              textTransform: "capitalize",
              height: "40px",
              borderRadius: 5,
            }}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>

      <ThemeProvider theme={theme}>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)} // Close the drawer when clicking outside
        >
          {renderCategoryList()}
        </Drawer>
      </ThemeProvider>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  ClickAwayListener,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifications from "../Notification/Notifications";

const ToolBar = () => {
  const location = useLocation();
  const { notifications, setNotifications, unreadCount, setUnreadCount, getNotifications, loading, error } =
    useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  // معالجة الإشعار الجديد
  const handleNewNotification = (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]); // إضافة الإشعار الجديد
    setUnreadCount((prev) => prev + 1); // زيادة عدد الإشعارات غير المقروءة
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  
    if (!anchorEl) {
      getNotifications(); // جلب الإشعارات وتعيينها كـ "تم قراءتها"
    }
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notifications-popper" : undefined;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f6f9", borderRadius: "8px" }}>
     
      {location.pathname === "/dashboard" && (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Button variant="contained" color="primary" sx={{ width: 150 }}>
              Upload Files
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" sx={{ width: 150 }}>
              Create Group
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant="outlined"
              fullWidth
              label="Search..."
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "5px" } }}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleNotificationClick}
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer" }}
              aria-describedby={id}
            >
              <NotificationsIcon />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </Button>
          </Grid>
        </Grid>
      )}

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper style={{ width: "300px", maxHeight: "400px", overflowY: "auto" }}>
            <List>
              {loading ? (
                <ListItem>
                  <CircularProgress size={24} />
                </ListItem>
              ) : error ? (
                <ListItem>
                  <ListItemText primary="Failed to load notifications" secondary={error} />
                </ListItem>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <ListItem key={notification.id} divider>
                    <ListItemText
                      primary={notification.message}
                      secondary={new Date(notification.time).toLocaleString()}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No new notifications" />
                </ListItem>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default ToolBar;

import React, { useEffect } from "react";
import EchoClient from "./EchoClient";

const Notifications = ({ userId, onNewNotification }) => {
  useEffect(() => {
    if (!userId) return;

    const channelName = `private-user-${userId}`;
    const channel = EchoClient.private(channelName);

    channel.listen(".UserInvitationEvent", (data) => {
      console.log("New event received:", data); 
      console.log("Group data:", data.group);

      if (!data.group || !data.group.id || !data.group.name) {
        console.error("Invalid event data: Missing group details", data);
        return;
      }

      const groupId = data.group.id; 
      const groupName = data.group.name; 

      const newNotification = {
        id: groupId,
        message: `You have been invited to join the group: ${groupName}`,
        time: new Date().toISOString(),
        read: false,
      };

      console.log("New notification object:", newNotification); 

      onNewNotification(newNotification);
    });

    return () => {
      if (channel.stopListening) {
        channel.stopListening(".UserInvitationEvent");
      }
      EchoClient.leaveChannel(channelName);
    };
  }, [userId, onNewNotification]);

  return null;
};



export default Notifications;

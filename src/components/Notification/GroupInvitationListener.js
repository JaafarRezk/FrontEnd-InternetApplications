import React, { useEffect } from "react";
import pusherClient from "./pusherClient";

const GroupInvitationListener = ({ userId, onNewNotification }) => {
  useEffect(() => {
    if (!userId) {
      console.error("User ID is not defined");
      return;
    }

    // الاشتراك في القناة
    const channelName = `private-user-${userId}`;
    const channel = pusherClient.subscribe(channelName);

    console.log(`Subscribed to channel: ${channelName}`);

    // الاستماع إلى الأحداث
    channel.bind("UserInvitationEvent", (data) => {
      console.log("New invitation received:", data);

      if (data && data.group) {
        const notification = {
          message: `You have been invited to join the group: ${data.group.name}`,
          time: new Date().toLocaleTimeString(),
        };

        // إرسال الإشعار إلى المكون الأب
        if (typeof onNewNotification === "function") {
          onNewNotification(notification);
        }
      } else {
        console.error("Invalid event data received:", data);
      }
    });

    // تنظيف الاشتراك عند إلغاء المكون
    return () => {
      console.log(`Unsubscribing from channel: ${channelName}`);
      channel.unbind("UserInvitationEvent");
      pusherClient.unsubscribe(channelName);
    };
  }, [userId, onNewNotification]);

  return null; // لا يوجد محتوى مرئي
};

export default GroupInvitationListener;

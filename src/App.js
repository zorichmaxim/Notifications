import React, { useRef, useState } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import "react-notifications/lib/notifications.css";
import OnlineStatusMock from "./OnlineStatusMock";
import "./App.css";

function App() {
  /* State for notifications */
  const [state, setState] = useState({
    showOnlineNotification: true, // for notifications
    isOnline: false // for indicator
  });

  const offlineNotificationIdRef = useRef(null);

  function handleOnlineChange(nextValue) {
    if (state.isOnline === nextValue) {
      return;
    }

    if (nextValue) {
      clearTimeout(offlineNotificationIdRef.current);
      if (state.showOnlineNotification) {
        NotificationManager.info("online");
      }
      setState({ showOnlineNotification: false, isOnline: true });
    } else {
      setState((state) => ({ ...state, isOnline: false }));

      offlineNotificationIdRef.current = setTimeout(() => {
        NotificationManager.info("offline");
        setState((state) => ({ ...state, showOnlineNotification: true }));
      }, 2000);
    }
  }

  return (
    <>
      <OnlineStatusMock onIsOnlineChange={handleOnlineChange} />
      <div className={state.isOnline ? "online" : "offline"}>
        {state.isOnline ? "Online" : "Offline"}
        <NotificationContainer />
      </div>
    </>
  );
}

export default App;

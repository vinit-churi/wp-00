import React, { useState, useEffect } from "react";
import LeftMenu from "../components/LeftMenu";
import ChatDetail from "../components/ChatDetail";
import LoadingScreen from "../components/LoadingScreen";
import useMyContext from "../context/useMyContext";
import { onAuthStateChange } from "../auth";
import SignInPage from "../components/SignInPage";
import { getUsers } from "../firestore";
function WhatsApp() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const timesRef = React.useRef(false);
  const { user, setUser, setContacts, contacts } = useMyContext();
  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [progress]);

  useEffect(() => {
    if (timesRef.current) return;
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });
    const unsubscribeUsers = getUsers((users) => {
      const otherUsers = users.filter((u) => u.uid !== user.uid);
      setContacts(otherUsers);
    });
    timesRef.current = true;
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
      if (typeof unsubscribeUsers === "function") {
        unsubscribeUsers();
      }
    };
  }, [setContacts, setUser, user]);

  useEffect(() => {
    console.log(contacts, "...................................");
  }, [contacts]);

  return (
    <>
      {loading ? (
        <LoadingScreen progress={progress} />
      ) : user === null ? (
        <SignInPage />
      ) : (
        <div className="w-screen h-screen overflow-hidden">
          <div className="flex justify-start whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
              <LeftMenu />
            </div>
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
              <ChatDetail />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WhatsApp;

import UAuth from "@uauth/js";
import React, { useEffect, useState } from "react";
import "./css/globals.css";
import "./css/main.css";
import Main from "./Main";
import { ethers } from "ethers";
import Dashboard from "./Dasboard";

const uauth = new UAuth({
  clientID: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_ClIENT_SECERET,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scope: "openid wallet",
});

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts) {
      setCurrentAccount(accounts[0]);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));

    user && setCurrentAccount(user.wallet_address);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    await uauth
      .loginWithPopup()
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));

    console.log(user);
    window.ethereum == undefined && (await metamaskLogin());
    user && setCurrentAccount(user.wallet_address);
    console.log(currentAccount);
  };

  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
    setCurrentAccount(undefined);
  };

  async function metamaskLogin() {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account);
    console.log(currentAccount);
  }

  if (error) {
    console.error(error);
    return <App />;
  }

  if (user || currentAccount) {
    return (
      <>
        <Dashboard
          currentAccount={currentAccount}
          user={user}
          handleLogout={handleLogout}
        />
      </>
    );
  }

  return (
    <>
      <Main metamaskLogin={metamaskLogin} handleLogin={handleLogin} />
    </>
  );
};

export default App;

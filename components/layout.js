import React, { useEffect } from 'react';
import Head from "next/dist/next-server/lib/head";
import firebase from 'firebase';

const Layout = ({ children }) => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAUFg4uLIWyQH-T6zADpbV4b37uaQ6qUnk",
        authDomain: "dailyfirebase-31c30.firebaseapp.com",
        databaseURL: "https://dailyfirebase-31c30.firebaseio.com",
        projectId: "dailyfirebase-31c30",
        storageBucket: "dailyfirebase-31c30.appspot.com",
        messagingSenderId: "1011209135757",
        appId: "1:1011209135757:web:261b1a8ac8029210c3a4c4"
      });
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
        <link href="/css/normalize.css" rel="stylesheet" />
        <link href="/css/blueprint-icons.css" rel="stylesheet" />
        <link href="/css/blueprint.css" rel="stylesheet" />
        <link href="/css/utils.css" rel="stylesheet" />
      </Head>

      {/*<Nav />*/}

      <div>
        {children}
      </div>

      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
    </div>
  )
};

export default Layout;

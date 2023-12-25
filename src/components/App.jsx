import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';


const google_provider = new GoogleAuthProvider();
const auth = getAuth();



function App() {

  const [notes, setNotes] = useState([]);
  const [curUser, setCurUser] = useState(auth.currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurUser(auth.currentUser);
    });

    const q = query(collection(db, 'KeeperDB'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let noteList = [];
      querySnapshot.forEach((doc) => {
        noteList.push({ ...doc.data(), id: doc.id });
      });
      setNotes(noteList);
    });
    return () => unsubscribe();

  }, []);

  function signInwithFirebase() {
    signInWithPopup(auth, google_provider)
      .then(() => {
      })
      .catch((e) => {
        console.log(e);
      });

  }

  function signOutwithFirebase() {
    signOut(auth)
      .then(() => {
        // console.log("Signed out successfully");
      })
      .catch((e) => {
        console.log(e);
      });


  }


  async function addNote(newNote) {
    await addDoc(collection(db, 'KeeperDB'), {
      user: auth.currentUser.email,
      title: newNote.title,
      content: newNote.content
    });
  }

  async function deleteNote(id) {
    await deleteDoc(doc(db, 'KeeperDB', id));
  }


  return (
    <div>
      <Header curUser={curUser} signInwithFirebase={signInwithFirebase} signOutwithFirebase={signOutwithFirebase} />

      {curUser ? (<CreateArea onAdd={addNote} />) : null}
      {curUser ?
        (notes.filter((noteItem) => noteItem.user === curUser?.email)
          .map((noteItem) => {
            return <Note key={noteItem.id} id={noteItem.id} title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />
          })) : null}
      <Footer />
    </div>
  );
}

export default App;
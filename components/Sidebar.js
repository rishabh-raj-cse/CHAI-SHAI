import React, { useState } from "react";

import Image from "next/image";

import { VideoCameraIcon, CameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import firebase from "firebase";

import { useRef } from "react";
function Sidebar({ sessions }) {
  const inputRef = useRef(null);

  const filePicker = useRef(null);
  const [progresss, setProgress] = useState(0);
  const [images, setImages] = useState();

  console.log(images);
  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImages(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImages(null);
  };

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    db.collection("posts")
      .add({
        message: inputRef.current.value,
        email: sessions.user.email,
        name: sessions.user.name,
        image: sessions.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (images) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(images, "data_url");
          removeImage();
          console.log(doc);
          uploadTask.on(
            "state_change",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            (error) => console.log(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = "";
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-xl text-gray-500 font-medium ">
      <div className="flex space-x-4 p-4 items-center  ">
        <Image
          src={sessions.user.image}
          alt="hills"
          width={40}
          height={40}
          layout="fixed"
        />

        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`whats on your mind, ${sessions.user.name}`}
          />
          <button hidden type="submit" onClick={sendPost}></button>
        </form>

        {images && (
          <div
            onClick={removeImage}
            className="flex shadow-xl flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor:pointer"
          >
            <img className="h-10 object-contain" src={images} />
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-1">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
        </div>
        <div className="inputIcon" onClick={() => filePicker.current.click()}>
          <CameraIcon className="h-7 text-green-400" />
          <input ref={filePicker} type="file" onChange={addImage} />
        </div>
      </div>
      <progress className="" value={progresss} max="100" />
    </div>
  );
}

export default Sidebar;

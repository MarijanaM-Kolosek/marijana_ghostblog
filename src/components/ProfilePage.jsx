import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";

const ProfilePage = (props) => {
  const [image, setImage] = useState(authService.currentUserValue.image);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
  }, []);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  return (
    <div className="profileDiv">
      <img className="profileImage" src={image} />
      <input
        className="selectImageBtn"
        type="file"
        name="myImage"
        onChange={(e) => onImageChange(e)}
      />
      <p>Username: {authService.currentUserValue.username}</p>
      <p>Full name: {authService.currentUserValue.fullname}</p>
      <p>Country: {authService.currentUserValue.country}</p>
    </div>
  );
};

export default ProfilePage;

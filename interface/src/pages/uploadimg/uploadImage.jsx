import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import UploadImagefrom from "./photo.png";
import "./style.css";
import { getCroppedImg } from "./canvasutil";
import { avatarRoute } from "../../utils/apiRoutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
export default function UploadImage() {
  useEffect(() => {
    if (!localStorage.getItem("app-user")) {
      navigate("/login");
    }
  }, []);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
  };
  const [imageSrc, setImageSrc] = useState(UploadImagefrom);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImagesss, setCroppedImage] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const inputRef = useRef(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      setProfilePicture(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };
  const setProfilePicture = async (img) => {
    if (!isImageSelected) {
      toast.error("Please select an Image", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("app-user"));
      const { data } = await axios.post(`${avatarRoute}`, {
        id: user._id,
        image: img,
      });
      if (data.status === true) {
        localStorage.setItem("app-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error("Something went wrong, try again", toastOptions);
      }
    }
  };
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = await compressImage(e.target.files[0]);
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setIsImageSelected(true);
    }
  };
  const imageSize = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const promise = new Promise((resolve, reject) => {
      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          const height = this.height;
          const width = this.width;
          resolve({ width, height });
        };
        image.onerror = reject;
      };
    });

    return promise;
  };

  const compressImage = async (file) => {
    const imageDimensions = await imageSize(file);
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight:
        imageDimensions?.width > 500 ? 500 : imageDimensions?.width,
      useWebWorker: true,
    };
    const compressedImg = await imageCompression(file, options);
    const createFileObject = new File([compressedImg], "image", {
      type: Blob.type,
    });
    return createFileObject;
  };
  return (
    <div>
      <div className="upload-window">
        <div className="croppp">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="btn-bar">
          <button className="submit-btn" onClick={handleImageClick}>
            Select Image
          </button>
          <button className="submit-btn" onClick={showCroppedImage}>
            Upload Picture
          </button>
        </div>
      </div>
      <div className="upload-window-file">
        <input
          type="file"
          onChange={onFileChange}
          ref={inputRef}
          accept="image/*"
        />
      </div>
      <ToastContainer />
    </div>
  );
}
function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

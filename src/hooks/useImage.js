import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function useImage() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileOnChange = async (e) => {
    let file = e.target.files[0]; // 입력받은 file객체

    // 이미지 resize 옵션 설정 (최대 width을 100px로 지정)
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 200,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);

      // resize된 이미지의 url을 받아 fileUrl에 저장
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setFileUrl(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    file,
    fileUrl,
    handleFileOnChange,
  };
}

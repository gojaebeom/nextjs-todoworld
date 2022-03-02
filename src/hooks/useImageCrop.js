import { useCallback, useEffect, useRef, useState } from "react";

function useImageCrop() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "px", width: 150, aspect: 5 / 5 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    console.debug("파일온!!");
    console.debug(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    console.debug(previewCanvasRef);

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        const previewUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.download = "cropPreview.png";
        anchor.href = URL.createObjectURL(blob);
        anchor.click();

        window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      1
    );
  }

  return {
    upImg,
    crop,
    setCrop,
    setCompletedCrop,
    completedCrop,
    generateDownload,
    onLoad,
    onSelectFile,
    previewCanvasRef,
  };
}

export default useImageCrop;

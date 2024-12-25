import { fetch } from "../../utils/fetch";

// limitations
const FILE_SIZE_LIMIT = 1024 * 1024 * 80;
const ALLOWED_TYPE = "video/mp4";

export const chunkedUpload = async (file, setProgress) => {
  if (!file) {
    return { success: false, message: "Please select a valid video file." };
  }

  if (file.size > FILE_SIZE_LIMIT) {
    return { success: false, message: "File size exceeds the 80MB limit." };
  }

  if (file.type != ALLOWED_TYPE) {
    return {
      success: false,
      message: "Invalid file type. Only MP4 is allowed.",
    };
  }

  const uniqueUploadId = generateUniqueUploadId();
  const chunkSize = 5 * 1024 * 1024; // 5MB per chunk
  const totalChunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;

  const uploadChunk = async (start, end) => {
    const formData = new FormData();
    formData.append("file", file.slice(start, end));
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    formData.append("upload_preset", import.meta.env.VITE_VIDEO_UPLOAD_PRESET);

    const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

    try {
      const response = await fetch(
        formData,
        "https://api.cloudinary.com",
        `v1_1/${import.meta.env.VITE_CLOUD_NAME}/video/upload`,
        "POST",
        uniqueUploadId,
        contentRange
      );

      if (response.success === false) {
        return { success: false, message: "Upload failed, try again" };
      }

      setProgress(Math.floor(((currentChunk + 1) / totalChunks) * 100));
      currentChunk++;

      if (currentChunk < totalChunks) {
        const nextStart = currentChunk * chunkSize;
        const nextEnd = Math.min(nextStart + chunkSize, file.size);
        return await uploadChunk(nextStart, nextEnd);
      } else {
        return { success: true, url: response.playback_url };
      }
    } catch (error) {
      return { success: false, message: error.message || "Upload failed" };
    }
  };

  return await uploadChunk(0, Math.min(chunkSize, file.size));
};

const generateUniqueUploadId = () => `uqid-${Date.now()}`;

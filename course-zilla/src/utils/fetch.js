import axios from "axios";

const axiosInstance = axios.create({});

export const fetch = async (
  data,
  base_url,
  endpoint,
  method,
  uniqueUploadId = undefined,
  contentRange = undefined,
  token = undefined
) => {
  try {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (uniqueUploadId) headers["X-Unique-Upload-Id"] = uniqueUploadId;
    if (contentRange) headers["Content-Range"] = contentRange;

    const result = await axiosInstance({
      baseURL: base_url,
      url: endpoint,
      method: method,
      data: data,
      headers: headers,
    });
    return result.data;
  } catch (error) {
    console.log("This error is from axios error ", error);
    return {
      success: false,
      message: error.response?.data.message || error.message,
    };
  }
};

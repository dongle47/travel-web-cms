import { axiosClient } from "./axiosClient";

const apiUpload = {
  postUploadAvatar: async (param: any) => {
    const res = await axiosClient.post("upload-service/file/upload", param, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

export default apiUpload;

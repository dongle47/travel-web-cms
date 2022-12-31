import { axiosClient } from "./axiosClient";

const apiUpload = {
  putUploadAvatar: async (param: any) => {
    const res = await axiosClient.post("/user/profile/uploadAvatar", param, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

export default apiUpload;

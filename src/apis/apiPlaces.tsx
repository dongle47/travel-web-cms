import { axiosClient } from "./axiosClient";

const apiPlaces = {
  getPlaces: async () => {
    const res = await axiosClient.get("/place-service/place/list");
    return res.data;
  },
};

export default apiPlaces;

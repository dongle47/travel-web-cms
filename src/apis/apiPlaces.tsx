import { axiosClient } from "./axiosClient";

const apiPlaces = {
  getPlaces: async () => {
    const res = await axiosClient.get("/place-service/place/list");
    return res.data;
  },

  postPlace: async (param: any) => {
    const res = await axiosClient.post("/place-service/place/create", param);
    return res.data;
  },

  getPlaceTypes: async () => {
    const res = await axiosClient.get("/place-service/place-type/list");
    return res.data;
  },
  postPlaceType: async (params: any) => {
    const res = await axiosClient.post(
      "/place-service/place-type/create",
      params
    );
    return res.data;
  },
};

export default apiPlaces;

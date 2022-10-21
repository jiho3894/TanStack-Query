import instance from "../axios";

export const getScrollProfile = async (page: number = 1) => {
  const { data } = await instance.get(`/profile?p=${page}&l=20`);
  return data;
};

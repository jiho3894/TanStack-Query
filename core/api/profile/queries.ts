import { useQuery } from "@tanstack/react-query";
import { ErrorHandle } from "../../config/ErrorType";
import instance from "../axios";
import { IProfile, ProfileProps } from "./types";

export const useGetProfile = () => {
  return useQuery<IProfile, ErrorHandle, ProfileProps[]>(
    ["profile"],
    getProfile
  );
};

export const useGetProfileDetail = (page: string) => {
  return useQuery<IProfile, ErrorHandle, ProfileProps>(
    ["profile", page],
    () => getProfileDetail(page)
  );
};

export const getProfileDetail = async (page: string) => {
  const res = await instance.get(`/profile/${page}`);
  return res.data;
};

export const getProfile = async () => {
  const res = await instance.get("/profile");
  return res.data;
};


import configServices from "../../../utils/configServices";
import { PostHistoryInterface } from "../postHistory.model";

export const createPost = async (post: PostHistoryInterface) => {
  const result = await configServices.postService<PostHistoryInterface>("post-history", {
    ...post,
    isCreateContent: false,
  });
  return result;
};

export const deletePost = async (param: number) => {
  const result = await configServices.deleteService<PostHistoryInterface>(
    `post-history/${param}`
  );
  return result;
};

export const updatePost = async (id: number, param: any) => {
  const result = await configServices.patchService<PostHistoryInterface>(
    `post-history/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getPost = async (id: number) => {
  const result = await configServices.getService<PostHistoryInterface>(
    `post-history/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getPosts = async (filter?: any) => {
  const result = await configServices.getService<PostHistoryInterface>(
    `post-history`,
    filter,
    null,
    true
  );
  return result;
};

import { IPostStatisticalResponse, ISearchPostStatistical, PostInterface } from "./../../../models/post";
import { IDataResponse, ISearchParam } from "../../../models";
import configServices from "../../../utils/configServices";

export const createPost = async (post: PostInterface) => {
  const result = await configServices.postService<PostInterface>("post", {
    ...post,
  });
  return result;
};

export const createPostList = async (post: { data: PostInterface[] }) => {
  const result = await configServices.postService<PostInterface>("post/list", {
    ...post,
  });
  return result;
};

export const deletePost = async (param: number) => {
  const result = await configServices.deleteService<PostInterface>(
    `post/${param}`
  );
  return result;
};

export const updatePost = async (id: number, param: any) => {
  
  const result = await configServices.patchService<PostInterface>(
    `post/${id}`,
    { ...param }
  );
  return result;
};

export const getPost = async (id: number, language?: string) => {
  const result = await configServices.getService<PostInterface>(
    `post/${id}`,
    { language },
    null,
    true
  );
  return result;
};

export const getPostLanguage = async (id: number) => {
  return  await configServices.getService<PostInterface>(
    `post/language/${id}`,
    null,
    null,
    true
  );
};

export const getPosts = async (filter?: any) => {
  const result = await configServices.getService<PostInterface>(
    `post`,
    filter,
    null,
    true
  );
  return result;
};

export const getPostStatistical = async (filter?: ISearchPostStatistical) => {
  const result = await configServices.getService<IPostStatisticalResponse>(
    `post/statistical`,
    filter,
    null,
    true
  );
  return result;
};

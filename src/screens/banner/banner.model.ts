import { Moment } from "moment";

export interface SliderInterface {
  title?: string;
  content?: string;
  description?: string;
  imgage?: string;
  path?: string;
}
export interface ISliderLanguage {
  language: string;
  isDefault: boolean | undefined,
  sliders: SliderInterface[];
}

export interface BannerInterface {
  id: number;
  name?: string;
  language?: string;
  isDefault?: boolean;
  languages?: ISliderLanguage[];
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
  sliders: SliderInterface[];
}
export interface IBanner {
  name?: string;
  isDefault?: boolean;
  language?: string;
  languages?: ISliderLanguage[];
  sliders: SliderInterface[];
}
export interface ISearchBanner {
  name?: string | undefined;
}

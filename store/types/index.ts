import {AppDispatch} from "../index";

export interface HomeState {
    images: Array<Image> | number | string | undefined;
    pageNum: number | undefined
}

export interface CoverImage {
    medium: string
}

export interface Title {
    english: string
}

export interface Image {
    id?:         string
    title:       Title                     // todo: mutate this inside reducer or middleware
    description: string
    imageUrl?:   string        // todo: mutate this inside reducer or middleware
    coverImage?: CoverImage
}

export interface ImageData {
    id:          string
    title:       string                     // todo: mutate this inside reducer or middleware
    description: string
    imageUrl:    string        // todo: mutate this inside reducer or middleware
}

type ActionData = Array<Image> | number | string | undefined

export interface Action {
    type:     string
    data?:    ActionData
    pageNum?: number | undefined
}

export type FetchImagesType = (pageNum : number) => Action

export interface SetImage {
    imageUrl: string | undefined;
    description: string;
    id: string | undefined;
    title: string
}


export interface HomeComponent {
    dispatch: AppDispatch
    images: Array<ImageData>
    pageNum: number
}

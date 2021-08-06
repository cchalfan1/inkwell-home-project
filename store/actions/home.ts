import {FetchImagesType} from "../types"

export const FETCH_IMAGES = 'FETCH_IMAGES'
export const SET_IMAGES   = 'SET_IMAGES'

export const onFetchImages : FetchImagesType = (pageNum : number) => ({ type: FETCH_IMAGES, data: pageNum })
export const onSetImages   = (images: ImageData[], pageNum: number) => ({ type: SET_IMAGES, data: images, pageNum })

import {ItemType} from "./article";

export interface HomeType {
    popular: ItemType[]
    section: {
        e: HomeSection,
        s: HomeSection,
        g: HomeSection,
        esg: ItemType[]
    }
}

export interface HomeSection {
    article: ItemType[]
    idx: number
    name: string
    parent_idx: number
    sort: number
    state: number
    type: number
}
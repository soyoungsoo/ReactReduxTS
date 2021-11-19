import React from "react";

export interface Tab {
    title: string
    list: Item[]
}

export interface Item {
    title: string
    child: string[]
    component: [() => React.ReactElement]
    query: string[]
}

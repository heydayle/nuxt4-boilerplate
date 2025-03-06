export interface Social {
    name: string
    icon?: string
    href?: string
}
export interface Link {
    label: string
    path?: string
    href?: string
    target?: string
}
export interface Header {
    label: string
    path: string
    class?: string
    transition?: string
    disabled?: boolean
}
export interface Footer {
    label: string
    path: string
    class?: string
    transition?: string
    disabled?: boolean
}

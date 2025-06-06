export interface Navigation {
    name: string
    label: string
    to?: string
    href?: string
    class?: string
    transition?: string
    disabled?: boolean
    icon?: string
    children?: Navigation[]
}
export interface Social {
    name: string
    icon: string
    href: string
}
export interface Link {
    label: string
    path?: string
    href?: string
    target?: string
}
export interface Header {
    navigation: Navigation[]
    logo?: string
    heading?: string
}
export interface Feature {
    label?: string
    icon?: string
}
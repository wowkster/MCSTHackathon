
type Style = string | any

export function combine(...styles: Style[]): string {
    return styles.filter(s => !!s).join(" ")
}
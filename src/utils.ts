export function AddBySec(sec: number) : Date {
    let date: Date = new Date()
    date.setSeconds(date.getSeconds() + sec)
    return date
}
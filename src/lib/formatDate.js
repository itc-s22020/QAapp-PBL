export function formatDate(s){
    const d = new Date(s)
    const [year, month, day, hour, minute] = [
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes()
    ]
    return `${year}/${month}/${day} ${hour}:${minute}`
}
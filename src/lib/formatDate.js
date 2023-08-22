export function formatDate(s){
    const d = new Date(s)
    const [year, month, day, hour, minute] = [
        d.getFullYear().toString().padStart(4, 0),
        (d.getMonth() + 1).toString().padStart(2, 0),
        d.getDate().toString().padStart(2, 0),
        d.getHours().toString().padStart(2, 0),
        d.getMinutes().toString().padStart(2, 0)
    ]
    return `${year}/${month}/${day} ${hour}:${minute}`
}
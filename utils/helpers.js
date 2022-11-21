import { Place } from "../models/place"

export const formatData = data => {
    const formatted = data.map(item => {
        const {title, type, x, y, z, description, id, dateModified, dateCreated} = item
        return new Place(title, x, y, z, type, description, id, dateModified, dateCreated)
    })
    return formatted
}

export const randomString = () => {
    const titles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const randomNum = () => Math.floor(Math.random() * 99)
    const randomType = () => ['home', 'cave', 'village', 'other'][Math.floor(Math.random() * 4)]
    const query = 'INSERT INTO places (title, type, x, y, z, description, dateCreated, dateModified) VALUES '
    const subqueries = []
    titles.forEach(item => subqueries.push(`('${item}', '${randomType()}', ${randomNum()}, ${randomNum()}, ${randomNum()}, NULL, '${new Date().toString()}', '${new Date().toString()}')`))
    const subqueryString = subqueries.join()
    return query + subqueries
}
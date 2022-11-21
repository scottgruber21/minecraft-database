import * as SQLite from 'expo-sqlite'
import { formatData } from './helpers'
import { Place } from '../models/place'
import { randomString } from './helpers'

const db = SQLite.openDatabase('places.db')

export const init = () => {

    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
           tx.executeSql( `CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY NOT NULL,
            title VARCHAR NOT NULL,
            type TEXT NOT NULL,
            x INTEGER NOT NULL,
            y INTEGER NOT NULL,
            z INTEGER,
            description TEXT,
            dateCreated TEXT,
            dateModified TEXT
            )`, [],
            () => {
                resolve()
            },
            (_, error) => {
                reject(error)
                console.log(error)
            })
        },
        )
    })
    return promise
}

export const fetchAll = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM places`, [],
            (_, result) => {
                resolve(formatData(result.rows._array))
            }, 
            (_, error) => {
                console.log(error)
                reject(error)
            }
            )
        })
    })
    return promise
}

export const deleteOne = id => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM places WHERE id = ?`, [id],
            () => {
                resolve()
            },
            (_, error) => {
                console.log(error)
                reject(error)
            }
            )
        })
    })
    return promise
}

export const deleteAll = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM places WHERE id != 0`, [],
            () => {
                resolve()
            },
            (_, error) => {
                reject(error)
            }
            )
        })
    })
    return promise
}

export const populate = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(randomString(), [],
            (_, result) => {
                resolve(result)
            },
            (_, error) => {
                reject(error)
            }
            )
        })
    })

    return promise
}

export const addOne = (place) => {
    const {title, type, x, y, z, description, dateCreated, dateModified} = place
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO places (title, type, x, y, z, description, dateCreated, dateModified) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [title, type, x, y, z, description, dateCreated, dateModified],
            () => {
                resolve()
            },
            (_, error) => {
                console.log(error)
                reject(error)
            }
            )
        })
    })
    return promise
}

export const changeRow = place => {

    const {title, type, x, y, z, description, id, dateModified} = place

    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`UPDATE places
            SET title = ?,
            type = ?,
            x = ?,
            y = ?,
            z = ?,
            description = ?,
            dateModified = ?
            WHERE id = ?
            `, [title, type, x, y, z, description, dateModified, id],
            () => {
                resolve()
            },
            (_, error) => {
                console.log(error)
                reject(error)
            }
            )
        })
    })
    return promise
}
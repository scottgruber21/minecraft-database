import { useContext, useState, createContext } from "react"
import { fetchAll, addOne, changeRow, deleteOne } from "../utils/database"
import { Place } from "../models/place"

const GlobalContext = createContext()

const GlobalProvider = ({children}) => {
    // const [places, setPlaces] = useState([new Place('Cave over there', 22, 44, 66, 'cave', 'This cave over here that has a bunch of stuff that I need to build things', 1),
    // new Place('Home over there', 44, 66, 88, 'home', 'This home over here that has a bunch of stuff that I need to build things', 2),
    // new Place('Village over there', 88, 110, 130, 'village', 'This village over here that has a bunch of stuff that I need to build things', 3),
    // new Place('Stuff over there', 89, 100, 120, 'other', 'This stuff over here that has a bunch of stuff that I need to build things', 4)])

    const [places, setPlaces] = useState([])
    const [globalTerms, setGlobalTerms] = useState({})

    const deletePlace = (id) => {
        const newPlaces = places.filter(x => x.id !== id)
        setPlaces(newPlaces)
        deleteOne(id)
    }

    const addPlace = (data) => {
        const {title, x, y, z, type, description} = data
        const newPlace = new Place(title, x, y, z, type, description)
        setPlaces([...places, {...newPlace, id: Math.random()}])
        addOne(newPlace)
    }

    const editPlace = (data) => {
        const {title, x, y, z, type, description, id} = data
        let newPlaces = places.filter(x => x.id != data.id)
        const newData = new Place(title, x, y, z, type, description, id, new Date().toString())
        setPlaces([...newPlaces, newData])
        changeRow(newData)
    }

    const newSearch = terms => {
        setGlobalTerms(terms)
    }

    const searchPlace = (searchTerms) => {
        const {type, x, y, searchText} = searchTerms

        let tempPlaces = places
        if(type){
            tempPlaces = tempPlaces.filter(x => type.includes(x.type))
        }
        if(searchText){
            tempPlaces = tempPlaces.filter(x => (x.description && x.description.toLowerCase().includes(searchText.toLowerCase())) || x.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        if(x && y){
            const coordX = Number(x)
            const coordY = Number(y)
            tempPlaces = tempPlaces.sort((a, b) => (Math.abs(a.combined - (coordX + coordY))) - (Math.abs(b.combined - (coordX + coordY))))
        }
        return tempPlaces
    }

    const searchedPlaces = searchPlace(globalTerms)

    const initialData = async() => {
        const data = await fetchAll()
        setPlaces(data)
    }

    return <GlobalContext.Provider value={{places, deletePlace, addPlace, editPlace, initialData, searchPlace, newSearch, globalTerms, searchedPlaces}}>
        {children}
    </GlobalContext.Provider>
}

const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export {GlobalProvider, useGlobalContext}
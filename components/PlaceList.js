import { FlatList } from "react-native"
import PlaceItem from "./PlaceItem"

const RenderItem = ({data}) => {
    return <PlaceItem placeData={data} />
}

const PlaceList = ({placeListData}) => {
    return <FlatList data={placeListData} renderItem={({item}) => <RenderItem data={item} />} keyExtractor={item => item.id} />
}

export default PlaceList
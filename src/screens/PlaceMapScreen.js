import MapView, { Marker } from 'react-native-maps';

const PlaceMapScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // 장소 리스트 가져오기
    fetch('https://eventcafe.site/map')
      .then(res => res.json())
      .then(data => setPlaces(data));
  }, []);

  return (
    <MapView style={{ flex: 1 }} initialRegion={{ latitude: 37.56, longitude: 126.97, latitudeDelta: 0.05, longitudeDelta: 0.05 }}>
      {places.map(place => (
        <Marker
          key={place.id}
          coordinate={{ latitude: place.lat, longitude: place.lng }}
          title={place.name}
          onPress={() => navigation.navigate("PlaceDetail", { placeId: place.id })}
        />
      ))}
    </MapView>
  );
};

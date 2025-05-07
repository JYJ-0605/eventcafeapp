import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const artistData = [
  { name: "윤서연", image: require("../../../assets/artist/tripleS_1.jpg")},
  { name: "김유연", image: require("../../../assets/artist/tripleS_5.jpg")},
  { name: "김나경", image: require("../../../assets/artist/tripleS_7.jpg")},
  { name: "코토네", image: require("../../../assets/artist/tripleS_11.jpg")},
  { name: "니엔", image: require("../../../assets/artist/tripleS_13.jpg")},
  { name: "정하연", image: require("../../../assets/artist/tripleS_19.jpg")},
];

const SubscribeArtistScreen = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const filteredData = artistData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artistContainer}
      onPress={() => navigation.navigate("ArtistDetail", {
        name: item.name,
        image: item.image,
        background: item.background,
      })}
    >
      <Image source={item.image} style={styles.artistImage} />
      <Text style={styles.artistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="아티스트명 검색"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* 아티스트 그리드 */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  grid: {
    justifyContent: "space-between",
  },
  artistContainer: {
    flex: 1 / 3,
    alignItems: "center",
    marginBottom: 20,
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
    marginBottom: 6,
  },
  artistName: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
});

export default SubscribeArtistScreen;

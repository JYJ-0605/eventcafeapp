import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PopularCafeScreen = () => {
  const [idols, setIdols] = useState([]);
  const [youtubers, setYoutubers] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://eventcafe.site/user/star/stars/?genre=idol')
      .then((res) => res.json())
      .then((json) => setIdols(json));

    fetch('https://eventcafe.site/user/star/stars/?genre=youtuber')
      .then((res) => res.json())
      .then((json) => setYoutubers(json));

    fetch('https://eventcafe.site//user/star/stars/?genre=game')
      .then((res) => res.json())
      .then((json) => setGames(json));
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: '#E3F7F7', paddingHorizontal: 16 }}
    >
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 데이터 섹션들 */}
          <CategorySection title="인기 스타 TOP 3" items={idols} />
          <CategorySection title="인기 유튜버 TOP 3" items={youtubers} />
          <CategorySection title="인기 게임 콜라보 TOP 3" items={games} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const CategorySection = ({ title, items = [] }) => {
  if (!Array.isArray(items)) {
    console.warn(`⚠️ ${title} 데이터가 배열이 아님:`, items);
    return null;
  }
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
        <FontAwesome name="trophy" size={16} color="black" /> {title}
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {items.slice(0, 3).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              height: 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 3,
              padding: 10,
            }}
            onPress={() => {
              // TODO: 상세 페이지로 이동하는 로직 추가
              console.log(`${title} - ${item.name} 클릭`);
            }}
          >
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 60, marginBottom: 5, borderRadius: 5 }}
                resizeMode="contain"
              />
            )}
            <Text style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PopularCafeScreen;
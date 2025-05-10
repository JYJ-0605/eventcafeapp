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

    fetch('https://eventcafe.site/data/youtuber.json')
      .then((res) => res.json())
      .then((json) => setYoutubers(json));

    fetch('https://eventcafe.site/data/game.json')
      .then((res) => res.json())
      .then((json) => setGames(json));
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: '#E3F7F7', paddingHorizontal: 16 }}
    >
    
      {/* 헤더 */}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}
      >
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          현재 인기 카페 이벤트
        </Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <FontAwesome name="bell" size={22} color="black" />
          <MaterialIcons name="menu" size={26} color="black" />
        </View>
      </View>

      {/* 로고 */}
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 120, height: 40 }}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 데이터 섹션들 */}
        <CategorySection title="인기 스타 TOP 3" items={idols} />
        <CategorySection title="인기 유튜버 TOP 3" items={youtubers} />
        <CategorySection title="인기 게임 콜라보 TOP 3" items={games} />
      </ScrollView>
    </View> // ✅ 여기서 닫힘
    
  
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
          <View
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
          >
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PopularCafeScreen;

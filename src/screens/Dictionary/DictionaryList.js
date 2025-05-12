import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DictionaryList = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // 테스트용 목업 데이터 (API 연결 전용)
  useEffect(() => {
    const fetchData = async () => {
      // 👉 여기 fetchDictionaryList()로 교체 가능
      const dummyData = [
        {
          id: '1',
          title: '입덕',
          summary: '팬이 되는 순간',
          author: '@kpopfan01',
        },
        {
          id: '2',
          title: '취켓팅',
          summary: '돌아갈 수 없다. 더 깊이 빠진다.',
          author: '@3114jin@naver.com',
        },
      ];
      setWords(dummyData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DictionaryDetail', { wordId: item.id })
      }
    >
      <Text style={styles.wordTitle}>📘 {item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 팬들이 만드는 덕질 사전</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('DictionaryForm')}
      >
        <Text style={styles.addButtonText}>➕ 새 항목 추가</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6F61" />
      ) : (
        <FlatList
          data={words}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default DictionaryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
    marginTop: 6,
  },
  author: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    textAlign: 'right',
  },
});

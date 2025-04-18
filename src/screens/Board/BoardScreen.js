import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const dummyPosts = [
  { id: '1', title: '오늘 다녀온 카페 공유해요 ☕️' },
  { id: '2', title: '이달 생일카페 추천해주세요!' },
];

const BoardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.writeButton} onPress={() => navigation.navigate('Write')}>
        <Text style={styles.writeButtonText}>글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  post: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8,
  },
  title: { fontWeight: 'bold' },
  writeButton: {
    backgroundColor: '#FF6F91',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  writeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BoardScreen;

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DictionaryDetail = () => {
  const [wordDetail, setWordDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { wordId } = route.params;

  // 테스트용 목업 데이터 (API 연결 전용)
  useEffect(() => {
    const fetchWordDetail = async () => {
      // 👉 여기 fetchDictionaryDetail(wordId)로 교체 가능
      // 실제 API 호출 시 wordId를 사용하여 특정 단어의 상세 정보를 가져옵니다.
      const dummyDetail = {
        '1': {
          id: '1',
          title: '입덕',
          fullDescription:
            '아이돌이나 특정 분야의 팬이 되는 것을 비유적으로 이르는 말. ‘오타쿠 문화’에서 유래된 용어로, ‘어떤 대상을 열렬히 좋아하게 되다’라는 뜻의 일본어 ‘오타쿠니 나루(おたくになる)’에서 파생된 신조어이다.',
          author: '@kpopfan01',
          relatedTerms: ['최애', '탈덕', '성덕'],
          example: '어쩌다 OO의 무대를 보고 입덕했어요.',
          createdAt: '2023-10-26',
        },
        '2': {
          id: '2',
          title: '취켓팅',
          fullDescription:
            '취소표+티켓팅. 무통장 입금으로 예매한 표는기한까지 입금이 안 되면 예매가 취소된다. 팬들은 취소표가 풀리는 시간에 다시 티켓팅을 한다. 이때 취소표를 노리고 다시 티켓팅을 하는 것을 취켓팅이라고 한다.',
          author: '@animestan',
          relatedTerms: ['예매', '티켓팅', '취소표'],
          example: '이번 콘서트는 취켓팅이 힘들었어요.',
          createdAt: '2023-11-15',
        },
      };

      setWordDetail(dummyDetail[wordId] || null);
      setLoading(false);
    };

    fetchWordDetail();
  }, [wordId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF6F61" />;
  }

  if (!wordDetail) {
    return (
      <View style={styles.container}>
        <Text>🧐 해당 용어의 상세 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📖 {wordDetail.title}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>설명</Text>
        <Text style={styles.description}>{wordDetail.fullDescription}</Text>

        {wordDetail.relatedTerms && wordDetail.relatedTerms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>연관 용어</Text>
            <Text style={styles.relatedTerms}>
              {wordDetail.relatedTerms.join(', ')}
            </Text>
          </View>
        )}

        {wordDetail.example && (
          <View style={styles.section}>
            <Text style={styles.label}>예시</Text>
            <Text style={styles.example}>{wordDetail.example}</Text>
          </View>
        )}

        <Text style={styles.author}>작성자: {wordDetail.author}</Text>
        <Text style={styles.createdAt}>등록일: {wordDetail.createdAt}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  detailContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
    color: '#333',
  },
  section: {
    marginBottom: 16,
  },
  relatedTerms: {
    fontSize: 16,
    color: '#007bff',
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
  },
  author: {
    fontSize: 12,
    color: '#777',
    marginTop: 16,
    textAlign: 'right',
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});

export default DictionaryDetail;
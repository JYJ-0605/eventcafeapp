import React, { useContext, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserContext } from '../../context/UserContext';

// 더미 아티스트 데이터
const artistData = [
  { name: 'ALL' },
  { name: '윤서연', image: require('../../../assets/artist/tripleS_1.jpg') },
  { name: '김유연', image: require('../../../assets/artist/tripleS_5.jpg') },
  { name: '김나경', image: require('../../../assets/artist/tripleS_7.jpg') },
  { name: '코토네', image: require('../../../assets/artist/tripleS_11.jpg') },
  { name: '니엔', image: require('../../../assets/artist/tripleS_13.jpg') },
  { name: '정하연', image: require('../../../assets/artist/tripleS_19.jpg') },
];

const PostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('ALL');

  const toggleArtist = (name) => {
    if (selectedArtist === name || (name === 'ALL' && !selectedArtist)) {
      setSelectedArtist(null); // 선택 해제
    } else {
      setSelectedArtist(name); // 선택
    }
  };

  const handleSubmit = () => {
    console.log('작성한 글:', {
      artist: selectedArtist || 'ALL',
      title,
      content,
    });
    navigation.goBack();
  };

  const { user, setUser } = useContext(UserContext); // 로그인 정보 Context에서 받아오기

  return (
    <View style={styles.container}>
      {/* 아티스트 선택 토글 (ScrollView) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.artistRow}
      >
        {artistData.map((artist, idx) => {
          const isSelected =
            selectedArtist === artist.name ||
            (!selectedArtist && artist.name === 'ALL');
          return (
            <View key={idx} style={styles.artistItem}>
              {/* 이미지 및 텍스트 전체를 눌러서 선택 */}
              <TouchableOpacity
                onPress={() => toggleArtist(artist.name)}
                activeOpacity={0.7}
                style={styles.imageWrapper}
              >
                {/* 아티스트 이미지 */}
                {artist.image ? (
                  <Image source={artist.image} style={styles.artistImage} />
                ) : (
                  <View
                    style={[
                      styles.artistImage,
                      { justifyContent: 'center', alignItems: 'center' },
                    ]}
                  >
                    <Text style={{ fontWeight: 'bold', color: '#666' }}>
                      ALL
                    </Text>
                  </View>
                )}
                {/* 체크 표시 */}
                {isSelected && (
                  <View style={styles.checkOverlay}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* 아티스트 이름 */}
              <Text style={styles.artistName}>{artist.name}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.userRow}>
  {user?.profileImage ? (
    <Image
      source={{ uri: user.profileImage }}
      style={styles.profileImage}
    />
  ) : (
    <View style={styles.avatarCircle}>
      <Text style={styles.avatarText}>
        {user?.nickname?.charAt(0).toUpperCase() || '유'}
      </Text>
    </View>
  )}

  <Text style={styles.usernameText}>
    {user?.nickname || '닉네임 없음'}
  </Text>
</View>

      
      {/* 글 작성 폼 */}
      <View style={styles.formContainer}>
     
        <TextInput
          placeholder="제목"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder={`[이벤트 공동 주최자 모집 내용 예시]

        이벤트 대상 : 

        이벤트 형태 : 

        예상 이벤트 일정 :

        예상 준비 기간 :

        모집 인원 :

        이벤트 소개 및 진행 이유 :

        이벤트 진행 관련 주의사항 :

        공동주최에 지원할 수 있는 방법을 남겨주세요. 
        (이메일, 카카오 오픈채팅방, 구글폼 등) :`}
          style={[
            styles.input,
            {
              height: 400,
              textAlignVertical: 'top', // multiline 텍스트가 위쪽에서 시작하도록
            },
          ]}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button title="등록" onPress={handleSubmit} />
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  artistRow: {
    flexDirection: 'row',
    paddingVertical: 10, // 간격을 줄임
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  artistItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkOverlay: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: '#FF6F91',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  artistName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  formContainer: {
    padding: 20, // 간격 명시적으로 부여
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  avatarContainer: {
    alignItems: 'flex', // ← 여기에 적당한 간격 추가
    marginLeft: 16,
  },
  
  
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20, // 간격 명시적으로 부여
  },
  
  usernameText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default PostScreen;

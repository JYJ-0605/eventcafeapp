import { Avatar } from '@rneui/themed'; // react-native-elements 사용
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axiosInstance from '../../API/axiosInstance'; // Axios 설정 (본인 앱 구조에 맞게 수정)
import { UserContext } from '../../context/UserContext'; // Context API (본인 앱 구조에 맞게 수정)
import { navigate } from '../../navigation/NavigatorRef';

const ProfilePage = ({ route, navigation }) => {
  const { nickname } = route.params; // useParams 대신 route.params 사용
  const { user, ready } = useContext(UserContext); // ✅ 로그인된 유저 (Context API)
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserInitial = () => {
    if (user && user.nickname && typeof user.nickname === 'string') {
      return user.nickname.charAt(0).toUpperCase();
    }
    return '유';
  };

  useEffect(() => {
    // React Native에서는 useEffect 내에서 비동기 함수를 바로 사용할 수 없습니다.
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user/profile/${nickname}/`);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        if (!nickname) {
          console.error('닉네임이 정의되지 않음');
          setProfile(null);
          setLoading(false);
          return;
        }
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [nickname]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!profile) {
    return (
      <ScrollView contentContainerStyle={styles.errorContainer}>
        {user?.profile_image ? (
          <Image
            source={{ uri: user.profile_image }}
            style={styles.profile_image}
          />
        ) : (
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getUserInitial()}</Text>
          </View>
        )}
        <Text style={styles.errorTitle}>😢 사용자 정보를 찾을 수 없어요!</Text>
        <Text style={styles.errorMessage}>
          입력한 닉네임이 잘못되었거나, 서버에서 정보를 불러오지 못했어요.
        </Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.errorButtonText}>🔙 돌아가기</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const isMyProfile = user?.nickname === profile?.nickname; // ✅ 비교!

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.paper}>
        <Avatar
          source={{ uri: profile.profile_image }}
          title={
            profile.nickname
              ? profile.nickname.substring(0, 2).toUpperCase()
              : 'U'
          }
          size={110}
          rounded
          containerStyle={styles.avatar}
        />
        <Text style={styles.nickname}>{profile.nickname}</Text>
        <Text style={styles.email}>{profile.email}</Text>

        <View style={styles.divider} />

        <Text style={styles.joinDate}>
          가입일: {new Date(profile.created_at).toLocaleDateString()}
        </Text>

        {/* 자기소개(bio)가 있을 때만 보여주기 */}
        {profile.bio && (
          <>
            <View style={styles.divider} />
            <Text style={styles.bioTitle}>📝 자기소개</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </>
        )}

        {/* 프로필 주인 여부 체크 */}
        {isMyProfile ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigate('EditProfile')} // EditProfile 스크린으로 이동
          >
            <Text style={styles.editButtonText}>✏️ 프로필 수정</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.otherProfileText}>
              이 사용자가 작성한 게시글을 확인할 수 있어요
            </Text>
            <TouchableOpacity
              style={styles.viewPostsButton}
              onPress={() =>
                navigate('UserPosts', { nickname: profile.nickname })
              } // UserPosts 스크린으로 이동
            >
              <Text style={styles.viewPostsButtonText}>
                📃 이 사용자 글 보기
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  errorImage: {
    maxWidth: 300,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  errorButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  paper: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    maxWidth: 600,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 4,
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#6C63FF',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
    marginVertical: 20,
  },
  joinDate: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  bioText: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
  editButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  otherProfileText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  viewPostsButton: {
    borderColor: '#6C63FF',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  viewPostsButtonText: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfilePage;

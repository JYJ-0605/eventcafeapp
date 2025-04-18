import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    console.log('작성한 글:', { title, content });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="제목"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="내용"
        style={[styles.input, { height: 150 }]}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="등록" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
});

export default PostScreen;

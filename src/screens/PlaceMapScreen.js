import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const KakaoMapScreen = () => {
  const webviewRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    setSelectedPlace(data);
    setModalVisible(true);
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2a1d16dca2b187d288b52687ea868276&libraries=services"></script>
      </head>
      <body>
        <div id="map" style="width:100%;height:100vh;"></div>
        <script>
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(37.5665, 126.978),
            level: 4,
          };
          const map = new kakao.maps.Map(container, options);

          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(37.5665, 126.978),
          });
          marker.setMap(map);

          kakao.maps.event.addListener(marker, 'click', function () {
            const place = {
              name: '예시 카페',
              address: '서울시 중구 세종대로',
              phone: '010-1234-5678',
              image_url: 'https://via.placeholder.com/200x100'
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(place));
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>📍 {selectedPlace?.name}</Text>
          <Text>🏠 주소: {selectedPlace?.address}</Text>
          <Text>📞 전화번호: {selectedPlace?.phone}</Text>
          <Text style={styles.close} onPress={() => setModalVisible(false)}>
            닫기
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  close: {
    color: 'blue',
    marginTop: 20,
  },
});

export default KakaoMapScreen;

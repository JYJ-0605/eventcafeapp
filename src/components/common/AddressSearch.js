import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

const AddressSearch = ({ navigation, route }) => {
  const webviewRef = useRef(null);

  const handleMessage = (event) => {
    const address = event.nativeEvent.data;
    console.log('선택된 주소:', address);
    navigation.goBack();
    route.params?.onAddressSelected(address);
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>주소검색</title>
        <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      </head>
      <body>
        <div id="wrap"></div>
        <script>
          new daum.Postcode({
            oncomplete: function(data) {
              window.ReactNativeWebView.postMessage(data.address);
            }
          }).open();
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      ref={webviewRef}
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      onMessage={handleMessage}
    />
  );
};

export default AddressSearch;

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateSelectionScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#E3F7F7" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>날짜 선택</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={{ padding: 12, backgroundColor: "white", borderRadius: 8 }}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity 
        onPress={() => navigation.navigate("PlaceSelection")} 
        style={{ marginTop: 20, padding: 12, backgroundColor: "#FFB6C1", borderRadius: 8 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateSelectionScreen;
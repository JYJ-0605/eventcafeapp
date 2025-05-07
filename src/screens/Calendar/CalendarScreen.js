import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const birthdayEvents = [
  { date: '2025-04-20', name: '(G)I-DLE 미연 생일' },
  { date: '2025-04-23', name: '세븐틴 호시 생일' },
];

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const markedDates = birthdayEvents.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: 'pink',
      selected: event.date === selectedDate,
      selectedColor: '#ffe6f0',
    };
    return acc;
  }, {});

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const selectedEvent = birthdayEvents.find(e => e.date === selectedDate);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#FF4081',
          arrowColor: '#FF4081',
        }}
      />
      {selectedEvent && (
        <View style={styles.eventBox}>
          <Text style={styles.eventText}>{selectedEvent.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50 },
  eventBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff0f6',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  eventText: {
    color: '#d63384',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CalendarScreen;

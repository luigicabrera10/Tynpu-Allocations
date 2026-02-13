// import React, { useState, useCallback } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useFocusEffect, useRouter } from 'expo-router';
// import { ApiAllocationRepository } from '../../../infrastructure/api/ApiAllocationRepository';

// export default function AddAllocation() {
//   const [consultants, setConsultants] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date(Date.now() + 3600000));
//   const [showPicker, setShowPicker] = useState({ field: null, visible: false });

//   const [form, setForm] = useState({ consultantId: '', projectId: '' });
  
//   const router = useRouter();
//   const repo = new ApiAllocationRepository();

//   useFocusEffect(useCallback(() => {
//     repo.getConsultants().then(c => {
//       setConsultants(c);
//       if (c.length) setForm(prev => ({ ...prev, consultantId: c[0].id }));
//     });
//     repo.getProjects().then(p => {
//       setProjects(p);
//       if (p.length) setForm(prev => ({ ...prev, projectId: p[0].id }));
//       setLoading(false);
//     });
//   }, []));

//   const handleSave = async () => {
//     try {
//       const payload = {
//         ...form,
//         startTime: startDate.toISOString(),
//         endTime: endDate.toISOString(),
//       };
//       await repo.createAllocation(payload);
//       Alert.alert("Success", "Allocation created", [{ text: "OK", onPress: () => router.push("/(tabs)/allocations/") }]);
//     } catch (e) {
//       Alert.alert("Conflict", "Consultant is busy at this time");
//     }
//   };

//   const onDateChange = (event, selectedDate, field) => {
//     setShowPicker({ field: null, visible: false });
//     if (selectedDate) {
//       field === 'start' ? setStartDate(selectedDate) : setEndDate(selectedDate);
//     }
//   };

//   if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>CONSULTANT</Text>
//       <View style={styles.pickerBox}>
//         <Picker selectedValue={form.consultantId} onValueChange={(v) => setForm({...form, consultantId: v})}>
//           {consultants.map(c => <Picker.Item key={c.id} label={c.name} value={c.id} />)}
//         </Picker>
//       </View>

//       <Text style={styles.label}>PROJECT</Text>
//       <View style={styles.pickerBox}>
//         <Picker selectedValue={form.projectId} onValueChange={(v) => setForm({...form, projectId: v})}>
//           {projects.map(p => <Picker.Item key={p.id} label={p.name} value={p.id} />)}
//         </Picker>
//       </View>

//       <Text style={styles.label}>START TIME</Text>
//       <TouchableOpacity style={styles.dateBtn} onPress={() => setShowPicker({ field: 'start', visible: true })}>
//         <Text>{startDate.toLocaleString()}</Text>
//       </TouchableOpacity>

//       <Text style={styles.label}>END TIME</Text>
//       <TouchableOpacity style={styles.dateBtn} onPress={() => setShowPicker({ field: 'end', visible: true })}>
//         <Text>{endDate.toLocaleString()}</Text>
//       </TouchableOpacity>

//       {showPicker.visible && (
//         <DateTimePicker
//           value={showPicker.field === 'start' ? startDate : endDate}
//           mode="datetime"
//           is24Hour={true}
//           onChange={(e, d) => onDateChange(e, d, showPicker.field)}
//         />
//       )}

//       <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
//         <Text style={styles.saveText}>CREATE ALLOCATION</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   label: { fontSize: 11, fontWeight: 'bold', color: '#888', marginTop: 15, marginBottom: 5 },
//   pickerBox: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fafafa' },
//   dateBtn: { padding: 15, borderWidth: 1, borderColor: '#eee', borderRadius: 8 },
//   saveBtn: { backgroundColor: '#7c3aed', padding: 18, borderRadius: 10, marginTop: 30 },
//   saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
// });

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'; // Use this for Android
import { useFocusEffect, useRouter } from 'expo-router';
import { ApiAllocationRepository } from '../../../infrastructure/api/ApiAllocationRepository';

export default function AddAllocation() {
  const [consultants, setConsultants] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 3600000));
  const [form, setForm] = useState({ consultantId: '', projectId: '' });
  
  const router = useRouter();
  const repo = new ApiAllocationRepository();

  useFocusEffect(useCallback(() => {
    repo.getConsultants().then(c => {
      setConsultants(c);
      if (c.length) setForm(prev => ({ ...prev, consultantId: c[0].id }));
    });
    repo.getProjects().then(p => {
      setProjects(p);
      if (p.length) setForm(prev => ({ ...prev, projectId: p[0].id }));
      setLoading(false);
    });
  }, []));

  // Android Specific Picker Logic
  const showAndroidPicker = (currentDate, setter) => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
          setter(selectedDate);
        }
      },
      mode: 'datetime',
      is24Hour: true,
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
      };
      await repo.createAllocation(payload);
      Alert.alert("Success", "Allocation created", [{ text: "OK", onPress: () => router.push("/(tabs)/allocations/") }]);
    } catch (e) {
      Alert.alert("Conflict", "Consultant is busy at this time");
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CONSULTANT</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={form.consultantId} onValueChange={(v) => setForm({...form, consultantId: v})}>
          {consultants.map(c => <Picker.Item key={c.id} label={c.name} value={c.id} />)}
        </Picker>
      </View>

      <Text style={styles.label}>PROJECT</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={form.projectId} onValueChange={(v) => setForm({...form, projectId: v})}>
          {projects.map(p => <Picker.Item key={p.id} label={p.name} value={p.id} />)}
        </Picker>
      </View>

      <Text style={styles.label}>START TIME</Text>
      <TouchableOpacity style={styles.dateBtn} onPress={() => showAndroidPicker(startDate, setStartDate)}>
        <Text>{startDate.toLocaleString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>END TIME</Text>
      <TouchableOpacity style={styles.dateBtn} onPress={() => showAndroidPicker(endDate, setEndDate)}>
        <Text>{endDate.toLocaleString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>CREATE ALLOCATION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 11, fontWeight: 'bold', color: '#888', marginTop: 15, marginBottom: 5 },
  pickerBox: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fafafa' },
  dateBtn: { padding: 15, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 10 },
  saveBtn: { backgroundColor: '#7c3aed', padding: 18, borderRadius: 10, marginTop: 30 },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
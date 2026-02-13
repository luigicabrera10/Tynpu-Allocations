import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { ApiProjectRepository } from '../../../infrastructure/api/ApiProjectRepository';

export default function AddProject() {
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();
  const repo = new ApiProjectRepository();

  const onSubmit = async (data: any) => {
    try {
      await repo.createProject(data);
      Alert.alert("Success", "Project Created", [
        { text: "OK", onPress: () => {
          reset();
          router.push("/(tabs)/projects/");
        }}
      ]);
    } catch (e) {
      Alert.alert("Error", "Could not save project");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Project Name</Text>
      <Controller control={control} name="name" render={({ field: { onChange, value }}) => (
        <TextInput style={styles.input} placeholder="e.g. Tynpu Mobile App" onChangeText={onChange} value={value} />
      )} />
      
      <Text style={styles.label}>Description</Text>
      <Controller control={control} name="description" render={({ field: { onChange, value }}) => (
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Brief project summary..." 
          multiline 
          numberOfLines={4}
          onChangeText={onChange} 
          value={value} 
        />
      )} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Create Project</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', padding: 14, borderRadius: 8, marginBottom: 20, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#059669', padding: 18, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
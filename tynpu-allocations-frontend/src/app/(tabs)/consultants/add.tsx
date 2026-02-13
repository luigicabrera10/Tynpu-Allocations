import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ApiConsultantRepository } from '../../../infrastructure/api/ApiConsultantRepository';

export default function AddConsultant() {
  const { control, handleSubmit, reset } = useForm();
  const repo = new ApiConsultantRepository();

  const onSubmit = async (data: any) => {
    await repo.createConsultant(data);
    Alert.alert("Success", "Created");
    reset();
  };

  return (
    <View style={styles.container}>
      <Controller control={control} name="name" render={({ field: { onChange, value }}) => (
        <TextInput style={styles.input} placeholder="Name" onChangeText={onChange} value={value} />
      )} />
      <Controller control={control} name="email" render={({ field: { onChange, value }}) => (
        <TextInput style={styles.input} placeholder="Email" onChangeText={onChange} value={value} />
      )} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 6, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 6 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
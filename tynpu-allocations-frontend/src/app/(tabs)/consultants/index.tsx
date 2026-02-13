import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ApiConsultantRepository } from '../../../infrastructure/api/ApiConsultantRepository';

export default function ConsultantList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const repo = new ApiConsultantRepository();

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await repo.getConsultants(1);
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={!loading && <Text style={styles.empty}>No consultants found.</Text>}
        ListFooterComponent={loading && <ActivityIndicator color="#007AFF" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderLeftWidth: 5, borderLeftColor: '#007AFF', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  email: { color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' }
});
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ApiProjectRepository } from '../../../infrastructure/api/ApiProjectRepository';

export default function ProjectList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const repo = new ApiProjectRepository();

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await repo.getProjects(1);
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
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={!loading && <Text style={styles.empty}>No projects found.</Text>}
        ListFooterComponent={loading && <ActivityIndicator color="#059669" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderLeftWidth: 5, borderLeftColor: '#059669', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  desc: { color: '#666', marginTop: 4, fontSize: 14 },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' }
});
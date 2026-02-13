import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ApiAllocationRepository } from '../../../infrastructure/api/ApiAllocationRepository';

export default function AllocationList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const repo = new ApiAllocationRepository();

  const loadData = async () => {
    setLoading(true);
    const data = await repo.getAllocations();
    setItems(data);
    setLoading(false);
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#7c3aed" style={styles.loader} />}
      
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Allocation</Text>
            <Text style={styles.info}>ID: {item.id?.slice(0, 8)}</Text>
            <Text style={styles.info}>Consultant: {item.consultantId}</Text>
            <Text style={styles.info}>Project: {item.projectId}</Text>
          </View>
        )}
        ListEmptyComponent={!loading && <Text style={styles.empty}>No allocations found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, elevation: 2 },
  title: { fontWeight: 'bold', color: '#7c3aed', marginBottom: 5 },
  info: { fontSize: 13, color: '#444' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});
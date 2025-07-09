import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Fonts } from '../utils/fonts';

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map(label => (
        <Pressable
          key={label}
          onPress={() => onChange(label)}
          style={styles.tab}
        >
          <Text style={[styles.text, active === label && styles.active]}>
            {label}
          </Text>
          {active === label && <View style={styles.underline} />}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 16 },
  tab: { marginRight: 28, alignItems: 'center' },
  text: { fontSize: 15, color: '#9A9A9A', fontFamily: Fonts.medium },
  active: { color: '#000', fontFamily: Fonts.medium },
  underline: {
    alignSelf: 'stretch',
    height: 2,
    backgroundColor: '#000',
    marginTop: 5,
    borderRadius: 1,
  },
});

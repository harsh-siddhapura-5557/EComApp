import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { categories, displayToSlug } from '../api/dummydata';
import { Images } from '../utils/images';
import { Fonts } from '../utils/fonts';

export default function Browse({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.input}
          />
          <Image source={Images.Search} style={styles.searchIcon} />
        </View>

        <FlatList
          data={filteredCategories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                navigation.navigate('BrowseHeadphone', {
                  title: item,
                  slug: displayToSlug[item],
                })
              }
            >
              <Text style={styles.categoryText}>{item}</Text>
              <Image source={Images.Arrow} style={styles.arrow} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212429',
    fontFamily: Fonts.regular,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  categoryText: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: '#212429',
  },
  arrow: {
    width: 8,
    height: 14,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});

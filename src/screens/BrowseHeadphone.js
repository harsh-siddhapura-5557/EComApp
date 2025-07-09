import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft_Icon,
  Search_Icon,
  ArrowDown_Icon,
  Category_Icon,
} from '../utils/Svg';
import { Fonts } from '../utils/fonts';
import { getByCategory, getProducts } from '../api';
import Card from '../components/Card';

const FILTERS = [
  { id: 'categoryIcon', icon: true },
  { id: 'category', label: 'Category' },
  { id: 'brand', label: 'Brand' },
  { id: 'price', label: 'Price' },
];
export default function BrowseHeadphone({ route }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { title = 'Products', slug } = route.params ?? {};
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState('relevance');
  const cardW = useMemo(() => width / 2 - 24, [width]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      try {
        let list;
        if (slug) {
          ({ data: list } = await getByCategory(slug));
        } else {
          ({ data: list } = await getProducts());
          list = list.filter(p =>
            p.title.toLowerCase().includes(title.toLowerCase()),
          );
        }
        if (isMounted) setItems(list);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [slug, title]);

  const onFilterPress = useCallback(id => {
    console.log('Filter pressed:', id);
  }, []);

  const onSortPress = useCallback(() => {
    console.log('sort by', sorting);
  }, [sorting]);

  const renderFilter = ({ item }) => (
    <TouchableOpacity
      style={styles.chip}
      onPress={() => onFilterPress(item.id)}
    >
      {item.icon ? (
        <Category_Icon />
      ) : (
        <>
          <Text style={styles.chipText}>{item.label}</Text>
          <ArrowDown_Icon style={{ marginLeft: 6 }} />
        </>
      )}
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <Card
      item={item}
      width={cardW}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowLeft_Icon />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity onPress={() => console.log('search')}>
          <Search_Icon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={FILTERS}
        horizontal
        keyExtractor={f => f.id}
        renderItem={renderFilter}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 16 }}
      />
      <View style={styles.sortRow}>
        <Text style={styles.countText}>
          {items.length.toLocaleString('en-US')} products
        </Text>

        <TouchableOpacity style={styles.sortBtn} onPress={onSortPress}>
          <Text style={styles.sortLabel}>
            Sort by <Text style={{ fontFamily: Fonts.Bold }}>Relevance</Text>
          </Text>
          <ArrowDown_Icon style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 40 }}
          size="large"
          color="#212429"
        />
      ) : items.length ? (
        <FlatList
          data={items}
          keyExtractor={p => String(p.id)}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          renderItem={renderProduct}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      ) : (
        <Text style={styles.emptyTxt}>No products found.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 25,
  },
  headerTitle: { fontSize: 14, fontFamily: Fonts.Bold, color: '#212429' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 38,
    marginRight: 12,
    marginVertical: 10,
  },
  chipText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#212429',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  countText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#9A9A9A',
  },
  sortBtn: { flexDirection: 'row', alignItems: 'center' },
  sortLabel: { fontSize: 12, fontFamily: Fonts.medium, color: '#212429' },
  emptyTxt: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#9A9A9A',
  },
});

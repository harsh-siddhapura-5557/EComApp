import React, { useEffect, useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getProductById } from '../api';
import { formatINR } from '../utils/currency';
import {
  ArrowLeft_Icon,
  Search_Icon,
  HeartFill_Icon,
  Heart_Icon,
  Cart_Icon,
} from '../utils/Svg';
import { Fonts } from '../utils/fonts';
import FavCtx from '../context/FavContext';
import { CartCtx } from '../context/CartContext';

export default function ProductDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favourites, dispatch: favDispatch } = useContext(FavCtx);
  const { dispatch } = useContext(CartCtx);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  const handleAdd = () => {
    if (!product) return;
    dispatch({ type: 'ADD', payload: product });
    console.log('✦ Added', product.id);
    Alert.alert('Added', `${product.title} has been added to your cart.`);
  };

  const isFav = useMemo(() => {
    return favourites.some(p => p.id === product?.id);
  }, [favourites, product]);

  const toggleFav = () => {
    if (!product) return;
    favDispatch({
      type: isFav ? 'REMOVE' : 'ADD',
      payload: isFav ? product.id : product,
    });
  };

  if (loading || !product) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft_Icon />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{product.category}</Text>

        <TouchableOpacity onPress={() => Alert.alert('Search')}>
          <Search_Icon />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15 }}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.fabColumn}>
            <TouchableOpacity onPress={toggleFav} style={styles.fab}>
              {isFav ? (
                <HeartFill_Icon height={20} width={20} />
              ) : (
                <Heart_Icon height={20} width={20} />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAdd} style={styles.fab}>
              <Cart_Icon />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.price}>{formatINR(product.price)}</Text>
        <Text style={styles.name}>{product.title}</Text>
        <Text style={styles.model}>Model: WH‑1000XM4, Black</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 15,
  },
  headerTitle: { fontSize: 14, fontFamily: Fonts.Bold, color: '#212429' },
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 1 },
  fabColumn: {
    position: 'absolute',
    right: 16,
    bottom: 5,
    alignItems: 'center',
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  price: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 20,
    fontFamily: Fonts.extraBold,
    color: '#212429',
  },
  name: {
    marginTop: 4,
    marginHorizontal: 16,
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: '#212429',
  },
  model: {
    marginHorizontal: 16,
    marginVertical: 4,
    fontSize: 14,
    color: '#6D6D6D',
    fontFamily: Fonts.regular,
  },
  description: {
    marginHorizontal: 16,
    marginTop: 12,
    fontSize: 14,
    color: '#00000040',
    lineHeight: 20,
    fontFamily: Fonts.regular,
  },
  addBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: { color: '#fff', fontSize: 16, fontFamily: Fonts.semiBold },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

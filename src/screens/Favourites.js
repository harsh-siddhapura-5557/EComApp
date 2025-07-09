// src/screens/Favourites.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatINR } from '../utils/currency';
import { CartCtx } from '../context/CartContext';
import { Fonts } from '../utils/fonts';
import { Cart_Icon, Setting_Icon } from '../utils/Svg';
import FavCtx from '../context/FavContext';

export default function Favourites() {
  const navigation = useNavigation();
  const { favourites, dispatch: favDispatch } = useContext(FavCtx);
  const { dispatch: cartDispatch } = useContext(CartCtx);

  const handleAddToCart = item => {
    cartDispatch({ type: 'ADD', payload: item });
    Alert.alert('Added to Cart', `${item.title} has been added to your cart.`);
  };
  const handleRemove = item => {
    favDispatch({ type: 'REMOVE', payload: item.id });
    Alert.alert(
      'Removed',
      `${item.title} has been removed from your favourites.`,
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.header}>Favourites</Text>

      <FlatList
        data={favourites}
        keyExtractor={p => String(p.id)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              navigation.navigate('ProductDetail', { id: item.id })
            }
          >
            <View style={styles.thumbBox}>
              <Image source={{ uri: item.image }} style={styles.thumbImg} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.price}>{formatINR(item.price)}</Text>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.sub}>
                Model: WH‑1000XM4, Black
              </Text>
            </View>
            <View style={styles.actionCol}>
              <TouchableOpacity
                style={styles.cartBtn}
                onPress={() => handleAddToCart(item)}
              >
                <Cart_Icon />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleRemove(item)}>
                <Setting_Icon />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.Bold,
    marginVertical: 12,
    color: '#212429',
    marginTop: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  thumbImg: { width: 64, height: 64, resizeMode: 'contain' },
  textCol: { flex: 1 },
  price: {
    fontSize: 14,
    fontFamily: Fonts.extraBold,
    marginBottom: 2,
    color: '#212429',
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#212429',
    width: 160,
  },
  sub: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: '#6D6D6D',
    lineHeight: 12,
  },
  actionCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: { height: 1, backgroundColor: '#EEE', marginLeft: 100 },
});

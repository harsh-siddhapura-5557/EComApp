// src/screens/Cart.js
import React, { useContext, useMemo } from 'react';
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
import { CartCtx } from '../context/CartContext';
import { formatINR } from '../utils/currency';
import { Fonts } from '../utils/fonts';
import { Minus_Icon, Plus_Icon, Setting_Icon } from '../utils/Svg';
import { Images } from '../utils/images';

export default function Cart() {
  const { cart, dispatch } = useContext(CartCtx);
  const data = useMemo(
    () => Object.values(cart).filter(p => p && p.quantity > 0),
    [cart],
  );
  const total = useMemo(
    () => data.reduce((s, p) => s + p.price * p.quantity, 0),
    [data],
  );
  const inc = id => dispatch({ type: 'INC', payload: id });
  const dec = id => {
    const item = cart[id];
    if (item.quantity > 1) dispatch({ type: 'DEC', payload: id });
  };
  const del = id => dispatch({ type: 'DEL', payload: id });
  const checkout = () =>
    Alert.alert('Checkout', 'Implement payment flow here 😉');

  const payIcons = [
    Images.Paypal,
    Images.Visa,
    Images.MasterCard,
    Images.GPay,
    Images.Apple,
    Images.Amex,
  ];
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.thumbBox}>
        <Image source={{ uri: item.image }} style={styles.thumbImg} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.price}>{formatINR(item.price)}</Text>
        <Text numberOfLines={2} style={styles.name}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.sub}>
          Model: WH‑1000XM4, Black
        </Text>
      </View>
      <View style={styles.ctrlCol}>
        <TouchableOpacity
          onPress={() => del(item.id)}
          style={{ marginTop: 10 }}
        >
          <Setting_Icon />
        </TouchableOpacity>

        <View style={styles.stepper}>
          <TouchableOpacity
            onPress={() => dec(item.id)}
            style={[styles.stepBtn, item.quantity === 1 && { opacity: 0.4 }]}
          >
            <Minus_Icon />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => inc(item.id)}
            style={[styles.stepBtn, styles.stepPlus]}
          >
            <Plus_Icon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.header}>Cart</Text>

      <FlatList
        data={data}
        keyExtractor={p => String(p.id)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 16 }}>
            Your cart is empty
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 150 }}
      />
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Shipping</Text>
          <Text style={styles.value}>$0.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.label, { fontFamily: Fonts.Bold }]}>
            Total{'  '}
            <Text style={{ fontFamily: Fonts.regular, color: '#B0B5B9' }}>
              TVA included
            </Text>
          </Text>
          <Text style={[styles.value, { fontFamily: Fonts.Bold }]}>
            {formatINR(total)}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={checkout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <View style={styles.payRow}>
          {payIcons.map((src, idx) => (
            <Image
              key={idx}
              source={src}
              style={styles.payIcon}
              resizeMode="contain"
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 12,
    fontFamily: Fonts.Bold,
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
    width: 80,
    height: 88,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  thumbImg: { width: 84, height: 62, resizeMode: 'contain' },
  textCol: { flex: 1 },
  price: { fontSize: 14, fontFamily: Fonts.extraBold },
  name: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#212429',
    marginVertical: 2,
    width: 160,
  },
  sub: { fontSize: 10, fontFamily: Fonts.regular, color: '#868D94' },
  ctrlCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 72,
  },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepPlus: { backgroundColor: '#495057' },
  qty: {
    width: 24,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  separator: { height: 1, backgroundColor: '#EEE', marginLeft: 100 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { fontSize: 12, fontFamily: Fonts.medium },
  value: { fontSize: 12, fontFamily: Fonts.medium },
  checkoutBtn: {
    backgroundColor: '#212429',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontFamily: Fonts.semiBold },
  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  payIcon: { width: 54, height: 32, borderRadius: 6 },
});

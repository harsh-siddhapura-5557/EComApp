import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { CartCtx } from '../context/CartContext';
import { Images } from '../utils/images';

export default function CartTabIcon({ focused }) {
  const { cart } = useContext(CartCtx);

  const count = Object.values(cart).reduce(
    (sum, p) => sum + (typeof p === 'number' ? p : p.quantity || 0),
    0,
  );

  return (
    <View style={styles.wrapper}>
      <Image
        source={Images.Cart}
        style={[styles.icon, { tintColor: focused ? '#212429' : '#9A9A9A' }]}
      />

      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>{count}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: 28, height: 28 },
  icon: { width: 24, height: 24 },
  badge: {
    position: 'absolute',
    top: -6,
    right: -7,
    minWidth: 20,
    height: 17,
    borderRadius: 21,
    backgroundColor: '#212429',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: '700' },
});

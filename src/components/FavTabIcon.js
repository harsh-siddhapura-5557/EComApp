import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import FavCtx from '../context/FavContext';
import { Images } from '../utils/images';

export default function FavTabIcon({ focused }) {
  const { favourites } = useContext(FavCtx);
  const count = favourites.length;

  return (
    <View style={styles.wrap}>
      <Image
        source={Images.Heart}
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
  wrap: { width: 28, height: 28 },
  icon: { width: 24, height: 24 },
  badge: {
    position: 'absolute',
    top: -6,
    right: -7,
    minWidth: 20,
    height: 17,
    borderRadius: 21,
    backgroundColor: '#212429', // चाहें तो theme रंग
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: '700' },
});

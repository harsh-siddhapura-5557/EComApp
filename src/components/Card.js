import React, { useContext } from 'react';
import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { formatINR } from '../utils/currency';
import { Fonts } from '../utils/fonts';
import { Heart_Icon, HeartFill_Icon } from '../utils/Svg';
import FavCtx from '../context/FavContext';

export default function Card({ item, width, onPress }) {
  const { favourites, dispatch } = useContext(FavCtx);

  const isFav = favourites.some(p => p.id === item.id);

  const toggleFav = () => {
    dispatch({
      type: isFav ? 'REMOVE' : 'ADD',
      payload: isFav ? item.id : item,
    });
  };

  return (
    <Pressable onPress={onPress} style={[styles.card, { width }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.img}
        resizeMode="contain"
      />

      <Text style={styles.price}>{formatINR(item.price)}</Text>
      <Text numberOfLines={2} style={styles.title}>
        {item.title}
      </Text>

      <TouchableOpacity onPress={toggleFav} style={styles.fab}>
        {isFav ? <HeartFill_Icon /> : <Heart_Icon />}
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
  },
  title: {
    fontSize: 14,
    marginVertical: 6,
    color: '#222',
    fontFamily: Fonts.medium,
    lineHeight: 14,
  },
  price: {
    fontSize: 14,
    fontFamily: Fonts.extraBold,
    color: '#212429',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    top: 20,
    right: 18,
    width: 30,
    height: 30,
    borderRadius: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

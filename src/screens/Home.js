import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getProducts } from '../api';
import CategoryTabs from '../components/CategoryTabs';
import { formatINR } from '../utils/currency';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../utils/fonts';
import Card from '../components/Card';
import { Heart_Icon, HeartFill_Icon } from '../utils/Svg';
import FavCtx from '../context/FavContext';

const categories = ['All', 'Audio', 'Drones + Electronics', 'Photo + Video'];

export default function Home() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [active, setActive] = useState('All');
  const [deals, setDeals] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts();
        const list = res.data;
        setDeals(list.slice(0, 3));
        setRecommended(list.slice(3, 15));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const gridCardW = width / 2 - 14;
  const horizontalMargin = 20;
  const slideWidth = 280;

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = slideWidth + horizontalMargin * 2;
  const itemHeight = 100;
  const { favourites, dispatch } = useContext(FavCtx);

  const renderDeal = ({ item }) => {
    const isFav = favourites.some(p => p.id === item.id);
    const toggleFav = () =>
      dispatch({
        type: isFav ? 'REMOVE' : 'ADD',
        payload: isFav ? item.id : item,
      });

    return (
      <Pressable
        style={[styles.dealCard]}
        onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.dealImg}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.micro}>Microphones</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
              gap: 5,
            }}
          >
            <Text style={styles.dealPrice}>{formatINR(item.price * 0.7)}</Text>
            <Text style={styles.oldPrice}>{formatINR(item.price)}</Text>
          </View>
          <Text numberOfLines={2} style={styles.dealName}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleFav} style={styles.fab}>
          {isFav ? <HeartFill_Icon /> : <Heart_Icon />}
        </TouchableOpacity>
      </Pressable>
    );
  };

  const Header = (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <Text style={styles.hello}>Hello Michael</Text>
      <CategoryTabs
        categories={categories}
        active={active}
        onChange={setActive}
      />
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Deals of the day</Text>
        <Pressable onPress={() => navigation.navigate('')}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      {deals.length > 0 && (
        <>
          <Carousel
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            width={width}
            // width={dealCardW}
            height={160}
            data={deals}
            loop
            snapEnabled
            style={{ alignSelf: 'center' }}
            onSnapToItem={index => setActiveIndex(index)}
            windowSize={1}
            renderItem={renderDeal}
          />
          <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
            <Pagination
              data={deals}
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}
              dotContainerStyle={{ marginHorizontal: 2 }}
              inactiveDotStyle={styles.InactiveDot}
              dotsLength={deals.length}
              activeDotIndex={activeIndex}
              dotColor="#212429"
              inactiveDotColor="#C0C0C0"
              inactiveDotScale={1.2}
              inactiveDotOpacity={1}
              activeDotColor="#000"
              activeDotWidth={16}
              activeDotHeight={6}
            />
          </View>
        </>
      )}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
        Recommended for you
      </Text>
    </SafeAreaView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <FlatList
        data={recommended}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
        renderItem={({ item }) => (
          <Card
            item={item}
            width={gridCardW}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                id: item.id,
                item,
              })
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hello: {
    fontSize: 32,
    fontFamily: Fonts.semiBold,
    paddingHorizontal: 16,
    marginBottom: 14,
    marginTop: 14,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: '#212429',
    paddingHorizontal: 16,
  },
  seeAll: { color: '#9A9A9A', fontSize: 14, fontFamily: Fonts.medium },
  dealCard: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  dealImg: { width: 120, height: 120, marginRight: 12 },
  micro: {
    fontSize: 12,
    color: '#9A9A9A',
    fontFamily: Fonts.semiBold,
    marginBottom: 4,
  },
  dealPrice: { fontSize: 18, fontFamily: Fonts.extraBold, color: '#FA254C' },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#C0C0C0',
    fontFamily: Fonts.regular,
  },
  dealName: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#000',
    marginTop: 2,
  },
  dot: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#C0C0C0',
  },
  activeDot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000',
    marginHorizontal: 3,
  },
  InactiveDot: {
    width: 10,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000',
    marginHorizontal: 3,
  },
  fab: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

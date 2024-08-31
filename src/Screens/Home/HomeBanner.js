import React, {useState} from "react"; 
import { View, Text, ImageBackground, Pressable, Dimensions } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { magazineBanner } from "../../assets/magazineData/magazineData";

const {width} = Dimensions.get('window');

const HomeBanner = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const randomBannerId = Math.floor(Math.random() * 4);
  const handleMagazineInfo = (id) => {
    navigation.navigate("MagazineInfo", { id: id + 1 });
  };


  
  return (
    <View>
      {isLoading && 
        <View style={{width:width, height: width*1.3, backgroundColor: colors.Gray01, paddingLeft:24, paddingVertical:31}}>
          <View style={{flex:1}}/>
          <View style={{height: 28, width: '45%', backgroundColor:colors.Gray03, borderRadius:10}}/>
          <View style={{height:10}}/>
          <View style={{height: 28, width: '65%', backgroundColor:colors.Gray03, borderRadius:10}}/>
        </View>
      }
      <Pressable style={{display: isLoading ? 'none' : 'flex'}} onPress={() => handleMagazineInfo(randomBannerId)}>
        <View style={{ 
          width:width, height: width*1.3, 
          borderBottomRightRadius: 40,
          overflow: 'hidden'}}>
          <ImageBackground
            source={{ uri: magazineBanner[randomBannerId].imagePath }}
            style={{ flex: 1 }}
            imageStyle={{ borderBottomRightRadius: 40 }}
            onLoadEnd={() => setIsLoading(false)} 
          >
            <LinearGradient 
              style={{ flex: 1, paddingVertical: 31, paddingLeft: 24 }} 
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
            >
              <View style={{ flex: 1 }} />
              <Text style={[textStyles.H1, { color: colors.white }]}>
                {magazineBanner[randomBannerId].title}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </View>
      </Pressable>
    </View>
  );
}

export default HomeBanner;
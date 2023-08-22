
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";
// import { useNavigation } from "@react-navigation/native";

const CategoryListPage = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  // const navigation = useNavigation();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://services.mi.org.sa/api/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
        console.log("88888", data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryCard = ({ item }) => {
  
    
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetailsScreen', item)}>
       
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
   
    <View style={styles.container}>
     
      <View style={styles.header}>
        <View style={{ width: 30 }}>
        
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
           
          </TouchableOpacity>
         
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>العروض </Text>
        </View>
      </View>
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          style={styles.list}
        />
      )}

    
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(18,53,90,0.1)',
  },
   imageBackground: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    borderBottomColor: "#ecf0f1",
    borderBottomWidth: 1,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 16,
  },
  list: {
    flex: 1,
    alignSelf: "stretch",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    flex: 1,
    aspectRatio: 1,
    maxWidth: "45%",
  },
  image: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CategoryListPage;

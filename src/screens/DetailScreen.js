import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import api from '../services/api';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMealDetail() {
      try {
        const response = await api.get(`lookup.php?i=${id}`);
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getMealDetail();
  }, [id]);

// loop para pegar os 20 ingredientes possíveis da API
  const renderIngredients = () => {
    if (!meal) return null;
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(
          <View key={i} style={styles.ingredientRow}>
            <View style={styles.bullet} />
            <Text style={styles.ingredientText}>
              <Text style={styles.measure}>{measure}</Text> {ingredient}
            </Text>
          </View>
        );
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F3E5F5' }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>{'< Voltar'}</Text>
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
             <Text style={styles.categoryBadge}>{meal.strCategory}</Text>
             <Text style={styles.title}>{meal.strMeal}</Text>
             <Text style={styles.area}>{meal.strArea}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            <View style={styles.separator} />
            {renderIngredients()}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modo de Preparo</Text>
            <View style={styles.separator} />
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3E5F5' },
  
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 350, resizeMode: 'cover' },
  
  backButton: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    backgroundColor: '#4A148C', 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 20,
    elevation: 5
  },
  backText: { color: '#fff', fontWeight: 'bold' },

  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', 
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  categoryBadge: { 
    color: '#FF6F00',
    fontWeight: 'bold', 
    fontSize: 14, 
    textTransform: 'uppercase',
    marginBottom: 5 
  },
  area: { color: '#ddd', fontSize: 16 },

  content: { padding: 20 },
  
  section: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    padding: 20, 
    marginBottom: 20,
    elevation: 2 
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#4A148C' 
  },
  separator: {
    height: 3,
    width: 40,
    backgroundColor: '#FF6F00',
    marginTop: 5,
    marginBottom: 15
  },
  
  ingredientRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bullet: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF6F00', marginRight: 10 },
  ingredientText: { fontSize: 16, color: '#444' },
  measure: { fontWeight: 'bold', color: '#4A148C' },

  instructions: { fontSize: 16, lineHeight: 26, color: '#444', textAlign: 'justify' }
});
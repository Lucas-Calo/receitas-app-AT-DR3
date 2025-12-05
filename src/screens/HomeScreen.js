import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [activeCategory, setActiveCategory] = useState('Seafood'); 
  const [loading, setLoading] = useState(false);

  // buscando as categorias ao carregar a tela
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get('categories.php');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    }
    getCategories();
    fetchRecipesByFilter('Seafood'); 
  }, []);

  // função para buscar por categoria
  const fetchRecipesByFilter = async (category) => {
    setLoading(true);
    setActiveCategory(category);
    setSearch('');
    try {
      const response = await api.get(`filter.php?c=${category}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // função para buscar por nome
  const fetchRecipesBySearch = async (query) => {
    if (!query) return;
    setLoading(true);
    setActiveCategory('');
    try {
      const response = await api.get(`search.php?s=${query}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // debounce da busca
  useEffect(() => {
    if (search === '') return;
    const delayDebounceFn = setTimeout(() => {
      fetchRecipesBySearch(search);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // renderiza cada botão de categoria
  const renderCategoryItem = ({ item }) => {
    const isActive = item.strCategory === activeCategory;
    return (
      <TouchableOpacity 
        style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
        onPress={() => fetchRecipesByFilter(item.strCategory)}
      >
        <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
          {item.strCategory}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      
      <View style={styles.header}>
        <Text style={styles.title}>App de Receitas 👨🏼‍🍳🍣</Text>
        <Text style={styles.subtitle}>👩🏻‍🍳 O que vamos cozinhar hoje?</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar receita (ex: Arrabiata)..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <FlatList 
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.idCategory}
            renderItem={renderCategoryItem}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6F00" /> 
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <RecipeCard 
              item={item} 
              onPress={() => navigation.navigate('Details', { id: item.idMeal })} 
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma foi receita encontrada.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E5F5' },
  
  header: { 
    padding: 20, 
    backgroundColor: '#4A148C', 
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  subtitle: { color: '#E1BEE7', marginBottom: 15 },
  
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  input: { fontSize: 16, color: '#333' },

  // estilos das categorias
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  categoryButtonActive: {
    backgroundColor: '#FF6F00',
    borderColor: '#FF6F00',
  },
  categoryText: {
    color: '#E1BEE7', 
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFF', 
    fontWeight: 'bold',
  },
  
  list: { padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#4A148C', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 20, color: '#666', fontSize: 16 }
});
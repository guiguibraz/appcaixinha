import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CaixinhaDeNatal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.botao, { backgroundColor: '#FFC080' }]} onPress={() => navigation.navigate('Anotações')}>
        <Text style={styles.textoBotao}>2024</Text>
      </TouchableOpacity>
    </View>
  );
};

const Anotações = ({ navigation }) => {
  const [anotações, setAnotações] = useState([
    { id: 1, nome: 'João Silva', valor: 100.00 },
    { id: 2, nome: 'Maria Eduarda', valor: 200.00 },
    { id: 3, nome: 'Vinicius Almeida', valor: 50.00 },
    // Adicione mais anotações aqui
  ]);

  const [novoNome, setNovoNome] = useState('');
  const [novoValor, setNovoValor] = useState('');

  const handleAdicionarContribuinte = () => {
    if (novoNome && novoValor) {
      const novaAnotação = {
        id: anotações.length + 1,
        nome: novoNome,
        valor: parseFloat(novoValor),
      };
      setAnotações([...anotações, novaAnotação]);
      setNovoNome('');
      setNovoValor('');
    }
  };

  const valorTotal = anotações.reduce((acc, current) => acc + current.valor, 0);
  const valorDividido = valorTotal / 5;

  return (
    <View style={styles.container}>
      <FlatList
        data={anotações}
        renderItem={({ item }) => (
          <View style={styles.annotationContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.addContribuinteContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={novoNome}
          onChangeText={(text) => setNovoNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          value={novoValor}
          onChangeText={(text) => setNovoValor(text)}
          keyboardType="numeric"
        />
        <Button title="Adicionar Contribuinte" onPress={handleAdicionarContribuinte} />
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: R$ {valorTotal.toFixed(2)}</Text>
        <Text style={styles.valorDividido}>R$ {valorDividido.toFixed(2)} para cada funcionário</Text>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Caixinha de Natal" component={CaixinhaDeNatal} />
        <Stack.Screen name="Anotações" component={Anotações} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  annotationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 16,
    color: '#666',
  },
  addContribuinteContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  totalContainer: {
    padding: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  valorDividido: {
    fontSize: 16,
    color: '#666',
  },
  botao: {
    padding: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  valorDividido: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;
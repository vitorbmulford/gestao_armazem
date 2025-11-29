// export const initialIngredients = [];

import { Ingredient, Recipe, Week } from "../contexts/AppContext";

export const initialIngredients: Ingredient[] = [
  // CEREAIS E GRÃOS
  { id: 'arr', name: 'Arroz Agulhinha', price: 5.50, unit: 'kg', yield: 2.5, category: 'grain' }, 
  { id: 'feij', name: 'Feijão Carioca', price: 7.50, unit: 'kg', yield: 2.5, category: 'grain' },
  { id: 'feij_pt', name: 'Feijão Preto', price: 8.90, unit: 'kg', yield: 2.5, category: 'grain' },
  { id: 'feij_frade', name: 'Feijão Frade', price: 9.50, unit: 'kg', yield: 2.5, category: 'grain' },
  { id: 'feij_branco', name: 'Feijão Branco', price: 10.00, unit: 'kg', yield: 2.5, category: 'grain' },
  { id: 'lentilha', name: 'Lentilha', price: 12.00, unit: 'kg', yield: 2.5, category: 'grain' },
  { id: 'macarrao', name: 'Macarrão', price: 5.80, unit: 'kg', yield: 2.2, category: 'grain' },
  { id: 'trigo_kibe', name: 'Trigo para Kibe', price: 8.00, unit: 'kg', yield: 2.5, category: 'grain' },
  { id: 'canjiquinha', name: 'Canjiquinha/Xerém', price: 6.00, unit: 'kg', yield: 3.0, category: 'grain' },
  
  // PROTEÍNAS - Frango
  { id: 'fran_file', name: 'Filé de Frango', price: 21.90, unit: 'kg', yield: 0.75, category: 'protein' }, 
  { id: 'fran_coxa', name: 'Coxa e Sobrecoxa', price: 13.50, unit: 'kg', yield: 0.6, category: 'protein' }, 
  { id: 'fran_sobre_des', name: 'Sobrecoxa Desossada', price: 18.90, unit: 'kg', yield: 0.8, category: 'protein' },
  { id: 'fran_passarinho', name: 'Frango à Passarinho', price: 15.00, unit: 'kg', yield: 0.65, category: 'protein' },
  { id: 'coxinha_asa', name: 'Coxinha da Asa', price: 17.50, unit: 'kg', yield: 0.65, category: 'protein' },
  { id: 'moela', name: 'Moela de Frango', price: 11.00, unit: 'kg', yield: 0.7, category: 'protein' },

  // PROTEÍNAS - Bovina
  { id: 'acem', name: 'Acém (Moer/Panela)', price: 29.90, unit: 'kg', yield: 0.8, category: 'protein' },
  { id: 'coxao_mole', name: 'Coxão Mole', price: 36.90, unit: 'kg', yield: 0.9, category: 'protein' },
  { id: 'costela_bovina', name: 'Costela Bovina', price: 22.50, unit: 'kg', yield: 0.6, category: 'protein' },
  { id: 'cupim', name: 'Cupim', price: 29.90, unit: 'kg', yield: 0.7, category: 'protein' },
  { id: 'lagarto', name: 'Lagarto', price: 33.90, unit: 'kg', yield: 0.8, category: 'protein' },
  { id: 'musculo', name: 'Músculo Bovino', price: 27.90, unit: 'kg', yield: 0.85, category: 'protein' },
  { id: 'ossobuco', name: 'Ossobuco', price: 26.90, unit: 'kg', yield: 0.55, category: 'protein' },
  { id: 'fig', name: 'Fígado Bovino', price: 16.50, unit: 'kg', yield: 0.9, category: 'protein' },
  { id: 'carne_seca', name: 'Carne Seca', price: 39.90, unit: 'kg', yield: 0.9, category: 'protein' },
  { id: 'bucho', name: 'Bucho Bovino', price: 14.90, unit: 'kg', yield: 0.65, category: 'protein' },

  // PROTEÍNAS - Suína
  { id: 'bisteca', name: 'Bisteca Suína', price: 19.90, unit: 'kg', yield: 0.75, category: 'protein' },
  { id: 'pernil', name: 'Pernil Suíno', price: 16.90, unit: 'kg', yield: 0.6, category: 'protein' },
  { id: 'lombo', name: 'Lombo Suíno', price: 24.90, unit: 'kg', yield: 0.85, category: 'protein' },
  { id: 'costela_suina', name: 'Costelinha Suína', price: 25.90, unit: 'kg', yield: 0.65, category: 'protein' },
  { id: 'ling', name: 'Linguiça Toscana', price: 18.90, unit: 'kg', yield: 0.9, category: 'protein' },
  { id: 'ling_frango', name: 'Linguiça de Frango', price: 19.90, unit: 'kg', yield: 0.9, category: 'protein' },
  { id: 'ling_calab', name: 'Linguiça Calabresa', price: 26.90, unit: 'kg', yield: 1.0, category: 'protein' },
  { id: 'bacon', name: 'Bacon', price: 34.90, unit: 'kg', yield: 0.8, category: 'protein' },
  { id: 'salsicha', name: 'Salsicha', price: 11.90, unit: 'kg', yield: 1.0, category: 'protein' },
  { id: 'kit_feijoada', name: 'Kit Feijoada', price: 28.90, unit: 'kg', yield: 0.9, category: 'protein' },

  // PROTEÍNAS - Peixe
  { id: 'peixe_panga', name: 'Filé de Panga', price: 23.90, unit: 'kg', yield: 0.8, category: 'protein' },
  { id: 'peixe_merluza', name: 'Filé de Merluza', price: 28.90, unit: 'kg', yield: 0.8, category: 'protein' },
  { id: 'peixe_tilapia', name: 'Filé de Tilápia', price: 38.90, unit: 'kg', yield: 0.85, category: 'protein' },
  { id: 'cacao', name: 'Posta de Cação', price: 33.90, unit: 'kg', yield: 0.7, category: 'protein' },
  { id: 'sardinha', name: 'Sardinha', price: 15.90, unit: 'kg', yield: 0.9, category: 'protein' },
  { id: 'atum', name: 'Atum (Lata 170g)', price: 8.50, unit: 'un', yield: 1.0, category: 'protein' },
  { id: 'ovos', name: 'Ovos (Brancos)', price: 0.65, unit: 'un', yield: 1, category: 'protein' },

  // HORTIFRUTI
  { id: 'batata', name: 'Batata Inglesa', price: 5.50, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'cenoura', name: 'Cenoura', price: 4.90, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'cebola', name: 'Cebola', price: 4.50, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'alho', name: 'Alho (Descascado)', price: 28.00, unit: 'kg', yield: 1.0, category: 'veg' },
  { id: 'tomate', name: 'Tomate', price: 6.90, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'alface', name: 'Alface Crespa', price: 4.50, unit: 'kg', yield: 0.85, category: 'veg' },
  { id: 'pimentao', name: 'Pimentão Verde', price: 7.90, unit: 'kg', yield: 0.85, category: 'veg' },
  { id: 'couve', name: 'Couve Manteiga', price: 4.50, unit: 'mç', yield: 0.8, category: 'veg' },
  { id: 'repolho', name: 'Repolho Verde', price: 3.90, unit: 'kg', yield: 0.8, category: 'veg' },
  { id: 'abobrinha', name: 'Abobrinha', price: 5.90, unit: 'kg', yield: 0.8, category: 'veg' },
  { id: 'chuchu', name: 'Chuchu', price: 3.50, unit: 'kg', yield: 0.8, category: 'veg' },
  { id: 'vagem', name: 'Vagem', price: 14.00, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'mandioca', name: 'Mandioca/Aipim', price: 4.50, unit: 'kg', yield: 0.8, category: 'veg' },
  { id: 'mandioquinha', name: 'Mandioquinha', price: 12.00, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'batata_doce', name: 'Batata Doce', price: 4.90, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'quiabo', name: 'Quiabo', price: 9.90, unit: 'kg', yield: 0.9, category: 'veg' },
  { id: 'abacaxi', name: 'Abacaxi (Pérola)', price: 8.00, unit: 'un', yield: 0.6, category: 'fruit' },
  { id: 'limao', name: 'Limão Taiti', price: 4.90, unit: 'kg', yield: 1.0, category: 'fruit' },
  { id: 'laranja', name: 'Laranja', price: 3.50, unit: 'kg', yield: 0.7, category: 'fruit' },
  { id: 'banana', name: 'Banana', price: 5.90, unit: 'kg', yield: 0.7, category: 'fruit' },
  { id: 'cheiro_verde', name: 'Cheiro Verde', price: 3.50, unit: 'mç', yield: 1.0, category: 'veg' },
  { id: 'leg_div', name: 'Outros Legumes', price: 6.00, unit: 'kg', yield: 0.8, category: 'veg' },
  
  // MERCEARIA
  { id: 'oleo', name: 'Óleo de Soja', price: 6.90, unit: 'L', yield: 1, category: 'misc' },
  { id: 'sal', name: 'Sal Refinado', price: 2.50, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'extrato', name: 'Extrato de Tomate', price: 16.00, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'creme_leite', name: 'Creme de Leite', price: 15.00, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'leite_coco', name: 'Leite de Coco', price: 22.00, unit: 'L', yield: 1, category: 'misc' },
  { id: 'batata_palha', name: 'Batata Palha', price: 38.00, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'maionese', name: 'Maionese', price: 14.00, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'requeijao', name: 'Requeijão Culinário', price: 28.00, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'queijo_ralado', name: 'Queijo Ralado', price: 45.00, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'milho', name: 'Milho Verde (Lata)', price: 11.00, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'fuba', name: 'Fubá/Farinha Milho', price: 6.50, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'far_mandioca', name: 'Farinha Mandioca', price: 8.90, unit: 'kg', yield: 1, category: 'misc' },
  { id: 'temp', name: 'Temperos Secos (Mix)', price: 0.30, unit: 'porção', yield: 1, category: 'misc' },

  // OPERACIONAL
  { id: 'emb', name: 'Embalagem + Tampa', price: 1.25, unit: 'un', yield: 1, category: 'ops' },
  { id: 'ope', name: 'Custo Operacional', price: 0, unit: 'un', yield: 1, category: 'ops' },
];

export const initialRecipes: Recipe[] = [
  // Bovina
  { id: 1, category: 'bovina', name: "Carne de Panela", components: [{ id: 'acem', qty: 0.150 }, { id: 'batata', qty: 0.050 }, { id: 'cenoura', qty: 0.050 }], desc: "Acém com legumes" },
  { id: 2, category: 'bovina', name: "Bife Acebolado", components: [{ id: 'coxao_mole', qty: 0.150 }, { id: 'cebola', qty: 0.040 }], desc: "Bife, Cebola" },
  { id: 3, category: 'bovina', name: "Picadinho", components: [{ id: 'acem', qty: 0.150 }, { id: 'leg_div', qty: 0.080 }], desc: "Acém picado, Legumes" },
  { id: 4, category: 'bovina', name: "Carne Moída c/ Batata", components: [{ id: 'acem', qty: 0.150 }, { id: 'batata', qty: 0.080 }], desc: "Moída, Batata" },
  { id: 5, category: 'bovina', name: "Strogonoff Carne", components: [{ id: 'acem', qty: 0.150 }, { id: 'creme_leite', qty: 0.050 }, { id: 'batata_palha', qty: 0.030 }], desc: "Tiras, Creme, Batata Palha" },
  { id: 6, category: 'bovina', name: "Bife à Rolê", components: [{ id: 'coxao_mole', qty: 0.150 }, { id: 'cenoura', qty: 0.020 }, { id: 'bacon', qty: 0.010 }], desc: "Bife recheado" },
  { id: 7, category: 'bovina', name: "Carne Louca", components: [{ id: 'acem', qty: 0.150 }, { id: 'pimentao', qty: 0.020 }, { id: 'cebola', qty: 0.020 }], desc: "Desfiada, Pimentões" },
  { id: 8, category: 'bovina', name: "Iscas de Fígado", components: [{ id: 'fig', qty: 0.160 }, { id: 'cebola', qty: 0.050 }], desc: "Fígado, Cebola" },
  { id: 9, category: 'bovina', name: "Vaca Atolada", components: [{ id: 'costela_bovina', qty: 0.200 }, { id: 'mandioca', qty: 0.150 }], desc: "Costela, Mandioca" },
  { id: 10, category: 'bovina', name: "Chambaril (Ossobuco)", components: [{ id: 'ossobuco', qty: 0.250 }, { id: 'far_mandioca', qty: 0.040 }, { id: 'couve', qty: 0.050 }], desc: "Ossobuco, Pirão" },
  { id: 13, category: 'bovina', name: "Lagarto Recheado", components: [{ id: 'lagarto', qty: 0.150 }, { id: 'ling_calab', qty: 0.020 }], desc: "Lagarto, Calabresa" },
  { id: 14, category: 'bovina', name: "Bife à Parmegiana", components: [{ id: 'coxao_mole', qty: 0.140 }, { id: 'queijo_ralado', qty: 0.030 }, { id: 'extrato', qty: 0.040 }], desc: "Bife, Queijo, Molho" },
  { id: 15, category: 'bovina', name: "Músculo com Batata", components: [{ id: 'musculo', qty: 0.180 }, { id: 'batata', qty: 0.120 }], desc: "Músculo, Batata" },
  { id: 16, category: 'bovina', name: "Rocambole de Carne", components: [{ id: 'acem', qty: 0.150 }, { id: 'queijo_ralado', qty: 0.020 }], desc: "Carne moída, recheio" },
  { id: 17, category: 'bovina', name: "Carne de Sol Acebolada", components: [{ id: 'carne_seca', qty: 0.150 }, { id: 'cebola', qty: 0.050 }], desc: "Carne Sol, Cebola" },
  { id: 18, category: 'bovina', name: "Almôndegas ao Sugo", components: [{ id: 'acem', qty: 0.120 }, { id: 'extrato', qty: 0.030 }], desc: "Moída, Molho" },
  { id: 90, category: 'bovina', name: "Escondidinho de Carne", components: [{ id: 'mandioca', qty: 0.200 }, { id: 'acem', qty: 0.100 }, { id: 'queijo_ralado', qty: 0.020 }], desc: "Mandioca, Carne moída" },
  { id: 91, category: 'bovina', name: "Kibe Assado", components: [{ id: 'trigo_kibe', qty: 0.080 }, { id: 'acem', qty: 0.080 }, { id: 'queijo_ralado', qty: 0.020 }], desc: "Trigo, Carne, Queijo" },
  { id: 92, category: 'bovina', name: "Carne Moída c/ Abóbora", components: [{ id: 'acem', qty: 0.150 }, { id: 'leg_div', qty: 0.100 }], desc: "Moída, Abóbora" },
  { id: 93, category: 'bovina', name: "Barreado", components: [{ id: 'acem', qty: 0.200 }, { id: 'far_mandioca', qty: 0.050 }, { id: 'bacon', qty: 0.020 }], desc: "Carne desfiada, Pirão" },

  // Frango
  { id: 19, category: 'frango', name: "Filé de Frango Grelhado", components: [{ id: 'fran_file', qty: 0.150 }], desc: "Filé grelhado" },
  { id: 20, category: 'frango', name: "Frango Xadrez", components: [{ id: 'fran_file', qty: 0.150 }, { id: 'pimentao', qty: 0.040 }, { id: 'cebola', qty: 0.030 }], desc: "Cubos, Pimentões" },
  { id: 21, category: 'frango', name: "Coxa Assada", components: [{ id: 'fran_coxa', qty: 0.220 }, { id: 'batata', qty: 0.050 }], desc: "Com osso, Batatas" },
  { id: 22, category: 'frango', name: "Strogonoff de Frango", components: [{ id: 'fran_file', qty: 0.150 }, { id: 'creme_leite', qty: 0.050 }, { id: 'batata_palha', qty: 0.030 }], desc: "Filé, Creme" },
  { id: 23, category: 'frango', name: "Frango Empanado", components: [{ id: 'fran_file', qty: 0.150 }, { id: 'fuba', qty: 0.020 }], desc: "Milanesa" },
  { id: 24, category: 'frango', name: "Frango com Quiabo", components: [{ id: 'fran_coxa', qty: 0.200 }, { id: 'quiabo', qty: 0.080 }, { id: 'fuba', qty: 0.060 }], desc: "Pedaços, Quiabo, Angu" },
  { id: 25, category: 'frango', name: "Salpicão de Frango", components: [{ id: 'fran_file', qty: 0.120 }, { id: 'maionese', qty: 0.040 }, { id: 'cenoura', qty: 0.030 }, { id: 'batata_palha', qty: 0.030 }], desc: "Desfiado, Maionese" },
  { id: 26, category: 'frango', name: "Fricassê de Frango", components: [{ id: 'fran_file', qty: 0.120 }, { id: 'milho', qty: 0.050 }, { id: 'requeijao', qty: 0.030 }, { id: 'batata_palha', qty: 0.030 }], desc: "Creme milho, Requeijão" },
  { id: 28, category: 'frango', name: "Coxinha da Asa BBQ", components: [{ id: 'coxinha_asa', qty: 0.220 }], desc: "Drumet, Molho BBQ" },
  { id: 29, category: 'frango', name: "Frango Parmegiana", components: [{ id: 'fran_file', qty: 0.150 }, { id: 'queijo_ralado', qty: 0.030 }, { id: 'extrato', qty: 0.040 }], desc: "Empanado, Queijo, Molho" },
  { id: 30, category: 'frango', name: "Filé ao Limão", components: [{ id: 'fran_file', qty: 0.150 }, { id: 'limao', qty: 0.020 }], desc: "Grelhado limão" },
  { id: 31, category: 'frango', name: "Frango à Passarinho", components: [{ id: 'fran_passarinho', qty: 0.250 }, { id: 'alho', qty: 0.010 }], desc: "Frito alho" },
  { id: 32, category: 'frango', name: "Frango ao Curry", components: [{ id: 'fran_file', qty: 0.150 }], desc: "Cubos curry" },
  { id: 33, category: 'frango', name: "Sobrecoxa Assada", components: [{ id: 'fran_sobre_des', qty: 0.180 }], desc: "Assada" },
  { id: 34, category: 'frango', name: "Filé à Rolê", components: [{ id: 'fran_file', qty: 0.150 }, { id: 'cenoura', qty: 0.030 }], desc: "Recheado" },
  { id: 94, category: 'frango', name: "Frango Assado c/ Maionese", components: [{ id: 'fran_coxa', qty: 0.200 }, { id: 'maionese', qty: 0.030 }], desc: "Assado maionese" },
  { id: 95, category: 'frango', name: "Frango ao Molho Laranja", components: [{ id: 'fran_file', qty: 0.150 }, { id: 'laranja', qty: 0.050 }], desc: "Molho cítrico" },
  { id: 96, category: 'frango', name: "Frango Grelhado Mostarda", components: [{ id: 'fran_file', qty: 0.150 }], desc: "Molho mostarda mel" },
  { id: 97, category: 'frango', name: "Coxa ao Molho Laranja", components: [{ id: 'fran_coxa', qty: 0.200 }, { id: 'laranja', qty: 0.050 }], desc: "Assada cítrica" },

  // Peixe
  { id: 38, category: 'peixe', name: "Filé de Peixe Frito", components: [{ id: 'peixe_merluza', qty: 0.150 }, { id: 'fuba', qty: 0.020 }], desc: "Empanado" },
  { id: 39, category: 'peixe', name: "Moqueca de Peixe", components: [{ id: 'cacao', qty: 0.150 }, { id: 'leite_coco', qty: 0.040 }], desc: "Cação, Leite coco" },
  { id: 40, category: 'peixe', name: "Moqueca de Ovo", components: [{ id: 'ovos', qty: 2.000 }, { id: 'leite_coco', qty: 0.030 }], desc: "Ovos, Molho moqueca" },
  { id: 42, category: 'peixe', name: "Sardinha Frita", components: [{ id: 'sardinha', qty: 0.200 }, { id: 'fuba', qty: 0.020 }], desc: "Sardinha, Fubá" },
  { id: 46, category: 'peixe', name: "Peixe Ensopado", components: [{ id: 'peixe_panga', qty: 0.150 }, { id: 'pimentao', qty: 0.020 }], desc: "Molho, Pimentões" },
  { id: 48, category: 'peixe', name: "Peixe à Dorê", components: [{ id: 'peixe_panga', qty: 0.150 }, { id: 'ovos', qty: 0.500 }], desc: "Filé, Ovo/Farinha" },
  { id: 98, category: 'peixe', name: "Filé ao Molho de Coco", components: [{ id: 'peixe_panga', qty: 0.150 }, { id: 'leite_coco', qty: 0.040 }], desc: "Molho branco coco" },
  { id: 99, category: 'peixe', name: "Moqueca Banana da Terra", components: [{ id: 'leg_div', qty: 0.150 }, { id: 'leite_coco', qty: 0.040 }], desc: "Vegetariana" },

  // Porco
  { id: 50, category: 'porco', name: "Bisteca Grelhada", components: [{ id: 'bisteca', qty: 0.160 }], desc: "Bisteca" },
  { id: 51, category: 'porco', name: "Lombo Assado", components: [{ id: 'lombo', qty: 0.150 }], desc: "Fatiado" },
  { id: 52, category: 'porco', name: "Pernil Acebolado", components: [{ id: 'pernil', qty: 0.150 }, { id: 'cebola', qty: 0.050 }], desc: "Desfiado" },
  { id: 53, category: 'porco', name: "Costelinha Frita", components: [{ id: 'costela_suina', qty: 0.220 }], desc: "Costela" },
  { id: 54, category: 'porco', name: "Linguiça Acebolada", components: [{ id: 'ling', qty: 0.150 }, { id: 'cebola', qty: 0.050 }], desc: "Toscana, Cebola" },
  { id: 55, category: 'porco', name: "Feijoada Completa", components: [{ id: 'kit_feijoada', qty: 0.200 }, { id: 'couve', qty: 0.050 }, { id: 'far_mandioca', qty: 0.030 }, { id: 'laranja', qty: 0.050 }], desc: "Carnes, Couve, Farofa, Laranja" },
  { id: 56, category: 'porco', name: "Porco com Repolho", components: [{ id: 'pernil', qty: 0.150 }, { id: 'repolho', qty: 0.100 }], desc: "Cubos, Repolho" },
  { id: 57, category: 'porco', name: "Lombo Agridoce", components: [{ id: 'lombo', qty: 0.150 }, { id: 'abacaxi', qty: 0.050 }], desc: "Cubos, Abacaxi" },
  { id: 58, category: 'porco', name: "Almôndegas de Porco", components: [{ id: 'pernil', qty: 0.150 }, { id: 'extrato', qty: 0.030 }], desc: "Moída suína, Molho" },
  { id: 60, category: 'porco', name: "Linguiça Assada", components: [{ id: 'ling', qty: 0.150 }, { id: 'batata', qty: 0.050 }], desc: "Linguiça, Batata" },
  { id: 63, category: 'porco', name: "Bisteca Milanesa", components: [{ id: 'bisteca', qty: 0.150 }, { id: 'fuba', qty: 0.020 }], desc: "Empanada" },
  { id: 100, category: 'porco', name: "Bisteca na Pressão", components: [{ id: 'bisteca', qty: 0.160 }], desc: "Cozida macia" },
  { id: 101, category: 'porco', name: "Lombo ao Limão", components: [{ id: 'lombo', qty: 0.150 }, { id: 'limao', qty: 0.020 }], desc: "Molho limão" },
  { id: 102, category: 'porco', name: "Linguiça c/ Lentilha", components: [{ id: 'ling', qty: 0.100 }, { id: 'lentilha', qty: 0.080 }], desc: "Ensopado" },
  { id: 103, category: 'porco', name: "Linguiça ao Molho Cerveja", components: [{ id: 'ling', qty: 0.150 }], desc: "Molho especial" },

  // Únicos
  { id: 65, category: 'unicos', name: "Arroz de Forno", components: [{ id: 'ling', qty: 0.050 }, { id: 'fran_file', qty: 0.050 }, { id: 'queijo_ralado', qty: 0.020 }], desc: "Mix sobras" },
  { id: 69, category: 'unicos', name: "Lasanha Bolonhesa", components: [{ id: 'acem', qty: 0.100 }, { id: 'macarrao', qty: 0.080 }, { id: 'queijo_ralado', qty: 0.030 }], desc: "Massa, Carne" },
  { id: 71, category: 'unicos', name: "Panqueca Carne", components: [{ id: 'acem', qty: 0.100 }, { id: 'fuba', qty: 0.030 }], desc: "2 un, Molho" },
  { id: 72, category: 'unicos', name: "Nhoque Bolonhesa", components: [{ id: 'batata', qty: 0.200 }, { id: 'acem', qty: 0.100 }], desc: "Massa batata" },
  { id: 73, category: 'unicos', name: "Macarrão Bolonhesa", components: [{ id: 'macarrao', qty: 0.120 }, { id: 'acem', qty: 0.120 }], desc: "Espaguete" },
  { id: 75, category: 'unicos', name: "Omelete de Forno", components: [{ id: 'ovos', qty: 3.000 }, { id: 'leg_div', qty: 0.080 }], desc: "3 Ovos, Legumes" },
  { id: 77, category: 'unicos', name: "Dobradinha", components: [{ id: 'bucho', qty: 0.180 }, { id: 'ling', qty: 0.050 }, { id: 'feij_branco', qty: 0.050 }], desc: "Bucho, Feijão Branco" },
  { id: 78, category: 'unicos', name: "Salsicha ao Molho", components: [{ id: 'salsicha', qty: 0.140 }, { id: 'batata', qty: 0.120 }], desc: "Molho tomate, Batata" },
  { id: 80, category: 'unicos', name: "Strogonoff Salsicha", components: [{ id: 'salsicha', qty: 0.140 }, { id: 'creme_leite', qty: 0.050 }], desc: "Econômico" },
  { id: 104, category: 'unicos', name: "Omelete Queijo/Presunto", components: [{ id: 'ovos', qty: 2.000 }, { id: 'queijo_ralado', qty: 0.030 }], desc: "Recheado" },
  { id: 105, category: 'unicos', name: "Panqueca de Frango", components: [{ id: 'fran_file', qty: 0.100 }, { id: 'fuba', qty: 0.030 }], desc: "Recheio frango" },
  { id: 106, category: 'unicos', name: "Ovo Frito c/ Linguiça", components: [{ id: 'ovos', qty: 2.000 }, { id: 'ling', qty: 0.080 }], desc: "Prato rápido" },
  { id: 107, category: 'unicos', name: "Ovos Rancheiros", components: [{ id: 'ovos', qty: 2.000 }, { id: 'extrato', qty: 0.030 }], desc: "Molho tomate" },

  // GUARNIÇÕES
  { id: 200, category: 'guarnicoes', name: 'Batata Frita', components: [{ id: 'batata', qty: 0.150 }, { id: 'oleo', qty: 0.020 }, { id: 'sal', qty: 0.002 }], desc: 'Batata frita crocante' },
  { id: 201, category: 'guarnicoes', name: 'Purê de Batata', components: [{ id: 'batata', qty: 0.120 }, { id: 'creme_leite', qty: 0.030 }, { id: 'mant', qty: 0.010 }, { id: 'sal', qty: 0.002 }], desc: 'Purê cremoso' },
  { id: 202, category: 'guarnicoes', name: 'Farofa Simples', components: [{ id: 'far_mandioca', qty: 0.050 }, { id: 'cebola', qty: 0.020 }, { id: 'mant', qty: 0.010 }, { id: 'sal', qty: 0.002 }], desc: 'Farofa tradicional' },
  { id: 203, category: 'guarnicoes', name: 'Farofa com Bacon', components: [{ id: 'far_mandioca', qty: 0.050 }, { id: 'bacon', qty: 0.030 }, { id: 'cebola', qty: 0.020 }, { id: 'mant', qty: 0.010 }], desc: 'Farofa com bacon crocante' },
  { id: 204, category: 'guarnicoes', name: 'Legumes Refogados', components: [{ id: 'cenoura', qty: 0.040 }, { id: 'abobrinha', qty: 0.040 }, { id: 'cebola', qty: 0.020 }, { id: 'oleo', qty: 0.010 }], desc: 'Mix de legumes' },
  { id: 205, category: 'guarnicoes', name: 'Vinagrete', components: [{ id: 'tomate', qty: 0.050 }, { id: 'cebola', qty: 0.030 }, { id: 'pimentao', qty: 0.020 }, { id: 'oleo', qty: 0.015 }], desc: 'Molho vinagrete' },
  { id: 206, category: 'guarnicoes', name: 'Salada Verde', components: [{ id: 'alface', qty: 0.050 }, { id: 'tomate', qty: 0.040 }, { id: 'cenoura', qty: 0.030 }], desc: 'Salada fresca' },
  { id: 207, category: 'guarnicoes', name: 'Batata Palha', components: [{ id: 'batata', qty: 0.060 }, { id: 'oleo', qty: 0.015 }, { id: 'sal', qty: 0.001 }], desc: 'Batata palha crocante' },
  { id: 208, category: 'guarnicoes', name: 'Arroz Branco', components: [{ id: 'arr', qty: 0.100 }, { id: 'oleo', qty: 0.005 }, { id: 'sal', qty: 0.002 }, { id: 'alho', qty: 0.002 }], desc: 'Arroz soltinho' },
  { id: 209, category: 'guarnicoes', name: 'Feijão Preto', components: [{ id: 'feij', qty: 0.080 }, { id: 'cebola', qty: 0.010 }, { id: 'alho', qty: 0.003 }, { id: 'oleo', qty: 0.005 }], desc: 'Feijão temperado' },
  { id: 210, category: 'guarnicoes', name: 'Couve Refogada', components: [{ id: 'couve', qty: 0.060 }, { id: 'alho', qty: 0.005 }, { id: 'oleo', qty: 0.010 }, { id: 'sal', qty: 0.002 }], desc: 'Couve refogada' },
  
  // Acompanhamentos (Arroz, Feijão, Saladas)
  { id: 301, category: 'acompanhamentos', name: 'Arroz Branco 100g', components: [{ id: 'arr', qty: 0.100 }, { id: 'oleo', qty: 0.005 }, { id: 'sal', qty: 0.002 }, { id: 'alho', qty: 0.002 }], desc: 'Arroz branco soltinho - 100g' },
  { id: 302, category: 'acompanhamentos', name: 'Arroz Branco 150g', components: [{ id: 'arr', qty: 0.150 }, { id: 'oleo', qty: 0.008 }, { id: 'sal', qty: 0.003 }, { id: 'alho', qty: 0.003 }], desc: 'Arroz branco soltinho - 150g' },
  { id: 303, category: 'acompanhamentos', name: 'Arroz Branco 200g', components: [{ id: 'arr', qty: 0.200 }, { id: 'oleo', qty: 0.010 }, { id: 'sal', qty: 0.004 }, { id: 'alho', qty: 0.004 }], desc: 'Arroz branco soltinho - 200g' },
  { id: 304, category: 'acompanhamentos', name: 'Feijão Preto 60g', components: [{ id: 'feij', qty: 0.060 }, { id: 'cebola', qty: 0.008 }, { id: 'alho', qty: 0.002 }, { id: 'oleo', qty: 0.004 }], desc: 'Feijão preto temperado - 60g' },
  { id: 305, category: 'acompanhamentos', name: 'Feijão Preto 80g', components: [{ id: 'feij', qty: 0.080 }, { id: 'cebola', qty: 0.010 }, { id: 'alho', qty: 0.003 }, { id: 'oleo', qty: 0.005 }], desc: 'Feijão preto temperado - 80g' },
  { id: 306, category: 'acompanhamentos', name: 'Feijão Preto 100g', components: [{ id: 'feij', qty: 0.100 }, { id: 'cebola', qty: 0.012 }, { id: 'alho', qty: 0.004 }, { id: 'oleo', qty: 0.006 }], desc: 'Feijão preto temperado - 100g' },
  { id: 307, category: 'acompanhamentos', name: 'Salada Verde', components: [{ id: 'alface', qty: 0.040 }, { id: 'tomate', qty: 0.030 }, { id: 'cenoura', qty: 0.020 }], desc: 'Salada verde fresca' },
  { id: 308, category: 'acompanhamentos', name: 'Vinagrete', components: [{ id: 'tomate', qty: 0.050 }, { id: 'cebola', qty: 0.030 }, { id: 'oleo', qty: 0.005 }], desc: 'Vinagrete tradicional' }
];

export const initialWeeks: Week[] = [
  {
    id: 1,
    title: "Semana 1",
    days: [
      { name: "Segunda", dishes: [{ name: "Carne de Panela", recipeId: 1 }, { name: "Filé de Frango Grelhado", recipeId: 19 }, { name: "Filé de Peixe Frito", recipeId: 38 }], sides: ["Batata", "Cenoura", "Salada"] },
      { name: "Terça", dishes: [{ name: "Bife Acebolado", recipeId: 2 }, { name: "Frango Xadrez", recipeId: 20 }, { name: "Bisteca Grelhada", recipeId: 50 }], sides: ["Purê", "Legumes", "Vinagrete"] },
      { name: "Quarta", dishes: [{ name: "Picadinho", recipeId: 3 }, { name: "Coxa Assada", recipeId: 21 }, { name: "Moqueca de Peixe", recipeId: 39 }], sides: ["Batata", "Farofa", "Salada"] },
      { name: "Quinta", dishes: [{ name: "Carne Moída c/ Batata", recipeId: 4 }, { name: "Strogonoff de Frango", recipeId: 22 }, { name: "Lombo Assado", recipeId: 51 }], sides: ["Batata Palha", "Arroz", "Salada"] },
      { name: "Sexta", dishes: [{ name: "Strogonoff Carne", recipeId: 5 }, { name: "Frango Empanado", recipeId: 23 }, { name: "Moqueca de Ovo", recipeId: 40 }], sides: ["Batata Palha", "Arroz", "Farofa"] },
    ]
  },
  {
    id: 2,
    title: "Semana 2",
    days: [
      { name: "Segunda", dishes: [{ name: "Bife à Rolê", recipeId: 6 }, { name: "Frango com Quiabo", recipeId: 24 }, { name: "Pernil Acebolado", recipeId: 52 }], sides: ["Angu", "Salada", "Vinagrete"] },
      { name: "Terça", dishes: [{ name: "Carne Louca", recipeId: 7 }, { name: "Salpicão de Frango", recipeId: 25 }, { name: "Sardinha Frita", recipeId: 42 }], sides: ["Batata", "Farofa", "Salada"] },
      { name: "Quarta", dishes: [{ name: "Iscas de Fígado", recipeId: 8 }, { name: "Fricassê de Frango", recipeId: 26 }, { name: "Costelinha Frita", recipeId: 53 }], sides: ["Arroz", "Salada", "Farofa"] },
      { name: "Quinta", dishes: [{ name: "Vaca Atolada", recipeId: 9 }, { name: "Coxinha da Asa BBQ", recipeId: 28 }, { name: "Linguiça Acebolada", recipeId: 54 }], sides: ["Mandioca", "Arroz", "Vinagrete"] },
      { name: "Sexta", dishes: [{ name: "Chambaril (Ossobuco)", recipeId: 10 }, { name: "Frango Parmegiana", recipeId: 29 }, { name: "Feijoada Completa", recipeId: 55 }], sides: ["Pirão", "Couve", "Laranja"] },
    ]
  },
  {
    id: 3,
    title: "Semana 3",
    days: [
      { name: "Segunda", dishes: [{ name: "Lagarto Recheado", recipeId: 13 }, { name: "Filé ao Limão", recipeId: 30 }, { name: "Peixe Ensopado", recipeId: 46 }], sides: ["Batata", "Arroz", "Salada"] },
      { name: "Terça", dishes: [{ name: "Bife à Parmegiana", recipeId: 14 }, { name: "Frango à Passarinho", recipeId: 31 }, { name: "Porco com Repolho", recipeId: 56 }], sides: ["Batata Frita", "Arroz", "Salada"] },
      { name: "Quarta", dishes: [{ name: "Músculo com Batata", recipeId: 15 }, { name: "Frango ao Curry", recipeId: 32 }, { name: "Lombo Agridoce", recipeId: 57 }], sides: ["Arroz", "Farofa", "Salada"] },
      { name: "Quinta", dishes: [{ name: "Rocambole de Carne", recipeId: 16 }, { name: "Sobrecoxa Assada", recipeId: 33 }, { name: "Peixe à Dorê", recipeId: 48 }], sides: ["Purê", "Legumes", "Salada"] },
      { name: "Sexta", dishes: [{ name: "Carne de Sol Acebolada", recipeId: 17 }, { name: "Filé à Rolê", recipeId: 34 }, { name: "Almôndegas de Porco", recipeId: 58 }], sides: ["Macaxeira", "Farofa", "Vinagrete"] },
    ]
  },
  {
    id: 4,
    title: "Semana 4",
    days: [
      { name: "Segunda", dishes: [{ name: "Almôndegas ao Sugo", recipeId: 18 }, { name: "Frango Assado c/ Maionese", recipeId: 94 }, { name: "Linguiça Assada", recipeId: 60 }], sides: ["Macarrão", "Salada", "Pão"] },
      { name: "Terça", dishes: [{ name: "Escondidinho de Carne", recipeId: 90 }, { name: "Frango ao Molho Laranja", recipeId: 95 }, { name: "Bisteca Milanesa", recipeId: 63 }], sides: ["Arroz", "Salada", "Farofa"] },
      { name: "Quarta", dishes: [{ name: "Kibe Assado", recipeId: 91 }, { name: "Frango Grelhado Mostarda", recipeId: 96 }, { name: "Filé ao Molho de Coco", recipeId: 98 }], sides: ["Tabule", "Arroz", "Salada"] },
      { name: "Quinta", dishes: [{ name: "Carne Moída c/ Abóbora", recipeId: 92 }, { name: "Coxa ao Molho Laranja", recipeId: 97 }, { name: "Bisteca na Pressão", recipeId: 100 }], sides: ["Arroz", "Farofa", "Salada"] },
      { name: "Sexta", dishes: [{ name: "Barreado", recipeId: 93 }, { name: "Arroz de Forno", recipeId: 65 }, { name: "Moqueca Banana da Terra", recipeId: 99 }], sides: ["Pirão", "Banana", "Farinha"] },
    ]
  },
  {
    id: 5,
    title: "Semana 5",
    days: [
      { name: "Segunda", dishes: [{ name: "Lasanha Bolonhesa", recipeId: 69 }, { name: "Filé de Frango Grelhado", recipeId: 19 }, { name: "Lombo ao Limão", recipeId: 101 }], sides: ["Salada", "Pão", "Arroz"] },
      { name: "Terça", dishes: [{ name: "Panqueca Carne", recipeId: 71 }, { name: "Frango Xadrez", recipeId: 20 }, { name: "Linguiça c/ Lentilha", recipeId: 102 }], sides: ["Arroz", "Salada", "Farofa"] },
      { name: "Quarta", dishes: [{ name: "Nhoque Bolonhesa", recipeId: 72 }, { name: "Coxa Assada", recipeId: 21 }, { name: "Linguiça ao Molho Cerveja", recipeId: 103 }], sides: ["Salada", "Pão", "Batata"] },
      { name: "Quinta", dishes: [{ name: "Macarrão Bolonhesa", recipeId: 73 }, { name: "Strogonoff de Frango", recipeId: 22 }, { name: "Pernil Acebolado", recipeId: 52 }], sides: ["Salada", "Pão", "Farofa"] },
      { name: "Sexta", dishes: [{ name: "Omelete de Forno", recipeId: 75 }, { name: "Frango Empanado", recipeId: 23 }, { name: "Feijoada Completa", recipeId: 55 }], sides: ["Arroz", "Salada", "Couve"] },
    ]
  }
];

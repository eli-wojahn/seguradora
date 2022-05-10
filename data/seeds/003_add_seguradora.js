exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('seguradora').del()
  await knex('seguradora').insert([
    { cliente_nome: 'Marcos de Souza', cliente_cpf: 01274502300, ocorrencia: "Bateu no poste", cidade: "Rio Grande", local: "Avenida Getulio Vargas, 230", envolve_terceiros: "nao", carros_id: 2 },
    { cliente_nome: 'Maria da Silva', cliente_cpf: 02233333332, ocorrencia: "Furou o pneu",  cidade: "Pelotas", local: "Avenida Bento Goncalves, 1230", envolve_terceiros: "nao" },
    { cliente_nome: 'Jose Ferreira', cliente_cpf: 01374502340, ocorrencia: "Colidiu com terceiros", cidade: "Porto Alegre", local: "Avenida Maua, 2330", envolve_terceiros: "sim" },
    { cliente_nome: 'Ciro Carvalho', cliente_cpf: 06274502310, ocorrencia: "Acabou a bateria", cidade: "Caxias", local: "Rua Comendador FElix, 850", envolve_terceiros: "nao" },
    { cliente_nome: 'Sandra Birke', cliente_cpf: 01664502307, ocorrencia: "Teve a traseira atingida por terceiro", cidade: "Rio Grande", local: "Avenida Getulio Vargas, 460", envolve_terceiros: "sim" }
  ]);
};  
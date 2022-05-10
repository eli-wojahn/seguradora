const res = require("express/lib/response");
const dbKnex = require("../data/db_config");  // dados de conexão com o banco de dados

module.exports = {

    async index(req, res) {
        try {
            // para obter os carros pode-se utilizar .select().orderBy() ou apenas .orderBy()
            // const carros = await dbKnex("carros");

            const carros = await dbKnex("carros as c")
                .select("c.id", "modelo", "foto", "ano", "preco", 
                        "m.nome as marca", "u.nome as usuario")
                .innerJoin('marcas as m', 'marca_id', 'm.id')
                .innerJoin('usuarios as u', 'usuario_id', 'u.id')
            res.status(200).json(carros); // retorna statusCode ok e os dados
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    },

    async store(req, res) {
        // faz a desestruturação dos dados recebidos no corpo da requisição
        const { modelo, foto, ano, preco, marca_id, usuario_id } = req.body;

        // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
        if (!modelo || !foto || !ano || !preco || !marca_id || !usuario_id) {
            res.status(400).json({ msg: "Enviar modelo, foto, ano, preco, marca_id e usuario_id do carro" });
            return;
        }

        // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
        try {
            // insert, faz a inserção na tabela carros (e retorna o id do registro inserido)
            const novo = await dbKnex("carros").insert({ modelo, foto, ano, preco, marca_id, usuario_id });
            res.status(201).json({ id: novo[0] }); // statusCode indica Create
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    },

    async update(req, res) {
        // faz a desestruturação dos dados recebidos no corpo da requisição
        const { modelo, foto, ano, preco, marca_id, usuario_id } = req.body;
    
        // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
        if (!modelo || !foto || !ano || !preco || !marca_id || !usuario_id) {
            res.status(400).json({ msg: "Enviar modelo, foto, ano, preco, marca_id e usuario_id do carro" });
            return;
        }
    
        // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
        try {
            // insert, faz a inserção na tabela carros (e retorna o id do registro inserido)
            const novo = await dbKnex("carros").update({ modelo, foto, ano, preco, marca_id, usuario_id });
            res.status(201).json({ id: novo[0] }); // statusCode indica Create
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    },

    async destroy(req, res) {
        // faz a desestruturação dos dados recebidos no corpo da requisição
        const { id } = req.params; 
        try {
          await dbKnex("Carros").del().where({ id });
          res.status(200).json(); 
        } catch (error) {
          res.status(400).json({ msg: error.message }); 
        }
    },
      
    async destaque(req, res) {
        const { id } = req.params;
    
        dados = await dbKnex("carros").where({id});
    
        if (dados[0].destaque) {
            await dbKnex("carros").update({ destaque: 0 }).where({ id});
            res.status(400).json({ msg: error.message});
    } else {
        try {
            await dbKnex("carros").update({ destaque: 1 }).where({ id});
            res.status(200).json();
        } catch (error) {
            res.status(400).json({ msg: error.message});
        }
    }
    },

    async mostra_destaque(req, res) {
        try {
            // para obter os carros pode-se utilizar .select().orderBy() ou apenas .orderBy()
            // const carros = await dbKnex("carros");
    
            const carros = await dbKnex("carros as c")
                .select("c.id", "modelo", "foto", "ano", "preco", 
                        "m.nome as marca", "u.nome as usuario")
                .innerJoin('marcas as m', 'marca_id', 'm.id')
                .innerJoin('usuarios as u', 'usuario_id', 'u.id')
                .where({ destaque: 1 })
            res.status(200).json(carros); // retorna statusCode ok e os dados
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    },
    

}






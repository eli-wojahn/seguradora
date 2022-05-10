const res = require("express/lib/response");
const dbKnex = require("../data/db_config");  // dados de conexão com o banco de dados


module.exports = {

    async index(req, res) {
        try {
            const seguradora = await dbKnex("seguradora as s")
                .select("s.id", "cliente_nome", "cliente_cpf", "ocorrencia", "data_hora", 
                        "cidade", "local", "envolve_terceiros", 
                        "c.modelo as carros", "s.created_at", "s.updated_at",)
                .innerJoin('carros as c', 'carros_id', 'c.id')
            res.status(200).json(seguradora); 
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },

    async store(req, res) {

        const { cliente_nome, cliente_cpf, ocorrencia, data_hora, cidade, local, envolve_terceiros, carros_id } = req.body;
        if (!cliente_nome || !cliente_cpf || !ocorrencia || !data_hora || !cidade || !local || !envolve_terceiros || !carros_id) {
            res.status(400).json({ msg: "Enviar cliente_nome, cliente_cpf, ocorrencia, data_hora, cidade, local, envolve_terceiros, carros_id" });
            return;
        }

        try {
            const novo = await dbKnex("seguradora").insert({ cliente_nome, cliente_cpf, ocorrencia, data_hora, cidade, local, envolve_terceiros, carros_id });
            res.status(201).json({ id: novo[0] }); 
        } catch (error) {
            res.status(400).json({ msg: error.message }); 
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { cliente_nome, cliente_cpf, ocorrencia, data_hora, cidade, local, envolve_terceiros, carros_id } = req.body;
        
        if (!cliente_nome || !cliente_cpf || !ocorrencia || !data_hora || !cidade || !local || !envolve_terceiros || !carros_id) {
            res.status(400).json({ msg: "Enviar cliente_nome, cliente_cpf, ocorrencia, data_hora, cidade, local, envolve_terceiros, carros_id" });
            return;
        }
    
        try {
             await dbKnex("seguradora").update({ cliente_nome, cliente_cpf, ocorrencia, data_hora, cidade, local, envolve_terceiros, carros_id }).where("id", id);
            res.status(200).json();
        } catch (error) {
            res.status(400).json({ msg: error.message }); 
        }
    },
    
    async destroy(req, res) {
        const { id } = req.params; 
        try {
          await dbKnex("seguradora").del().where({ id });
          res.status(200).json(); 
        } catch (error) {
          res.status(400).json({ msg: error.message }); 
        }
    },

    async dados(req, res) {
        try {
         const estatistica =  await dbKnex("seguradora")
         .select("cidade", "envolve_terceiros").count({ocorrencias: "id"}) 
         .groupBy("cidade", "envolve_terceiros" )
          res.status(200).json({ estatistica }); 
        } catch (error) {
          res.status(400).json({ msg: error.message }); 
        }
    },

    
}



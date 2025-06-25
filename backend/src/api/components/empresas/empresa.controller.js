import enterpriseService from './empresa.service.js';

export async function registerEmpresa(req, res) {
     try {
         const idUsuario = req.user.id;  
         const dadosEmpresa = req.body;

         const novaEmpresa = await enterpriseService.createEmpresa(idUsuario, dadosEmpresa);

         res.status(201).json({
             mensagem: "Empresa cadastrada com sucesso!",
             empresa: novaEmpresa
         });
     } catch (error) {
         if (error.name === 'ValidationError' || error.name === 'ConflictError') {
             return res.status(error.name === 'ValidationError' ? 400 : 409).json({ erro: error.message });
         }
         console.error("Erro no controller ao cadastrar empresa:", error);
         return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
     }
 }


 export async function getAllEmpresas(req, res) {
     try {
         const empresas = await enterpriseService.findAllEmpresas();
         res.status(200).json(empresas);
     } catch (error) {
         console.error("Erro no controller ao buscar empresas:", error);
         return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
     }
 }


 export async function getEmpresaById(req, res) {
     try {
         const { cnpj } = req.params;
         const empresa = await enterpriseService.findEmpresaByPk(cnpj);

         if (empresa) {
             res.status(200).json(empresa);
         } else {
             res.status(404).json({ erro: "Empresa não encontrada." });
         }
     } catch (error) {
         console.error("Erro no controller ao buscar empresa por ID:", error);
         return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
     }
 }
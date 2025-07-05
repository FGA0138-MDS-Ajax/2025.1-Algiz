import empresaService from './empresa.service.js';

export async function registerEmpresa(req, res) {
    try {
        const idUsuario = req.user.id;  
        const dadosEmpresa = req.body;

        const novaEmpresa = await empresaService.createEmpresa(idUsuario, dadosEmpresa);

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
        const empresas = await empresaService.findAllEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        console.error("Erro no controller ao buscar empresas:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }
}

export async function updateEmpresa(req, res) {
    try {
        const { cnpj } = req.params; // CNPJ vem limpo da URL (apenas números)
        const idUsuario = req.user.id;
        const dadosEmpresa = req.body;

        console.log(`Atualizando empresa ${cnpj} para usuário ${idUsuario}:`, dadosEmpresa);

        // ✅ CORREÇÃO: Formatar CNPJ dentro do controller
        const cnpjFormatado = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

        const empresaAtualizada = await empresaService.updateEmpresa(cnpjFormatado, idUsuario, dadosEmpresa);

        res.status(200).json({
            mensagem: "Dados da empresa atualizados com sucesso!",
            empresa: empresaAtualizada
        });
    } catch (error) {
        console.error("Erro no controller ao atualizar empresa:", error);
        
        // Tratamento de erros específicos
        if (error.name === 'ValidationError') {
            return res.status(400).json({ erro: error.message });
        }
        if (error.name === 'ConflictError') {
            return res.status(409).json({ erro: error.message });
        }
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === 'UnauthorizedError') {
            return res.status(403).json({ erro: error.message });
        }
        
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }
}

export async function getEmpresaById(req, res) {
    try {
        const { cnpj } = req.params; // CNPJ vem limpo da URL (apenas números)
        
        // ✅ CORREÇÃO: Formatar CNPJ dentro do controller
        const cnpjFormatado = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        
        const empresa = await empresaService.findEmpresaByPk(cnpjFormatado);

        if (empresa) {
            res.status(200).json(empresa);
        } else {
            console.log("Empresa não encontrada para o CNPJ:", cnpjFormatado);
            res.status(404).json({ erro: "Empresa não encontrada." });
        }
    } catch (error) {
        console.error("Erro no controller ao buscar empresa por ID:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }
}
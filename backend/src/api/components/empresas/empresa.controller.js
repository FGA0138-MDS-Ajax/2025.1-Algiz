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

export async function getEmpresaById(req, res) {
    try {
        const { cnpj } = req.params;
        const empresa = await empresaService.findEmpresaByPk(cnpj);
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

// Controller para a atualização
export async function updateEmpresa(req, res) {
    try {
        const idUsuario = req.user.id;
        const { cnpj } = req.params;
        const dadosUpdate = req.body;
        const empresaAtualizada = await empresaService.updateEmpresa(cnpj, idUsuario, dadosUpdate);
        res.status(200).json(empresaAtualizada);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === 'AuthorizationError') {
            return res.status(403).json({ erro: error.message });
        }
        if (error.name === 'ConflictError') {
            return res.status(409).json({ erro: error.message });
        }
        console.error("Erro no controller ao atualizar empresa:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }
}
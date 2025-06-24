export default (sequelize, DataTypes) => {
    const Mensagem = sequelize.define('Mensagem', {
        idMensagem: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idRemetente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'Usuarios',
                key: 'idUsuario'
            }
        },
        idDestinatario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'idUsuario'
            }
        },
        conteudo: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }

    }, {
        tableName: 'MENSAGEM',
        timestamps: false
    });

    Mensagem.associate = (models) =>{
        Mensagem.belongsTo(models.Usuario, { foreignKey: 'idRemetente', as: 'remetente' });

    Mensagem.belongsTo(models.Usuario, { foreignKey: 'idDestinatario', as: 'destinatario' });
    };
    return Mensagem;
};
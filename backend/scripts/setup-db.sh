echo "📦 Rodando migrations..."
docker exec -it backend-backend-1 npx sequelize-cli db:migrate

echo "🌱 Rodando seeders..."
docker exec -it backend-backend-1 npx sequelize-cli db:seed:all

echo "✅ Banco de dados pronto!"
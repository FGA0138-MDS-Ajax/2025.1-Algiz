echo "📦 Rodando migrations..."
docker exec -it backend-backend-1 npx sequelize-cli db:migrate
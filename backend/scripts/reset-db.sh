echo "🧨 Derrubando containers e volumes..."
docker compose down -v

echo "🧱 Subindo containers novamente..."
docker compose up --build
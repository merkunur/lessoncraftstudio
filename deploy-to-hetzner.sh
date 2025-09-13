#!/bin/bash

# Deployment script for LessonCraftStudio to Hetzner server
# Usage: ./deploy-to-hetzner.sh <server-ip>

SERVER_IP=$1
SERVER_USER="root"  # Change if using different user

if [ -z "$SERVER_IP" ]; then
    echo "Usage: ./deploy-to-hetzner.sh <server-ip>"
    exit 1
fi

echo "🚀 Deploying LessonCraftStudio to Hetzner server at $SERVER_IP"

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf lessoncraftstudio-deploy.tar.gz \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='.env.local' \
    --exclude='.next' \
    --exclude='dist' \
    --exclude='build' \
    .

# Copy files to server
echo "📤 Copying files to server..."
scp lessoncraftstudio-deploy.tar.gz $SERVER_USER@$SERVER_IP:/root/

# SSH into server and deploy
echo "🔧 Setting up on server..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
    # Update system
    apt-get update && apt-get upgrade -y

    # Install Docker if not installed
    if ! command -v docker &> /dev/null; then
        echo "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        rm get-docker.sh
    fi

    # Install Docker Compose if not installed
    if ! command -v docker-compose &> /dev/null; then
        echo "Installing Docker Compose..."
        apt-get install -y docker-compose
    fi

    # Create app directory
    mkdir -p /opt/lessoncraftstudio
    cd /opt/lessoncraftstudio

    # Extract files
    tar -xzf /root/lessoncraftstudio-deploy.tar.gz
    rm /root/lessoncraftstudio-deploy.tar.gz

    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo "Creating .env file..."
        cat > .env << EOF
# Database
DB_USER=lcsuser
DB_PASSWORD=$(openssl rand -base64 32)
DB_NAME=lessoncraftstudio

# Security
JWT_SECRET=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32)

# URLs (Update with your domain)
NEXT_PUBLIC_API_URL=http://your-domain.com:3001
NEXT_PUBLIC_STRAPI_URL=http://your-domain.com:1337

# Stripe (Add your keys)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
EOF
        echo "⚠️  Please edit /opt/lessoncraftstudio/.env with your actual values"
    fi

    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down

    # Build and start services
    echo "🏗️  Building and starting services..."
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml up -d

    # Check status
    echo "✅ Deployment complete! Checking service status..."
    docker-compose -f docker-compose.prod.yml ps

    echo ""
    echo "🎉 LessonCraftStudio deployed successfully!"
    echo ""
    echo "Services available at:"
    echo "  - Frontend: http://$SERVER_IP:3000"
    echo "  - API: http://$SERVER_IP:3001"
    echo "  - Strapi Admin: http://$SERVER_IP:1337/admin"
    echo ""
    echo "Next steps:"
    echo "1. Edit /opt/lessoncraftstudio/.env with your domain and API keys"
    echo "2. Configure your domain DNS to point to this server"
    echo "3. Set up SSL certificates (use certbot for Let's Encrypt)"
    echo "4. Configure firewall rules if needed"
ENDSSH

# Clean up local files
rm lessoncraftstudio-deploy.tar.gz

echo "✅ Deployment script completed!"
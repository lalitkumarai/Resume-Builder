#!/bin/sh

# Docker entrypoint script for Resume Builder application
set -e

echo "Starting Resume Builder application..."

# Function to replace environment variables in JavaScript files
replace_env_vars() {
    echo "Replacing environment variables in built files..."
    
    # Define default values
    REACT_APP_API_URL=${REACT_APP_API_URL:-"http://localhost:3001"}
    REACT_APP_ENVIRONMENT=${REACT_APP_ENVIRONMENT:-"production"}
    REACT_APP_VERSION=${REACT_APP_VERSION:-"1.0.0"}
    
    # Find and replace in JavaScript files
    find /usr/share/nginx/html/static/js -name "*.js" -exec sed -i \
        -e "s|REACT_APP_API_URL_PLACEHOLDER|${REACT_APP_API_URL}|g" \
        -e "s|REACT_APP_ENVIRONMENT_PLACEHOLDER|${REACT_APP_ENVIRONMENT}|g" \
        -e "s|REACT_APP_VERSION_PLACEHOLDER|${REACT_APP_VERSION}|g" \
        {} \;
    
    echo "Environment variables replaced successfully"
}

# Function to update nginx configuration based on environment
configure_nginx() {
    echo "Configuring nginx for environment: ${REACT_APP_ENVIRONMENT}"
    
    # If backend URL is provided, enable proxy
    if [ -n "$BACKEND_URL" ]; then
        echo "Configuring backend proxy to: $BACKEND_URL"
        sed -i "s|# proxy_pass http://backend:3001;|proxy_pass ${BACKEND_URL};|g" /etc/nginx/nginx.conf
        sed -i "s|# proxy_http_version|proxy_http_version|g" /etc/nginx/nginx.conf
        sed -i "s|# proxy_set_header|proxy_set_header|g" /etc/nginx/nginx.conf
        sed -i "s|# proxy_cache_bypass|proxy_cache_bypass|g" /etc/nginx/nginx.conf
        sed -i "s|return 404;|# return 404;|g" /etc/nginx/nginx.conf
    fi
    
    # Test nginx configuration
    nginx -t
    echo "Nginx configuration is valid"
}

# Function to set up logging
setup_logging() {
    echo "Setting up logging..."
    
    # Create log directory if it doesn't exist
    mkdir -p /var/log/nginx
    
    # Set log level based on environment
    if [ "$REACT_APP_ENVIRONMENT" = "development" ]; then
        sed -i 's/error_log \/var\/log\/nginx\/error.log warn;/error_log \/var\/log\/nginx\/error.log debug;/g' /etc/nginx/nginx.conf
    fi
    
    echo "Logging configured"
}

# Function to optimize for production
optimize_production() {
    if [ "$REACT_APP_ENVIRONMENT" = "production" ]; then
        echo "Applying production optimizations..."
        
        # Enable additional gzip compression
        sed -i 's/gzip_comp_level 6;/gzip_comp_level 9;/g' /etc/nginx/nginx.conf
        
        # Set longer cache times for production
        sed -i 's/expires 1y;/expires 2y;/g' /etc/nginx/nginx.conf
        
        echo "Production optimizations applied"
    fi
}

# Function to validate application files
validate_app() {
    echo "Validating application files..."
    
    # Check if index.html exists
    if [ ! -f "/usr/share/nginx/html/index.html" ]; then
        echo "ERROR: index.html not found!"
        exit 1
    fi
    
    # Check if static assets exist
    if [ ! -d "/usr/share/nginx/html/static" ]; then
        echo "WARNING: static directory not found!"
    fi
    
    echo "Application files validated"
}

# Function to display startup information
display_info() {
    echo "=========================================="
    echo "Resume Builder Application"
    echo "=========================================="
    echo "Environment: ${REACT_APP_ENVIRONMENT}"
    echo "Version: ${REACT_APP_VERSION}"
    echo "API URL: ${REACT_APP_API_URL}"
    echo "Backend URL: ${BACKEND_URL:-"Not configured"}"
    echo "Port: 80"
    echo "Health Check: http://localhost:80/health"
    echo "=========================================="
}

# Main execution
main() {
    echo "Initializing Resume Builder container..."
    
    # Run setup functions
    validate_app
    replace_env_vars
    setup_logging
    configure_nginx
    optimize_production
    display_info
    
    echo "Container initialization complete!"
    echo "Starting nginx..."
    
    # Execute the main command
    exec "$@"
}

# Handle signals for graceful shutdown
trap 'echo "Received shutdown signal, stopping nginx..."; nginx -s quit; exit 0' TERM INT

# Run main function
main "$@"

# Instant Voice Search

A WordPress plugin that adds voice search functionality to WordPress search bars using the Web Speech API.

## Features

- Adds a microphone button next to WordPress search bars
- Uses the Web Speech API for voice recognition
- Automatically submits the search form after voice input
- Compatible with default WordPress themes and WooCommerce
- Configurable language settings
- Fully translatable
- Responsive design

## Requirements

- WordPress 5.0 or higher
- Modern web browser with Web Speech API support (Chrome, Edge, Safari)

## Installation

1. Download the plugin zip file
2. Go to WordPress admin panel > Plugins > Add New
3. Click "Upload Plugin" and select the downloaded zip file
4. Activate the plugin

## Usage

1. Go to Settings > Instant Voice Search to configure the plugin
2. Enable/disable voice search functionality
3. Select the preferred language for voice recognition
4. The microphone button will automatically appear next to search bars on your site

## Development

### Prerequisites

- Node.js 14.0 or higher
- npm 6.0 or higher

### Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the assets
4. For development, use `npm run start` to watch for changes

### Available Scripts

- `npm run build` - Build the production version
- `npm run start` - Start development mode with hot reloading
- `npm run lint:js` - Lint JavaScript files
- `npm run lint:css` - Lint CSS files
- `npm run format` - Format code using Prettier

## Browser Support

The plugin uses the Web Speech API, which is supported in:
- Google Chrome (desktop & mobile)
- Microsoft Edge
- Safari (desktop & mobile)
- Firefox (with limited support)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details. 
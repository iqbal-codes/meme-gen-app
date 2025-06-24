# Meme Generator App 🎭

A powerful and intuitive React Native meme generator app that allows users to create custom memes with text and images. Built with modern React Native architecture and TypeScript for a robust development experience.

## ✨ Features

### Core Functionality
- **Template Selection**: Choose from pre-built meme templates
- **Custom Images**: Import photos from device gallery
- **Text Elements**: Add and customize text with various styling options
- **Image Elements**: Add and manipulate image overlays
- **Drag & Drop**: Intuitive gesture-based element positioning
- **Style Customization**: Comprehensive styling options for text and images
- **Export**: Save completed memes to device gallery
- **Confirmation Dialogs**: User-friendly confirmation modals for important actions
- **Search Functionality**: Enhanced search input components
- **Editable Text**: In-place text editing capabilities

### Text Styling Options
- Font weight (normal, bold, etc.)
- Font style (normal, italic)
- Text decoration (underline, strikethrough)
- Font size adjustment
- Text color selection
- Background color
- Opacity control

### Image Styling Options
- Opacity adjustment
- Scaling and positioning
- Layer management

### User Experience
- **Gesture Controls**: Pan, pinch, and tap gestures for element manipulation
- **Bottom Sheets**: Clean, modal-based interfaces for options
- **Real-time Preview**: See changes instantly as you edit
- **Responsive Design**: Optimized for various screen sizes
- **Context-based Confirmations**: Smart confirmation dialogs for user actions

## 🏗️ Architecture

### Project Structure
```
src/
├── components/              # Reusable UI components
│   ├── BaseBottomSheet/         # Base modal component
│   ├── Button/                  # Custom button component
│   ├── ConfirmationModal/       # Confirmation dialog component
│   ├── EditableTextInput/       # In-place editable text input
│   └── SearchInput/             # Enhanced search input component
├── contexts/                # React contexts for state management
│   └── ConfirmationContext/     # Global confirmation dialog context
├── pages/                   # Page-level components
│   └── MemeEditor/              # Main meme editing interface
│       ├── components/              # Page-specific components
│       │   ├── DraggableElement/        # Draggable text/image elements
│       │   ├── ElementStyleBottomSheet/ # Style customization modal
│       │   │   └── components/          # Style sheet sub-components
│       │   │       ├── ButtonRow.tsx        # Button row component
│       │   │       ├── ColorGrid.tsx        # Color selection grid
│       │   │       ├── SliderSection.tsx    # Slider controls
│       │   │       └── StyleSection.tsx     # Style section wrapper
│       │   ├── PhotoPickerBottomSheet/  # Image selection modal
│       │   └── TemplatePickerBottomSheet/ # Template selection modal
│       ├── hooks/                   # Page-specific hooks
│       │   ├── useCanvasGestures.ts     # Canvas gesture handling
│       │   └── useElementGestures.ts    # Element gesture handling
│       └── constants.ts             # Page-specific constants
├── constants/               # App constants and themes
│   ├── colors.ts                # Color definitions
│   ├── fonts.ts                 # Font configurations
│   └── theme.ts                 # Theme system
├── hooks/                   # Custom React hooks
│   ├── useElementDimensions.ts  # Element dimension management
│   └── useImageHeight.ts        # Image height calculations
├── types/                   # TypeScript type definitions
│   ├── contexts.ts              # Context-related types
│   ├── elements.ts              # Element-related types
│   ├── fonts.ts                 # Font-related types
│   ├── gestures.ts              # Gesture-related types
│   ├── permissions.ts           # Permission-related types
│   └── ui.ts                    # UI component types
├── utils/                   # Utility functions
│   ├── debounceUtils.ts         # Debouncing utilities
│   ├── dimensionUtils.ts        # Dimension calculations
│   ├── fontUtils.ts             # Font handling utilities
│   ├── permissionUtils.ts       # Permission management
│   └── styleUtils.ts            # Style manipulation utilities
└── App.tsx                  # Main application component
```

### Key Technologies
- **React Native 0.80.0**: Latest stable React Native
- **TypeScript**: Full type safety and better developer experience
- **React Native Gesture Handler**: Advanced gesture recognition
- **React Native Reanimated**: Smooth animations and interactions
- **Lucide React Native**: Beautiful, consistent icons
- **React Context API**: State management for global features

### Type System
The app uses a centralized type system with domain-specific organization:
- **Element Types**: Canvas elements, dimensions, and styling
- **UI Types**: Button variants, sizes, and component props
- **Gesture Types**: Touch and pan gesture contexts
- **Context Types**: React context interfaces
- **Font Types**: Typography and font management
- **Permission Types**: Device permission handling

## 📱 Dependencies

### Core Dependencies
- `react-native-gesture-handler`: Advanced gesture recognition
- `react-native-reanimated`: High-performance animations
- `react-native-view-shot`: Screenshot and export functionality
- `@react-native-camera-roll/camera-roll`: Gallery access
- `@react-native-community/slider`: Opacity and value sliders
- `@react-native-vector-icons/lucide`: Icon library
- `react-native-safe-area-context`: Safe area handling

### Development Dependencies
- `@typescript-eslint/*`: TypeScript linting
- `eslint-config-airbnb-typescript`: Code style enforcement
- `@types/*`: TypeScript definitions
- `jest`: Testing framework
- `@testing-library/react-native`: React Native testing utilities
- `husky`: Git hooks management
- `lint-staged`: Pre-commit code quality checks

## 🧪 Testing & Code Quality

The project includes comprehensive testing and code quality tools:

### Testing Framework
- **Jest**: Unit testing framework
- **React Native Testing Library**: Component testing utilities
- **Comprehensive Test Coverage**: All components include unit tests

### Code Quality Tools
- **ESLint**: Code linting with Airbnb TypeScript configuration
- **TypeScript**: Static type checking
- **Prettier**: Code formatting
- **Pre-commit Hooks**: Automated quality checks before commits

### Pre-commit Hooks
The project uses Husky and lint-staged for automated code quality:

```json
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "jest --bail --findRelatedTests --passWithNoTests"
  ]
}
```

This ensures that:
- Code is automatically linted and fixed
- Related tests are run for changed files
- Only quality code is committed

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Development

### Code Quality
The project includes comprehensive linting, type checking, and automated testing:

```sh
# Run TypeScript type checking
npx tsc --noEmit --skipLibCheck

# Run ESLint with auto-fix
yarn lint

# Run tests
yarn test

# Run tests for specific components
yarn test -- --testPathPattern="SearchInput|EditableTextInput"
```

### Pre-commit Hooks
The project automatically runs quality checks before each commit:
- **ESLint**: Automatically fixes code style issues
- **Jest**: Runs tests related to changed files
- **Type Checking**: Ensures TypeScript compliance

To bypass pre-commit hooks (not recommended):
```sh
git commit --no-verify -m "your message"
```

### Development Tips
- The app uses **Fast Refresh** for instant updates during development
- All components are fully typed with TypeScript
- Follow the established code organization patterns
- Use the centralized type system in `src/types/`
- Leverage React Context for global state management
- Write tests for new components following existing patterns

### Hot Reload
When you make changes to the code, the app will automatically update. For a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

### Clean Build
If you encounter issues, try a clean build:

```sh
# Clean start Metro
yarn start:clean

# Full clean (removes node_modules and cleans Android)
yarn clean:all
```

## 🎯 Usage

1. **Select a Template**: Tap the template button to choose from pre-built meme templates
2. **Add Custom Image**: Use the photo picker to import images from your gallery
3. **Add Text**: Tap the text button to add text elements to your meme
4. **Customize Elements**: 
   - Drag elements to reposition them
   - Tap elements to edit their styling
   - Use pinch gestures to scale elements
5. **Style Your Content**: Access the style panel to customize:
   - Text: font weight, style, decoration, size, colors, opacity
   - Images: opacity and positioning
6. **Export**: Save your completed meme to your device gallery
7. **Confirmation Dialogs**: Confirm important actions through user-friendly modals

## 🔧 Customization

### Adding New Templates
Add new meme templates in `src/pages/MemeEditor/constants.ts`:

```typescript
export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    name: "Your Template Name",
    imageUrl: "path/to/your/template.jpg"
  },
  // ... existing templates
];
```

### Styling
The app uses a centralized theme system in `src/constants/`. Customize:
- **Colors** (`src/constants/colors.ts`): Color palette
- **Fonts** (`src/constants/fonts.ts`): Typography settings
- **Theme** (`src/constants/theme.ts`): Overall theme configuration

### Adding New Components
The modular architecture makes it easy to extend:
1. Create new components in `src/components/` for reusable UI
2. Add page-specific components in `src/pages/[PageName]/components/`
3. Add types in the appropriate `src/types/` file
4. Use existing hooks or create new ones in `src/hooks/`
5. Write comprehensive unit tests following existing patterns
6. Follow the established patterns for consistency

### Context Management
For global state, use React Context:
1. Create context in `src/contexts/`
2. Define types in `src/types/contexts.ts`
3. Provide context at appropriate component level
4. Use context hooks for state access

## 🧪 Testing

Run the test suite:

```sh
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests for specific files
yarn test -- --testPathPattern="SearchInput"

# Run tests with coverage
yarn test --coverage
```

The project includes:
- **Unit tests** for all components
- **Hook testing** for custom hooks
- **Utility function tests** for helper functions
- **Context testing** for React contexts
- **Type checking** with TypeScript
- **ESLint** for code quality
- **Pre-commit hooks** for automated quality assurance

### Testing Patterns
- Use React Native Testing Library for component tests
- Mock external dependencies appropriately
- Test user interactions and edge cases
- Maintain high test coverage
- Follow existing test file naming conventions

## 🚀 Deployment

### Android
1. Generate a signed APK or AAB:
   ```sh
   yarn android:build
   ```
2. Follow React Native's [publishing guide](https://reactnative.dev/docs/signed-apk-android)

### iOS
1. Archive the project in Xcode
2. Follow React Native's [publishing guide](https://reactnative.dev/docs/publishing-to-app-store)

## Congratulations! :tada:

You've successfully set up the Meme Generator App! :partying_face:

# 🔧 Troubleshooting

## Common Issues

### Metro Bundle Issues
If you encounter Metro bundling issues:

```sh
# Clear Metro cache
yarn start:clean

# Or manually clear cache
npx react-native start --reset-cache
```

### Android Build Issues
```sh
# Clean Android build
cd android && ./gradlew clean && cd ..

# Full clean
yarn clean:all
```

### iOS Build Issues
```sh
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reinstall pods
cd ios && bundle exec pod install && cd ..
```

### TypeScript Errors
```sh
# Check for type errors
npx tsc --noEmit --skipLibCheck

# Fix linting issues
yarn lint
```

### Testing Issues
```sh
# Clear Jest cache
yarn test --clearCache

# Run tests with verbose output
yarn test --verbose
```

### Pre-commit Hook Issues
If pre-commit hooks fail:
```sh
# Run lint-staged manually
npx lint-staged

# Reinstall husky hooks
npx husky install
```

### Gesture Handler Issues
If gestures aren't working:
1. Ensure `react-native-gesture-handler` is properly linked
2. Check that `GestureHandlerRootView` wraps your app
3. Verify Android/iOS specific setup steps

### Camera Roll Permissions
If image saving/loading fails:
- **Android**: Check `WRITE_EXTERNAL_STORAGE` permission
- **iOS**: Check `NSPhotoLibraryUsageDescription` in Info.plist

### Performance Issues
- Enable Hermes engine for better performance
- Use React Native debugging tools
- Check for memory leaks in gesture handlers
- Monitor component re-renders

For general React Native issues, see the [official troubleshooting guide](https://reactnative.dev/docs/troubleshooting).

# 📚 Learn More

## React Native Resources
- [React Native Website](https://reactnative.dev) - learn more about React Native
- [Getting Started](https://reactnative.dev/docs/environment-setup) - environment setup guide
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - guided tour of React Native basics
- [React Native Blog](https://reactnative.dev/blog) - latest official blog posts

## Key Libraries Used
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) - advanced gesture recognition
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - high-performance animations
- [React Native View Shot](https://github.com/gre/react-native-view-shot) - screenshot functionality
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - vector icons
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) - testing utilities
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - pre-commit linting

## TypeScript Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - comprehensive TypeScript guide
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - React + TypeScript patterns

## Testing Resources
- [Jest Documentation](https://jestjs.io/docs/getting-started) - testing framework
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) - component testing
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) - testing guidelines

## Contributing
When contributing to this project:
1. Follow the established TypeScript patterns
2. Use the centralized type system
3. Maintain component modularity
4. Add comprehensive tests for new features
5. Follow the ESLint configuration
6. Use React Context for global state when appropriate
7. Ensure pre-commit hooks pass
8. Document new features and APIs

## License
This project is private and proprietary.

---

**Happy meme creating! 🎭✨**

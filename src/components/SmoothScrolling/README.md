# Lenis Smooth Scrolling Implementation

This implementation provides buttery smooth scrolling throughout your Resume Builder application using Lenis.

## Components

### LenisProvider
Wraps your entire application to provide smooth scrolling functionality.

```tsx
<LenisProvider options={{ duration: 1.2, smooth: true }}>
  <App />
</LenisProvider>
```

### SmoothScrollSection
Optimizes sections for smooth scrolling with intersection observer.

```tsx
<SmoothScrollSection id="hero" delay={200}>
  <YourContent />
</SmoothScrollSection>
```

### SmoothScrollButton
Creates buttons that smoothly scroll to targets.

```tsx
<SmoothScrollButton 
  target="#features" 
  variant="primary"
  duration={1.5}
>
  Scroll to Features
</SmoothScrollButton>
```

### ScrollToTop
Floating button that appears when scrolling down.

```tsx
<ScrollToTop />
```

## Hook

### useLenis
Provides programmatic control over Lenis scrolling.

```tsx
const { scrollTo, scrollToTop, stop, start } = useLenis();

// Scroll to element
scrollTo('#section', { duration: 1.2 });

// Scroll to top
scrollToTop({ duration: 1.5 });
```

## Features

- ✅ Buttery smooth scrolling
- ✅ Optimized performance
- ✅ Mobile-friendly
- ✅ Customizable easing
- ✅ Programmatic control
- ✅ Intersection observer optimization
- ✅ Scroll-to-top functionality
- ✅ Responsive design

## Configuration

The Lenis instance is configured with optimal settings:
- Duration: 1.2s
- Easing: Custom exponential ease-out
- Mouse multiplier: 1
- Touch multiplier: 2
- Smooth touch: disabled (for better mobile performance)

## Performance

- Uses `requestAnimationFrame` for smooth animations
- Optimizes text rendering during scroll
- Prevents layout shifts
- Uses `will-change` and `transform3d` for GPU acceleration
- Intersection observer for efficient section handling

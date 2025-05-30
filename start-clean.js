const { spawn } = require('child_process');

console.log('🚀 Starting Resume Builder Application...\n');

// Set environment variables to suppress warnings
process.env.GENERATE_SOURCEMAP = 'false';
process.env.ESLINT_NO_DEV_ERRORS = 'true';
process.env.TSC_COMPILE_ON_ERROR = 'true';

// Start the development server
const child = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    GENERATE_SOURCEMAP: 'false',
    ESLINT_NO_DEV_ERRORS: 'true',
    TSC_COMPILE_ON_ERROR: 'true'
  }
});

child.on('error', (error) => {
  console.error('❌ Failed to start application:', error);
});

child.on('close', (code) => {
  console.log(`\n📱 Application stopped with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down application...');
  child.kill('SIGINT');
});

console.log('✅ Resume Builder is starting up...');
console.log('📱 Application will be available at: http://localhost:3000');
console.log('🎨 Features available:');
console.log('   • Professional Resume Builder');
console.log('   • Cover Letter Builder');
console.log('   • ATS Optimization');
console.log('   • Professional Templates');
console.log('   • User Authentication');
console.log('   • Profile Management');
console.log('   • Resume Tips & Blog');
console.log('\n⏳ Please wait for compilation to complete...\n');

import fetch from 'node-fetch';

async function testProductionMVP() {
  try {
    console.log('Testing production MVP endpoint...');
    
    const response = await fetch('https://ideabazzar-backend.onrender.com/api/mvp/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Production Test User',
        email: 'prashantpoddar29@gmail.com',
        phone: '1234567890',
        projectType: 'other',
        projectDescription: 'Testing production MVP endpoint',
        targetAudience: 'Test audience',
        uniqueSellingPoints: 'Test USP',
        features: ['feature1'],
        budget: '₹9-₹99',
        timeline: 'flexible',
        communicationMethod: 'description'
      })
    });

    const data = await response.json();
    console.log('Production Response Status:', response.status);
    console.log('Production Response Data:', data);
    
    if (response.status === 201) {
      console.log('✅ Production MVP endpoint working!');
      console.log('📧 Check your email for notifications');
    } else {
      console.log('❌ Production MVP endpoint failed:', data);
    }
  } catch (error) {
    console.error('❌ Production Error:', error);
  }
}

testProductionMVP();

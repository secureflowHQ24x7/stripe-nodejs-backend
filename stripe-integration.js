document.addEventListener('DOMContentLoaded', function() {
  const stripe = Stripe('pk_live_51R9t2IKxsfPnFzzbR5pX3mcqdOudszeYeeT2PVzjALLSWoB4Kcm4i7OQeOj6SeadvIf7hjynygb8vXM7B6Vf6lSK00IR0NsjQC');
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  document.getElementById('submit-button').addEventListener('click', function() {
    stripe.createToken(cardElement).then(function(result) {
      if (result.error) {
        // Display error.message in your UI.
        console.error(result.error.message);
      } else {
        // Send the token to your server.
        fetch('https://stripe-nodejs-backend.vercel.app/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tokenId: result.token.id,
            amount: 2900 // $29.00 in cents
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Handle successful payment
            alert('Payment successful!');
          } else {
            // Handle payment failure
            alert('Payment failed: ' + data.error);
          }
        });
      }
    });
  });
});

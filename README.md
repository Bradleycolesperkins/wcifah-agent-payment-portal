# WhereCanIFindAHome - Agent Payment App

A single-page Stripe payment application for WhereCanIFindAHome (WCIFAH) that allows estate agents to quickly process payments on mobile devices while at properties.

## Features

- Single payment page with package selection (Classic or Premier)
- Optional "Viewing add-on" with customizable amount
- Real-time total calculation
- Stripe Checkout integration for secure payments
- Success and failure pages with payment details
- Mobile-optimized interface

## Tech Stack

- **Frontend**: React + TypeScript + Vite, React Router
- **Backend**: Node.js + Express, TypeScript
- **Payments**: Stripe Checkout (Redirect)

## Project Structure

```
WCIFAH-Agent-Payment/
├── frontend/           # React frontend application
│   ├── src/            # Source code
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   └── styles/     # CSS files
│   └── ...
├── server/             # Express backend server
│   ├── src/            # Source code
│   │   └── routes/     # API routes
│   └── ...
└── ...
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Stripe account with API keys

### Environment Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd WCIFAH-Agent-Payment
   ```

2. Set up the server environment:
   ```
   cd server
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your Stripe secret key and webhook secret.

3. Set up the frontend environment:
   ```
   cd ../frontend
   cp .env.example .env
   ```

### Installation

1. Install server dependencies:
   ```
   cd server
   npm install
   ```

2. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm run dev
   ```

2. In a separate terminal, start the frontend:
   ```
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Testing

### Test Cards

Use Stripe test cards to test the payment flow:

- Successful payment: `4242 4242 4242 4242`
- Failed payment: `4000 0000 0000 0002`

For all test cards, use:
- Any future expiry date
- Any 3-digit CVC
- Any postal code

### Test Scenarios

1. **Classic Package Only**:
   - Select "Classic" package (£950)
   - Ensure "Viewing add-on" is toggled OFF
   - Total should be £950.00
   - Complete payment with test card

2. **Premier Package Only**:
   - Select "Premier" package (£1,250)
   - Ensure "Viewing add-on" is toggled OFF
   - Total should be £1,250.00
   - Complete payment with test card

3. **Classic Package with Default Add-on**:
   - Select "Classic" package (£950)
   - Toggle "Viewing add-on" ON (default £300)
   - Total should be £1,250.00
   - Complete payment with test card

4. **Premier Package with Custom Add-on**:
   - Select "Premier" package (£1,250)
   - Toggle "Viewing add-on" ON
   - Change add-on amount to £275.50
   - Total should be £1,525.50
   - Complete payment with test card

5. **Failed Payment**:
   - Select any package
   - Use the failed payment test card
   - Verify redirection to the failure page

## Deployment

The application is designed to be deployed to:
- Frontend: `https://agent-payment.wherecanifindahome.co.uk/`
- Backend: Any Node.js hosting service

## License

This project is private and proprietary to WhereCanIFindAHome.
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/ResultPages.css';

interface SessionDetails {
  amount_total: number;
  payment_status: string;
  payment_intent?: {
    charges?: {
      data?: Array<{
        payment_method_details?: {
          card?: {
            brand?: string;
            last4?: string;
          };
        };
      }>;
    };
  };
}

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSessionDetails = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        setError('No session ID provided');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/session/${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }
        
        const data = await response.json();
        setSessionDetails(data);
      } catch (error) {
        console.error('Error fetching session details:', error);
        setError('Failed to fetch payment details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessionDetails();
  }, [searchParams]);
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(amount / 100); // Convert from pence to pounds
  };
  
  // Get card details
  const getCardDetails = (): string => {
    const brand = sessionDetails?.payment_intent?.charges?.data?.[0]?.payment_method_details?.card?.brand;
    const last4 = sessionDetails?.payment_intent?.charges?.data?.[0]?.payment_method_details?.card?.last4;
    
    if (brand && last4) {
      return `${brand.charAt(0).toUpperCase() + brand.slice(1)} ending in ${last4}`;
    }
    
    return 'Card';
  };
  
  return (
    <div className="result-container">
      <div className="result-header success">
        <div className="logo-container">
          <svg id="Layer_2" className="hidden md:block h-8" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 651.82 143.31">
            <defs>
              <style>
                {`.cls-1 {
                  fill: #00202a;
                }
                .cls-2 {
                  fill: #86c554;
                }`}
              </style>
            </defs>
            <g id="Layer_1-2" data-name="Layer_1">
              <g>
                <polygon className="cls-1"
                         points="219.97 53.74 229.62 21.51 235.87 21.51 222.46 62.48 217.97 62.48 204.56 30.34 191.15 62.48 186.66 62.48 173.25 21.51 179.49 21.51 189.15 53.74 202.39 21.51 206.72 21.51 219.97 53.74"></polygon>
                <path className="cls-1"
                      d="M250.94,62.48h-6.5V1.69h6.5v27.73c2.5-5.66,8.08-8.91,15.07-8.91,9.99,0,16.32,7.83,16.32,18.49v23.48h-6.49v-22.23c0-8.08-3.5-13.91-11.82-13.91-7.66,0-13.07,6-13.07,13.74v22.4Z"></path>
                <path className="cls-1"
                      d="M298.66,39.67h30.06c-.67-8.16-6.08-14.32-14.91-14.32-8.16,0-14.32,5.66-15.16,14.32M298.74,44.66c1,8.49,6.66,13.82,15.24,13.82,6.41,0,11.33-3.08,13.74-6.99h6.16c-3.08,6.75-10.58,11.99-19.82,11.99-13.49,0-21.73-9.66-21.73-21.48s8.83-21.48,21.4-21.48,21.07,9.33,21.07,21.07v3.08h-36.06Z"></path>
                <path className="cls-1"
                      d="M367.94,27.34h-1.75c-8.99,0-14.49,6.08-14.49,15.74v19.4h-6.5V21.51h6.25v10.16c2-7.41,8.41-10.49,16.49-10.49v6.16Z"></path>
                <path className="cls-1"
                      d="M378.77,39.67h30.06c-.67-8.16-6.08-14.32-14.91-14.32-8.16,0-14.32,5.66-15.16,14.32M378.85,44.66c1,8.49,6.66,13.82,15.24,13.82,6.41,0,11.33-3.08,13.74-6.99h6.16c-3.08,6.75-10.58,11.99-19.82,11.99-13.49,0-21.73-9.66-21.73-21.48s8.83-21.48,21.4-21.48,21.07,9.33,21.07,21.07v3.08h-36.06Z"></path>
                <path className="cls-1"
                      d="M484.86,34.67h-6.33c-2.33-4.91-7.08-8.74-14.32-8.74-9.74,0-15.41,7.74-15.41,16.07s5.66,16.07,15.41,16.07c7.49,0,11.99-3.75,14.32-8.74h6.33c-2.66,7.99-10.24,14.16-20.57,14.16-13.32,0-21.9-9.74-21.9-21.48s8.58-21.48,21.9-21.48c10.33,0,17.9,6.16,20.57,14.16"></path>
                <path className="cls-1"
                      d="M514.17,58.15c7.91,0,15.82-5.83,15.82-16.16s-7.91-16.15-15.82-16.15c-9.49,0-15.57,7.41-15.57,16.15s6.08,16.16,15.57,16.16M536.49,21.51v40.97h-6.25v-8.24c-2.5,4.58-8.83,9.24-17.15,9.24-12.57,0-20.98-10.16-20.98-21.48s8.41-21.48,20.98-21.48c8.33,0,14.82,4.58,17.07,9.33v-8.33h6.33Z"></path>
                <path className="cls-1"
                      d="M556.31,62.48h-6.49V21.51h6.25v7.99c2.17-5.83,8.08-8.99,15.32-8.99,9.99,0,16.32,7.83,16.32,18.49v23.48h-6.49v-22.23c0-8.08-3.5-13.91-11.82-13.91-7.66,0-13.07,6-13.07,13.74v22.4Z"></path>
                <path className="cls-1"
                      d="M620.84,21.51h6.5v40.97h-6.5V21.51ZM624.09,3.27c2.5,0,4.25,1.83,4.25,4.16s-1.75,4.16-4.25,4.16-4.25-1.83-4.25-4.16,1.75-4.16,4.25-4.16"></path>
                <path className="cls-1"
                      d="M206.72,98.76h10.49v41.55h-10.49v-41.55ZM211.97,79.44c3.58,0,6.25,2.75,6.25,6.16s-2.66,6.16-6.25,6.16-6.25-2.67-6.25-6.16,2.75-6.16,6.25-6.16M179.33,107.25h-6.91v-8.49h6.91v-4.5c0-10.41,4.83-15.74,15.66-15.74,1.83,0,4.25.33,5.41.75v8.66c-.83-.33-2.41-.58-3.75-.58-5.08,0-6.83,2.08-6.83,7.16v4.25h10.08v8.49h-10.08v33.06h-10.49v-33.06Z"></path>
                <path className="cls-1"
                      d="M239.53,140.31h-10.49v-41.55h10.16v7.08c1.92-4.83,7.33-8.08,13.82-8.08,9.99,0,15.57,7.33,15.57,17.65v24.9h-10.49v-23.15c0-5.91-2.66-10.24-8.91-10.24-5.75,0-9.66,4.16-9.66,10.16v23.23Z"></path>
                <path className="cls-1"
                      d="M300.07,132.65c6.91,0,12.74-5.08,12.74-13.07s-5.83-13.16-12.74-13.16c-7.49,0-12.49,5.91-12.49,13.16s5,13.07,12.49,13.07M312.81,79.52h10.49v60.79h-10.08v-7.16c-2.41,4.25-7.91,8.16-15.15,8.16-12.32,0-20.98-9.83-20.98-21.73s8.66-21.82,20.98-21.82c7.24,0,12.66,3.75,14.74,8.16v-26.4Z"></path>
                <path className="cls-1"
                      d="M375.19,132.65c6.91,0,12.74-5.08,12.74-13.07s-5.83-13.16-12.74-13.16c-7.49,0-12.49,5.91-12.49,13.16s5,13.07,12.49,13.07M398.42,98.76v41.55h-10.08v-7.16c-2.41,4.25-7.91,8.16-15.16,8.16-12.32,0-20.98-9.83-20.98-21.73s8.66-21.82,20.98-21.82c7.24,0,12.91,3.75,14.99,8.16v-7.16h10.24Z"></path>
                <path className="cls-1"
                      d="M440.39,140.31h-10.49v-60.79h10.49v25.98c2.25-4.91,7.08-7.74,13.49-7.74,9.99,0,15.57,7.33,15.57,17.65v24.9h-10.49v-23.15c0-5.91-2.66-10.24-8.91-10.24-5.66,0-9.66,4.08-9.66,10.16v23.23Z"></path>
                <path className="cls-1"
                      d="M488.19,119.57c0,6.75,4.5,12.99,12.57,12.99s12.57-6.25,12.57-12.99-4.5-13.08-12.57-13.08-12.57,6.33-12.57,13.08M477.94,119.57c0-11.33,8.49-21.82,22.82-21.82s22.82,10.49,22.82,21.82-8.49,21.73-22.82,21.73-22.82-10.49-22.82-21.73"></path>
                <path className="cls-1"
                      d="M542.98,140.31h-10.49v-41.55h10.16v7.08c1.92-4.83,6.99-8.08,13.49-8.08s10.91,3.08,13.24,8.08c3.16-5.16,8.33-8.08,15.07-8.08,9.99,0,15.16,7.33,15.16,17.65v24.9h-10.49v-23.15c0-5.91-2.25-10.24-8.49-10.24-5.66,0-9.33,4-9.33,9.74v23.65h-10.49v-23.15c0-5.91-2.25-10.24-8.49-10.24-5.75,0-9.33,4.16-9.33,10.16v23.23Z"></path>
                <path className="cls-1"
                      d="M618.34,116.16h23.48c-.67-6.41-4.91-10.91-11.66-10.91s-10.99,4.16-11.82,10.91M618.43,123.07c.67,6.25,4.66,10.49,12.07,10.49,5.08,0,8.99-2.25,10.99-5.41h9.74c-2.83,7.41-10.83,13.16-20.73,13.16-14.16,0-22.4-9.41-22.4-21.82s9.08-21.73,21.9-21.73,21.82,9.08,21.82,21.9v3.41h-33.39Z"></path>
              </g>
              <g>
                <path className="cls-1"
                      d="M99.34,124.41c-.28,0-.55-.04-.82-.14l-36.58-12.43c-.67-.23-1.22-.73-1.51-1.37-.29-.65-.3-1.39-.02-2.04l23.19-54.99c.55-1.3,2.05-1.91,3.35-1.36,1.3.55,1.91,2.05,1.36,3.35l-22.13,52.46,30.54,10.38-1.13-59.96c-.03-1.41,1.1-2.58,2.51-2.6.02,0,.03,0,.05,0,1.39,0,2.53,1.11,2.55,2.51l1.2,63.6c.01.83-.38,1.62-1.05,2.11-.44.32-.97.49-1.51.49Z"></path>
                <path className="cls-1"
                      d="M126.12,134.11h-57.38c-1.12,0-2.18-.56-2.81-1.48-.63-.93-.77-2.11-.36-3.16l5.77-14.81c.68-1.75,2.66-2.62,4.41-1.94,1.75.68,2.62,2.66,1.94,4.41l-3.96,10.17h48.74l-5.95-81.94c-.14-1.88,1.28-3.51,3.15-3.65,1.86-.14,3.51,1.27,3.65,3.15l6.22,85.6c.07.94-.26,1.87-.9,2.57-.65.69-1.55,1.09-2.5,1.09Z"></path>
                <path className="cls-1"
                      d="M63.47,104.98c-.27,0-.54-.03-.81-.1l-17.92-4.35c-1.24-.3-2.21-1.28-2.51-2.52l-7.17-30.13c-.42-1.77.63-3.56,2.38-4.07l31.58-9.02,2.63-10.52c.46-1.83,2.31-2.93,4.13-2.48,1.83.46,2.93,2.31,2.48,4.13l-3.11,12.43c-.3,1.18-1.2,2.12-2.37,2.45l-30.34,8.67,5.93,24.93,15.89,3.86c1.83.44,2.95,2.29,2.51,4.11-.38,1.56-1.77,2.6-3.31,2.6Z"></path>
                <path className="cls-1"
                      d="M125.17,35.3l-10.28-25.34h-31.32l-13.87,25.34-14.55,8.43c-1.78,1.03-1.05,3.76,1.01,3.76h82.54c2.06,0,2.8-2.73,1.01-3.76l-14.55-8.43Z"></path>
                <path className="cls-1"
                      d="M99.28,14.05c-.35,0-.71-.11-1.01-.33l-14.49-10.64c-.76-.56-.92-1.62-.36-2.38.55-.76,1.62-.92,2.38-.36l13.46,9.89L112.14.35c.75-.57,1.82-.43,2.39.32.57.75.43,1.82-.32,2.39l-13.89,10.64c-.31.23-.67.35-1.04.35Z"></path>
                <polygon className="cls-1"
                         points="56.67 61.87 56.67 73.34 41.98 82.25 38.37 67.1 56.67 61.87"></polygon>
                <path className="cls-2"
                      d="M129.29,127.24l.85,11.16c.21,2.65-1.89,4.92-4.56,4.91l-58.68-.27c-3.19-.01-5.38-3.22-4.22-6.2l3.75-9.6h62.86Z"></path>
                <path className="cls-1"
                      d="M42.95,88.14c-9.77,0-14.26,12.81-14.26,12.81l-4.01,15.17c-.24,1.47-1.51,2.55-3,2.55h0c-1.68,0-3.04-1.36-3.04-3.04v-11.37c0-1.83-1.49-3.32-3.32-3.32H3.32c-1.83,0-3.32,1.49-3.32,3.32v18.71c0,8.98,7.28,16.26,16.26,16.26h0c8.98,0,16.26-7.28,16.26-16.26l.94-19.23c.28-5.64,4.84-10.2,10.48-10.29.09,0,.18,0,.27,0"></path>
              </g>
            </g>
          </svg>
        </div>
        <h1>Payment Successful</h1>
      </div>
      
      <div className="result-content">
        {loading ? (
          <p>Loading payment details...</p>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : sessionDetails ? (
          <>
            <div className="success-icon">✓</div>
            <p className="success-message">
              Your payment of {formatCurrency(sessionDetails.amount_total)} has been successfully processed.
            </p>
            <div className="payment-details">
              <p><strong>Payment Status:</strong> {sessionDetails.payment_status}</p>
              <p><strong>Payment Method:</strong> {getCardDetails()}</p>
            </div>
          </>
        ) : (
          <p>No payment details available</p>
        )}
        
        <Link to="/" className="button-link">Return to Payment Page</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
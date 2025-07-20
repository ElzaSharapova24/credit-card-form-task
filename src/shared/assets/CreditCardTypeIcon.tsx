import { type CardType } from '../utils/creditCardUtils';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcDinersClub,
  FaCcJcb,
  FaCreditCard
} from 'react-icons/fa';
import { memo } from 'react';

interface CreditCardTypeIconProps {
  cardType: CardType;
  size?: number;
  className?: string;
}

export const CreditCardTypeIcon = memo<CreditCardTypeIconProps>(
  ({ cardType, size = 24, className = '' }) => {
    // if (cardType === 'unknown') {
    //   return null;
    // }

    const iconProps = {
      size,
      className: `credit-card-icon ${className}`,
      'aria-label': `${cardType} card icon`
    };

    switch (cardType) {
      case 'visa':
        return <FaCcVisa {...iconProps} style={{ color: '#1A1F71' }} />;
      case 'mastercard':
        return <FaCcMastercard {...iconProps} style={{ color: '#EB001B' }} />;
      case 'american-express':
        return <FaCcAmex {...iconProps} style={{ color: '#006FCF' }} />;
      case 'discover':
        return <FaCcDiscover {...iconProps} style={{ color: '#FF6000' }} />;
      case 'diners-club':
        return <FaCcDinersClub {...iconProps} style={{ color: '#0079BE' }} />;
      case 'jcb':
        return <FaCcJcb {...iconProps} style={{ color: '#35A9DB' }} />;
      case 'unionpay':
      case 'maestro':
      default:
        return <FaCreditCard {...iconProps} style={{ color: '#6B7280' }} />;
    }
  }
);

CreditCardTypeIcon.displayName = 'CreditCardTypeIcon';

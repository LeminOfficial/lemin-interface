import { ethers } from 'ethers';

/**
 * Format amount by removing unnecessary decimal places
 * @param amount - BigInt amount
 * @param decimals - Token decimals
 * @param symbol - Token symbol
 * @returns Formatted string like "1 USDC" instead of "1.000000 USDC"
 */
export const formatAmount = (amount: bigint, decimals: number, symbol: string): string => {
  const formatted = ethers.formatUnits(amount, decimals);
  const number = parseFloat(formatted);
  
  // Handle zero case
  if (number === 0) return `0 ${symbol}`;
  
  // Remove trailing zeros after decimal point, then remove decimal point if no digits remain
  const cleanNumber = number.toString().replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
  
  return `${cleanNumber} ${symbol}`;
};

/**
 * Format amount with precision (for rates, etc.)
 * @param amount - BigInt amount  
 * @param decimals - Token decimals
 * @param symbol - Token symbol
 * @param precision - Number of significant digits
 * @returns Formatted string with precision
 */
export const formatAmountWithPrecision = (
  amount: bigint, 
  decimals: number, 
  symbol: string, 
  precision: number = 6
): string => {
  const formatted = ethers.formatUnits(amount, decimals);
  const number = parseFloat(formatted);
  
  if (number === 0) return `0 ${symbol}`;
  
  // Use toPrecision for very small numbers, otherwise use clean format
  if (number < 0.001) {
    return `${number.toPrecision(precision)} ${symbol}`;
  }
  
  // For normal numbers, remove trailing zeros
  const cleanNumber = number.toString().replace(/\.?0+$/, '');
  return `${cleanNumber} ${symbol}`;
};
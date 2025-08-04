import mongoose from 'mongoose';

// Counter schema for generating sequential numbers
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

/**
 * Get next sequence number for a given sequence name
 * @param sequenceName - Name of the sequence
 * @returns Promise<number> - Next sequence number
 */
export const getNextSequence = async (sequenceName: string): Promise<number> => {
  try {
    const sequenceDocument = await Counter.findByIdAndUpdate(
      sequenceName,
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    
    return sequenceDocument.sequence_value;
  } catch (error) {
    console.error('Error generating sequence:', error);
    throw new Error('Failed to generate sequence number');
  }
};

/**
 * Reset sequence to a specific value
 * @param sequenceName - Name of the sequence
 * @param value - Value to reset to
 */
export const resetSequence = async (sequenceName: string, value: number = 0): Promise<void> => {
  try {
    await Counter.findByIdAndUpdate(
      sequenceName,
      { sequence_value: value },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error resetting sequence:', error);
    throw new Error('Failed to reset sequence');
  }
};

/**
 * Get current sequence value without incrementing
 * @param sequenceName - Name of the sequence
 * @returns Promise<number> - Current sequence value
 */
export const getCurrentSequence = async (sequenceName: string): Promise<number> => {
  try {
    const sequenceDocument = await Counter.findById(sequenceName);
    return sequenceDocument ? sequenceDocument.sequence_value : 0;
  } catch (error) {
    console.error('Error getting current sequence:', error);
    throw new Error('Failed to get current sequence value');
  }
};

/**
 * Generate batch number with prefix
 * @param prefix - Prefix for the batch number
 * @param sequenceName - Name of the sequence
 * @param padding - Number of digits to pad (default: 8)
 * @returns Promise<string> - Generated batch number
 */
export const generateBatchNumber = async (
  prefix: string,
  sequenceName: string,
  padding: number = 8
): Promise<string> => {
  try {
    const sequence = await getNextSequence(sequenceName);
    const paddedSequence = sequence.toString().padStart(padding, '0');
    return `${prefix}${paddedSequence}`;
  } catch (error) {
    console.error('Error generating batch number:', error);
    throw new Error('Failed to generate batch number');
  }
};

/**
 * Generate product code
 * @param sequenceName - Name of the sequence
 * @returns Promise<string> - Generated product code
 */
export const generateProductCode = async (sequenceName: string = 'product_batch'): Promise<string> => {
  return generateBatchNumber('PHA', sequenceName, 8);
};

/**
 * Generate invoice number
 * @param sequenceName - Name of the sequence
 * @returns Promise<string> - Generated invoice number
 */
export const generateInvoiceNumber = async (sequenceName: string = 'invoice_batch'): Promise<string> => {
  return generateBatchNumber('INV', sequenceName, 8);
};

/**
 * Generate purchase order number
 * @param sequenceName - Name of the sequence
 * @returns Promise<string> - Generated purchase order number
 */
export const generatePurchaseOrderNumber = async (sequenceName: string = 'po_batch'): Promise<string> => {
  return generateBatchNumber('PO', sequenceName, 8);
};

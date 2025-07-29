interface Batch {
  _id: string;
  availableStock: number;
  batchNo: string;
  expiryDate: string; // Format: "2026-02-04"
  mrpRate: number;
  // ... other properties
  [key: string]: any;
}

/**
 * Finds the batch with the nearest expiry date from an array of batches
 * @param batches - Array of batch objects
 * @returns The batch object with the nearest expiry date, or null if no valid batches
 */
export const findNearestExpiryBatch = (batches: Batch[]): Batch | null => {
  if (!batches || batches.length === 0) {
    return null;
  }

  // Filter out batches with no available stock or invalid expiry dates
  const validBatches = batches.filter(
    (batch) =>
      batch.availableStock > 0 &&
      batch.expiryDate &&
      new Date(batch.expiryDate) > new Date() // Not expired
  );

  if (validBatches.length === 0) {
    return null;
  }

  // Find the batch with the nearest expiry date
  const nearestExpiryBatch = validBatches.reduce((nearest, current) => {
    const nearestDate = new Date(nearest.expiryDate);
    const currentDate = new Date(current.expiryDate);

    return currentDate < nearestDate ? current : nearest;
  });

  return nearestExpiryBatch;
};

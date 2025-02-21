// Function to decode the value from the given base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Lagrange interpolation to find the constant term (c)
function lagrangeInterpolation(xValues, yValues, x) {
    let totalSum = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let term = yValues[i];
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (x - xValues[j]) / (xValues[i] - xValues[j]);
            }
        }
        totalSum += term;
    }
    return totalSum;
}

// Function to find the secret from the given roots
function findSecretFromRoots(roots) {
    const xValues = [];
    const yValues = [];

    // Parse and decode the roots
    for (const [x, root] of Object.entries(roots)) {
        const base = parseInt(root.base);
        const value = root.value;
        const decodedValue = decodeValue(base, value);
        xValues.push(parseInt(x)); // Convert the key to a number
        yValues.push(decodedValue);
    }

    // Using Lagrange interpolation to find the constant term at x = 0
    const secret = lagrangeInterpolation(xValues, yValues, 0);
    return secret;
}

// Test Case 1
const rootsTestCase1 = {
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
};

// Test Case 2
const rootsTestCase2 = {
    "1": { "base": "7", "value": "420020006424065463" },
    "2": { "base": "7", "value": "10511630252064643035" },
    "3": { "base": "2", "value": "101010101001100101011100000001000111010010111101100100010" },
    "4": { "base": "8", "value": "31261003022226126015" },
    "5": { "base": "7", "value": "2564201006101516132035" },
    "6": { "base": "15", "value": "a3c97ed550c69484" },
    "7": { "base": "13", "value": "134b08c8739552a734" },
    "8": { "base": "10", "value": "23600283241050447333" },
    "9": { "base": "9", "value": "375870320616068547135" },
    "10": { "base": "6", "value": "30140555423010311322515333" }
};

// Process Test Case 1
const secret1 = findSecretFromRoots(rootsTestCase1);
console.log("Test Case 1 - The secret constant term (c) is: ", secret1);

// Process Test Case 2
const secret2 = findSecretFromRoots(rootsTestCase2);
console.log("Test Case 2 - The secret constant term (c) is: ", secret2);

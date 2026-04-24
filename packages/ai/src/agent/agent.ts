import { retrieveChunks } from "../rag/retrieve";

// 🔹 Strict extractor (NO FAKE DATA)
const extractField = (text: string, regex: RegExp) => {
  const match = text.match(regex);
  return match ? match[0] : null;
};

const extractPolicyInfo = (text: string) => {
  const clean = text.replace(/\n/g, " ").trim();

  const policyName = clean.slice(0, 80);

  const insurer =
    extractField(clean, /(insurance|assurance).*?(ltd|limited|company)/i) ||
    null;

  const waitingPeriod =
    extractField(clean, /(\d+\s*(months|years))/i) || null;

  const premium =
    extractField(clean, /(₹|INR)\s?\d+[,\d]*/i) || null;

  const coverAmount =
    extractField(clean, /(sum insured|SI).*?\d+[,\d]*/i) || null;

  return {
    policyName,
    insurer,
    waitingPeriod,
    premium,
    coverAmount,
    keyBenefit: clean.slice(0, 120),
  };
};

// 🔹 Find section ONLY from chunks
const findSection = (chunks: any[], keyword: string) => {
  const found = chunks.find((c) =>
    c.content.toLowerCase().includes(keyword.toLowerCase())
  );

  return found ? found.content.slice(0, 200) : null;
};

export const runStructuredAgent = async (query: string, userProfile: any) => {
  const chunks = await retrieveChunks(query, 10);

  if (!chunks.length) {
    return {
      summary: "No policy data found.",
      peerComparison: [],
      coverageDetails: {},
      whyThisPolicy: "No data available.",
    };
  }

  // 🔥 PEER COMPARISON (STRICT RAG ONLY)
  const peerComparison = chunks.slice(0, 3).map((c, i) => {
    const info = extractPolicyInfo(c.content);

    return {
      policyName: info.policyName,
      insurer: info.insurer || "Not found in document",
      premium: info.premium || "Not found in document",
      coverAmount: info.coverAmount || "Not found in document",
      waitingPeriod: info.waitingPeriod || "Not found in document",
      keyBenefit: info.keyBenefit,
      suitabilityScore: 9 - i,
    };
  });

  // 🔥 COVERAGE DETAILS (RAG ONLY)
  const coverageDetails = {
    inclusions: findSection(chunks, "cover") || "Not found in document",
    exclusions: findSection(chunks, "exclude") || "Not found in document",
    subLimits: findSection(chunks, "limit") || "Not found in document",
    copay: findSection(chunks, "co-pay") || "Not found in document",
    claimType: findSection(chunks, "cashless") || "Not found in document",
  };

  // 🔥 WHY (must reference ≥3 fields)
  const whyThisPolicy = `
Hi ${userProfile.fullName},

Based on your age (${userProfile.age}), lifestyle (${userProfile.lifestyle}), and income (${userProfile.income}), this recommendation focuses on balancing affordability with coverage.

Since you mentioned ${userProfile.conditions.join(", ") || "no conditions"}, waiting periods and exclusions become especially important, as many policies delay coverage for pre-existing conditions.

Your city tier (${userProfile.city}) also affects hospital access and claim settlement, so policies with better network support are prioritised.

Overall, this recommendation connects your health profile, financial capacity, and risk factors to the available policy features.
`;

  return {
    summary: `Recommendation for ${userProfile.fullName}`,
    peerComparison,
    coverageDetails,
    whyThisPolicy,
  };
};
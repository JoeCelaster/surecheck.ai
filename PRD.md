# AI Health Insurance Advisor — PRD

## 1. Target User & Pain Points

### Target User
A first-time health insurance buyer who:
- Has limited understanding of insurance terms
- May have a pre-existing condition
- Wants a safe and affordable policy

### Pain Points
- Overwhelmed by too many policy options
- Confused by jargon (waiting period, co-pay, exclusions)
- Cannot understand what applies to their personal health condition
- Fear of hidden costs or claim rejection

---

## 2. Feature Prioritisation

### 1. AI Recommendation Engine (Highest Priority)
Reason:
Core value of the product. Users need clear, personalised policy suggestions.

Includes:
- Best-fit policy recommendation
- Comparison with 2–3 alternatives
- Clear explanation (why this policy)

---

### 2. Chat-Based Policy Explainer
Reason:
Users need to understand complex terms after seeing recommendations.

Includes:
- Definition of terms (e.g., waiting period)
- Personalised examples based on user profile
- Follow-up Q&A

---

### 3. Admin Panel (Knowledge Base)
Reason:
Allows updating policy data without changing code.

Includes:
- Upload policy documents
- View document list
- Edit metadata (policy name, insurer)
- Delete documents (removes from vector DB)

---

## 3. Recommendation Logic

The system matches user profile to policies using AI + document retrieval (RAG).

### Inputs (6 Fields)
- Age
- Lifestyle
- Pre-existing conditions
- Income
- City tier
- Name (for personalisation)

---

### Matching Approach

1. **Retrieve Relevant Policies**
   - Use user profile to query vector database
   - Fetch policy chunks from uploaded documents

2. **Evaluate Key Factors**

| Factor | Logic |
|-------|------|
| Age | Higher age → prefer lower waiting period |
| Pre-existing conditions | Match exclusions and waiting periods |
| Income | Filter policies within affordable premium range |
| Lifestyle | Adjust risk (active users may benefit from OPD coverage) |
| City tier | Prefer policies with better hospital network |

---

3. **Generate Recommendation**

AI uses:
- Retrieved policy data (RAG)
- User profile

Output includes:
- Comparison table (2–3 policies)
- Coverage details (from documents)
- Explanation (150–250 words referencing user profile)

---

## 4. Assumptions

- Policy documents contain accurate and sufficient data for comparison
- Users prefer fewer, high-quality recommendations over many options
- Users do not understand insurance jargon and need explanations
- Pre-existing conditions strongly influence policy suitability
- Income determines affordability and coverage expectations
- AI responses must always be grounded in retrieved documents (no hallucination)

---

## 5. Product Principles

- Clarity over quantity
- Explanation over raw data
- Personalisation over generic output
- Grounded responses using real policy documents

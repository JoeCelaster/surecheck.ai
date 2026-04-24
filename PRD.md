# 📘 Product Requirements Document (PRD)

## Product: surecheck.ai

---

## 🎯 Objective

Build an AI-powered system that helps users select the most suitable health insurance policy based on their profile, using **real policy documents instead of model assumptions**.

---

## 👥 Target Users

* Individuals buying health insurance for the first time
* Users with pre-existing conditions
* Price-sensitive users comparing policies

---

## ❗ Problem Statement

Users struggle with:

* Complex insurance terminology
* Hidden exclusions
* Comparing multiple policies
* Understanding waiting periods

---

## 💡 Solution

A system that:

* Collects user profile data
* Retrieves relevant policy information
* Generates structured, explainable recommendations

---

## 🧩 Core Features

### 1. Profile Input (Strict 6 Fields)

* Full Name
* Age
* Lifestyle
* Pre-existing Conditions
* Income Band
* City Tier

---

### 2. AI Recommendation Engine

#### Requirements:

* Must use RAG (no hallucination)
* Must use retrieved document chunks
* Must generate 3 structured sections

---

### 3. Output Format

#### A. Peer Comparison Table

* Minimum 2 policies
* All fields from document
* No placeholder values

---

#### B. Coverage Details

* Must be document-grounded
* Must not use model assumptions

---

#### C. Why This Policy

* Personalized reasoning
* Must reference ≥ 3 user fields

---

### 4. Admin Panel

* Upload policy documents
* Delete policies
* Manage knowledge base

---

## 🧠 AI Requirements

* Custom retrieval tool
* Grounded responses only
* Session-aware context
* Guardrail: no medical advice

---

## ⚙️ Non-Functional Requirements

* Fast response (<2s)
* Clean UI
* No hardcoded data
* Easy setup

---

## 📊 Success Criteria

* Accurate policy extraction
* Fully grounded responses
* Clean structured output
* No hallucinated data

---

## 🚧 Future Scope

* Chat-based explainer
* Policy scoring engine
* Real insurer integrations
* Mobile app

---

## 🏁 Summary

Asurecheck.ai transforms insurance decision-making from:
❌ Confusing & opaque
to
✅ Transparent, explainable, and personalized

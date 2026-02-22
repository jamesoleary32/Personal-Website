---
title: "Applying ZK to Gaming"
date: "2024-02-21"
category: "Computer-Science"
readingTime: 5
---

# Applying Zero Knowledge to Gaming 
My article is laid out in three sections 
1) **What ZKs are**: specifically laying out what is meant by zero-knowledge
    - Introduction
    - Interactive Proofs 
    - Non-Interactive Proofs 
        - NARK: Non-Interactive Arguments of Knowledge 
        - SNARK: Succint Non-Interactive Arguments of Knowledge 
        - ZK-SNARK: a Zero-Knowledge SNARK
2) **ZKs for games**: functionally how ZKs can be useful in gaming
3) **An implemented example**: how to implement and understand a simple ZK game End-2-End  

I also provide Github repository if you're interested in implementations of some of what's discussed:  [ZK Gaming Introduction Repository](https://github.com/chefaraga123/ZK-Gaming-Introduction)

So...

## 1. What is ZK
### Introduction 
The essence of zero knowledge is being able to prove possession of knowledge, or properties of the knowledge, without revealing the knowledge itself. 

A typical, applied examples of a zero knowledge arrangement is being able to prove that you're over a certain age without revealing your actual age. 


The typical setup is of a **prover** and a **verifier**.
- **Provers generate proofs** 
- **Verifiers verify proofs** 

What this specifically means: the prover is an entity who is interested demonstrating the validity of a statement, and a verifier is an entity which can verify whether the statement underlying the proof is true or false. 

There are two types of zero knowledge proofs: interactive proofs and non-interactive proofs. In the context of blockchain we are typically most interested in non-interactive proofs, the most discussed type being **SNARKs**, which I'll come onto later.

### Interactive Proofs 
**What is meant by interaction?** By interaction we mean that rather than passively reading a proof the verifier engages in a non-trivial interaction with the prover. 
An interesting aspect of interactive proofs is the probabilistic component, this will become clear in an example. 
#### Example of a Zero-Knowledge Interactive Proof: Proving colours to a blind verifier 
#### The Setup 
- **The objective of the Prover**: 
- There is a sheet of paper which may be of a single colour, or have a different colour on either side.
- The prover can tell the difference between these two colours
- The verifier is colour-blind and cannot perceive a difference between the two colours, they know that they are colour blind and could be convinced that the paper has two colours on it.
- At any given point there is a single side of the paper facing up. 
- The verifier wants to find out if there are 2 colours on the page  
- The verifier asks the prover to prove that there are 2 colours on the page | if the prover can perceive changes in the state of the page then it proves there are different states


#### Interactive Proof Algorithm:
1) The verifier asks the prover what the current colour is
2) The prover responds
3) The verifier flips a coin as to whether to flip the piece of paper 
4) The verifier asks the prover what the new colour is
5) The prover responds, if the paper was flipped and the prover doesn't change their answer then there is only a single colour, if the prover is right there is a 50% chance now that the prover is telling the truth and that hence there are two colours 
6) steps 1-5 are repeated until the verifier is convinced 


#### Why is this zero-knowledge?
- The prover possesses knowlege that the verifier lacks due their being colour blind. 
- The prover demonstrates the existence of two colours without revealing the specific colours themselves.
- The verifier gains confidence in the existence of 2 colours without learning any information about what those colours actually are

#### Example of a Non-Zero-Knowledge Interactive Proof: The Graph Non-Isomorphism Problem

#### The Setup
- **The objective of the Prover**: Given two graphs *G1* & *G2*, the prover wants to prove to the verifier that *G1* & *G2* are not **[isormorphic](/Personal-Website/notes/Isomorphism%20between%20Graphs.md)**. 


#### Interactive Proof Algorithm:
1) The prover generates a random **[permutation](/Personal-Website/notes/Permutation.md)** of the vertices of G1 
2) The prover sebds this random permutation to the verifier 
3) The verifier randomly chooses a vertex from G1 and requests its image under pi
4) the prover sends pi(v) to the verifier 
5) the verifier checks if the images of the neightbours of v under pi match the neighbours of $\pi$ in G2
6) steps 1-5 are repeated until the verifier is convinced 

#### Why is this not zero-knowledge?
- In the process of demonstrating non-isomorphism, specific information about the structure of the graphs is revealed to the verifier. 
- Recap: ZK Proofs are designed to convince a verifier of a statement's truthfulness without disclosing any informaiton beyond the validity of a statement. 

### Non-Interactive Zero-Knowledge Proofs 
**What is meant by Non-interaction?** By non-interaction we mean that a prover can provide a proof that can be verified by the verifier without any further interaction or communication between the two parties. The proof is self-contained and can be verified independently by the verifier. Non-interactive proofs are desirable when there are constraints on communication bandwidth. 

#### Example: Schnorr Protocol, A non-interactive proof of knowledge for a discrete logarithm
**Context:** 
- A non-interactive proof of knowledge for a discrete logarithm


-----

## 2. ZKs for games


----- 

## 3. Implementing your first ZK-Dapp


# Notes
#### Example: A digital signature scheme based on public key cryptography, such as the Digital Signature Algorithm (DSA) or the [Elliptic Curve Digital Signature Algorithm (ECDSA)](/Personal-Website/notes/elliptic%20curve.md)
